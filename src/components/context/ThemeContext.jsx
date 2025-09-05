import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../styles/theme.js'

const ThemeContext = createContext()
export const useThemeContext = () => useContext(ThemeContext)

function failLoudProxy(obj, prefix = '') {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        const value = target[prop]
        if (typeof value === 'object' && value !== null) {
          return failLoudProxy(value, `${prefix}${String(prop)}.`)
        }
        return value
      }
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Missing theme key: ${prefix}${String(prop)}`)
      }
      return undefined
    },
  })
}

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState('dark')
  const theme = useMemo(() => {
    const base = mode === 'dark' ? darkTheme : lightTheme
    return failLoudProxy({ ...base, mode })
  }, [mode])

  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  const value = useMemo(
    () => ({ mode, isDarkMode: mode === 'dark', toggleTheme }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
