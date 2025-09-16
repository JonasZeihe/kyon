// --- src/app/providers.tsx ---
'use client'

import type { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { ThemeContextProvider } from '@/components/context/ThemeContext'
import { getMDXComponents } from '@/lib/markdown/mdx-components'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <MDXProvider components={getMDXComponents()}>{children}</MDXProvider>
    </ThemeContextProvider>
  )
}
