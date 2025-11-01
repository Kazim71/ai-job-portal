import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('ai-job-portal-theme')
    if (saved) {
      return saved === 'dark'
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Apply theme immediately to prevent flash
    const applyTheme = (dark) => {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    applyTheme(isDark)
    localStorage.setItem('ai-job-portal-theme', isDark ? 'dark' : 'light')
    setIsLoaded(true)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  )
}