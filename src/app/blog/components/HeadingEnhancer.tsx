// src/app/blog/components/HeadingEnhancer.tsx
'use client'

import { useEffect } from 'react'
import { createSlugger } from '@/lib/content/slug'

export default function HeadingEnhancer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-reading-root]')
    if (!root) return
    const slugger = createSlugger()
    const heads = Array.from(root.querySelectorAll<HTMLElement>('h2, h3'))
    for (const h of heads) {
      if (!h.id || !h.id.trim()) {
        const text = h.textContent || 'section'
        h.id = slugger(text)
      }
      if (!h.hasAttribute('data-toc-anchor'))
        h.setAttribute('data-toc-anchor', 'true')
      ;(h.style as any).scrollMarginTop = 'var(--article-scroll-margin)'
    }
  }, [])
  return null
}
