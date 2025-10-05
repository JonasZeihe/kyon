// src/providers.tsx
'use client'

import type { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { ThemeContextProvider } from '@/components/context/ThemeContext'
import { getMDXComponents } from '@/lib/markdown/mdx-components'
import GlobalStyles from '@/design/global'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <GlobalStyles />
      <MDXProvider components={getMDXComponents()}>{children}</MDXProvider>
    </ThemeContextProvider>
  )
}
