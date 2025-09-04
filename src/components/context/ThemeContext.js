// src/components/context/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../styles/theme'

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

function failLoudProxy(obj, prefix = '') {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        const value = target[prop]
        if (typeof value === 'object' && value !== null) {
          return failLoudProxy(value, `${prefix}${prop}.`)
        }
        return value
      }
      if (process.env.NODE_ENV !== 'production') {
        const error = new Error(`Missing theme key: ${prefix}${prop}`)
        throw error
      }
      return '#FF00AA'
    },
  })
}

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState('dark')

  const theme = useMemo(() => {
    const baseTheme = mode === 'dark' ? darkTheme : lightTheme
    return failLoudProxy({ ...baseTheme, mode })
  }, [mode])

  const toggleTheme = () =>
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const value = useMemo(
    () => ({
      mode,
      isDarkMode: mode === 'dark',
      toggleTheme,
      theme,
    }),
    [mode, theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
