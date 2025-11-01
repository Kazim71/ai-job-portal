import { createContext, useContext, useEffect, useState, useLayoutEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Initialize theme before React renders to prevent flicker
const initializeTheme = () => {
  const saved = localStorage.getItem('ai-job-portal-theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const shouldBeDark = saved ? saved === 'dark' : systemPrefersDark
  
  if (shouldBeDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  return shouldBeDark
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(initializeTheme)
  const [isLoaded, setIsLoaded] = useState(false)

  // Use useLayoutEffect to apply theme synchronously before paint
  useLayoutEffect(() => {
    const applyTheme = (dark) => {
      const root = document.documentElement
      if (dark) {
        root.classList.add('dark')
        root.style.colorScheme = 'dark'
      } else {
        root.classList.remove('dark')
        root.style.colorScheme = 'light'
      }
    }

    applyTheme(isDark)
    localStorage.setItem('ai-job-portal-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    setIsLoaded(true)
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const saved = localStorage.getItem('ai-job-portal-theme')
      if (!saved) {
        setIsDark(e.matches)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  const setTheme = (theme) => {
    setIsDark(theme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme, 
      setTheme, 
      isLoaded,
      theme: isDark ? 'dark' : 'light'
    }}>
      {children}
    </ThemeContext.Provider>
  )
}