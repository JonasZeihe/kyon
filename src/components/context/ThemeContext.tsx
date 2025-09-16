// --- src/components/context/ThemeContext.tsx ---
'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/theme'
import GlobalStyles from '@/styles/GlobalStyles'

type Mode = 'light' | 'dark'

type ThemeContextValue = {
  mode: Mode
  isDarkMode: boolean
  toggleTheme: () => void
  setMode: (m: Mode) => void
  theme: DefaultTheme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx)
    throw new Error('useThemeContext must be used within ThemeContextProvider')
  return ctx
}

function isPlainObject(value: unknown) {
  if (value === null || typeof value !== 'object') return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

function failLoudProxy<T extends object>(obj: T, prefix = ''): T {
  return new Proxy(obj as object, {
    get(target, prop: string | symbol, receiver) {
      if (prop in target) {
        const value = Reflect.get(target, prop, receiver)
        if (
          typeof value === 'function' ||
          Array.isArray(value) ||
          value instanceof Date ||
          value === null
        ) {
          return value
        }
        if (isPlainObject(value)) {
          return failLoudProxy(value as object, `${prefix}${String(prop)}.`)
        }
        return value
      }
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Missing theme key: ${prefix}${String(prop)}`)
      }
      return '#FF00AA' as any
    },
  }) as T
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('dark')

  useEffect(() => {
    const stored =
      (typeof window !== 'undefined' &&
        (localStorage.getItem('theme') as Mode | null)) ||
      null
    const system: Mode =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    setMode(stored === 'light' || stored === 'dark' ? stored : system)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('theme', mode)
    } catch {}
    document.documentElement.dataset.theme = mode
    const meta =
      document.querySelector('meta[name="color-scheme"]') ||
      (() => {
        const m = document.createElement('meta')
        m.setAttribute('name', 'color-scheme')
        document.head.appendChild(m)
        return m
      })()
    meta.setAttribute('content', mode === 'dark' ? 'dark light' : 'light dark')
  }, [mode])

  const theme = useMemo<DefaultTheme>(() => {
    const base = mode === 'dark' ? darkTheme : lightTheme
    return failLoudProxy<DefaultTheme>({ ...base, mode })
  }, [mode])

  const toggleTheme = () =>
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDarkMode: mode === 'dark',
      toggleTheme,
      setMode,
      theme,
    }),
    [mode, theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
