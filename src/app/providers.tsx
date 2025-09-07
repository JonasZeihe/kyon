'use client'

import { ReactNode } from 'react'
import { ThemeContextProvider } from '@/components/context/ThemeContext'

export default function Providers({ children }: { children: ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>
}
