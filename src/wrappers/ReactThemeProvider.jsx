import React from 'react'
import { ThemeContextProvider } from '../components/react/context/ThemeContext'

export default function ReactThemeProvider({ children }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>
}
