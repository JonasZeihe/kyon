import React from 'react'
import { ThemeContextProvider } from '../context/ThemeContext'

export default function ThemeLayout({ children }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>
}
