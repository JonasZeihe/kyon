// src/app/blog/components/HeadingEnhancer.tsx
'use client'

import { useEffect } from 'react'
import { createSlugger } from '@/lib/content/slug'

export default function HeadingEnhancer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-reading-root]')
    if (!root) return
    const slugger = createSlugger()
    const enhance = (el: HTMLElement) => {
      const heads = Array.from(el.querySelectorAll<HTMLElement>('h2, h3'))
      for (const h of heads) {
        if (!h.id || !h.id.trim()) {
          const text = h.textContent || 'section'
          h.id = slugger(text)
        }
        if (!h.hasAttribute('data-toc-anchor')) {
          h.setAttribute('data-toc-anchor', 'true')
        }
        if (!h.hasAttribute('tabindex')) {
          h.setAttribute('tabindex', '-1')
        }
        h.style.setProperty('scroll-margin-top', 'var(--article-scroll-margin)')
      }
    }
    enhance(root)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((n) => {
            if (n instanceof HTMLElement) {
              enhance(n)
            }
          })
        }
      }
    })
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
    }
  }, [])
  return null
}
