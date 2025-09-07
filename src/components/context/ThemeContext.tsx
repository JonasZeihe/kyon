// src/components/context/ThemeContext.tsx
'use client'

import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components'
import { lightTheme, darkTheme } from '../../styles/theme'

type Mode = 'light' | 'dark'

type ThemeContextValue = {
  mode: Mode
  isDarkMode: boolean
  toggleTheme: () => void
  theme: DefaultTheme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext must be used within ThemeContextProvider')
  return ctx
}

function failLoudProxy<T extends object>(obj: T, prefix = ''): T {
  return new Proxy(obj as object, {
    get(target, prop: string | symbol, receiver) {
      if (prop in target) {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value === 'object' && value !== null) {
          return failLoudProxy(value as object, `${prefix}${String(prop)}.`)
        }
        return value
      }
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Missing theme key: ${prefix}${String(prop)}`)
      }
      return '#FF00AA'
    },
  }) as T
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('dark')

  const theme = useMemo<DefaultTheme>(() => {
    const base = mode === 'dark' ? darkTheme : lightTheme
    return failLoudProxy<DefaultTheme>({ ...base, mode })
  }, [mode])

  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const value = useMemo<ThemeContextValue>(
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
