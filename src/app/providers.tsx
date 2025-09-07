// src/app/providers.tsx
'use client'

import { ReactNode } from 'react'
import { ThemeContextProvider } from '@/components/context/ThemeContext'
import GlobalStyles from '@/styles/GlobalStyles'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <GlobalStyles />
      {children}
    </ThemeContextProvider>
  )
}
