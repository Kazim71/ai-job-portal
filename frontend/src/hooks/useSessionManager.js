import { useEffect, useCallback } from 'react'
import { useAuth, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const SESSION_CHECK_INTERVAL = 30000 // 30 seconds
const SESSION_TIMEOUT = 20 * 60 * 1000 // 20 minutes

export const useSessionManager = () => {
  const { isSignedIn, isLoaded, userId } = useAuth()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  const clearUserData = useCallback(() => {
    // Clear all user-related data
    localStorage.removeItem('userToken')
    localStorage.removeItem('lastActivity')
    sessionStorage.clear()
  }, [])

  const handleSessionExpired = useCallback(async () => {
    console.log('Session expired, logging out...')
    clearUserData()
    try {
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
    navigate('/', { replace: true })
  }, [signOut, navigate, clearUserData])

  const updateLastActivity = useCallback(() => {
    if (isSignedIn) {
      localStorage.setItem('lastActivity', Date.now().toString())
    }
  }, [isSignedIn])

  const checkSession = useCallback(async () => {
    if (!isLoaded) return

    // If user should be signed in but isn't, handle session expiry
    if (!isSignedIn && localStorage.getItem('lastActivity')) {
      await handleSessionExpired()
      return
    }

    if (isSignedIn) {
      const lastActivity = localStorage.getItem('lastActivity')
      if (lastActivity) {
        const timeSinceActivity = Date.now() - parseInt(lastActivity)
        if (timeSinceActivity > SESSION_TIMEOUT) {
          await handleSessionExpired()
          return
        }
      }
      updateLastActivity()
    }
  }, [isLoaded, isSignedIn, handleSessionExpired, updateLastActivity])

  // Set up session monitoring
  useEffect(() => {
    if (!isLoaded) return

    // Initial session check
    checkSession()

    // Set up periodic session checks
    const interval = setInterval(checkSession, SESSION_CHECK_INTERVAL)

    // Listen for user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart']
    const handleActivity = () => updateLastActivity()

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true })
    })

    // Listen for storage changes (multi-tab logout)
    const handleStorageChange = (e) => {
      if (e.key === 'lastActivity' && !e.newValue && isSignedIn) {
        // Another tab logged out
        handleSessionExpired()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      clearInterval(interval)
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [isLoaded, isSignedIn, checkSession, updateLastActivity, handleSessionExpired])

  // Initialize activity tracking on sign in
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      updateLastActivity()
    } else if (!isSignedIn && isLoaded) {
      clearUserData()
    }
  }, [isSignedIn, isLoaded, updateLastActivity, clearUserData])

  return {
    isSessionValid: isSignedIn && isLoaded,
    clearUserData,
    updateLastActivity
  }
}