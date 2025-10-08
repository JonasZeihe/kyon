// src/providers.tsx
'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo } from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  ThemeContextProvider,
  useThemeContext,
} from '@/components/context/ThemeContext'
import { getMDXComponents } from '@/lib/markdown/mdx-components'
import GlobalStyles from '@/design/global'

function HtmlColorSchemeSync() {
  const { mode } = useThemeContext()

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', mode)
    root.style.colorScheme = mode
  }, [mode])

  return null
}

export default function Providers({ children }: { children: ReactNode }) {
  const mdxComponents = useMemo(() => getMDXComponents(), [])

  return (
    <ThemeContextProvider>
      <HtmlColorSchemeSync />
      <GlobalStyles />
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </ThemeContextProvider>
  )
}
