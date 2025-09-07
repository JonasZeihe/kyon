import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../../styles/theme.js'
import themeToCssVars from '../../../styles/themeToCssVars.js'

const ThemeContext = createContext()
export const useThemeContext = () => useContext(ThemeContext)

const failLoudProxy = (obj, prefix = '') =>
  new Proxy(obj, {
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

const getInitialMode = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('kyonTheme') || '{}')
    return stored.mode === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeContextProvider({ children }) {
  const isSSR = typeof window === 'undefined'
  const initialMode = isSSR ? 'dark' : getInitialMode()
  const [mode, setMode] = useState(initialMode)

  const theme = useMemo(() => {
    const base = mode === 'dark' ? darkTheme : lightTheme
    return failLoudProxy({ ...base, mode })
  }, [mode])

  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    localStorage.setItem('kyonTheme', JSON.stringify({ mode }))
    document.documentElement.dataset.mode = mode
    document.documentElement.style.cssText += themeToCssVars(theme)
  }, [mode, theme])

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
