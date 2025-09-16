// --- src/components/blog/ReadingProgress.tsx ---
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const flag =
  typeof process !== 'undefined'
    ? (process.env.NEXT_PUBLIC_FEATURE_READING_PROGRESS || '').toLowerCase()
    : ''
const enabledByEnv = flag === '' || flag === 'true'

export default function ReadingProgress() {
  const pathname = usePathname()
  const isArticle = /^\/blog\/[^/]+\/[^/]+\/?$/.test(pathname || '')
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const mounted = useMemo(() => typeof window !== 'undefined', [])

  useEffect(() => {
    if (!mounted || !enabledByEnv || !isArticle) return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const getScrollTarget = () => {
      const article =
        document.querySelector('article') ||
        document.querySelector('[data-article]') ||
        document.querySelector('main') ||
        document.body
      return article as HTMLElement
    }

    const update = () => {
      const el = getScrollTarget()
      const doc = document.documentElement

      const rect = el.getBoundingClientRect()
      const topFromDoc = rect.top + (window.pageYOffset || doc.scrollTop || 0)

      const viewportH = window.innerHeight || doc.clientHeight
      const total = Math.max(0, el.scrollHeight - viewportH)
      const current = Math.max(
        0,
        Math.min((window.pageYOffset || doc.scrollTop || 0) - topFromDoc, total)
      )

      const pct = total > 0 ? (current / total) * 100 : 0
      setProgress(pct)
      setVisible(el.scrollHeight > viewportH * 1.6)
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    const onResize = () => update()

    setProgress(0)
    setVisible(false)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [mounted, isArticle, pathname])

  if (!enabledByEnv || !visible || !isArticle) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height:
          typeof window !== 'undefined' &&
          window.matchMedia('(max-width: 600px)').matches
            ? '4px'
            : '3px',
        width: `${progress}%`,
        background:
          'linear-gradient(90deg, var(--rp-start, #3068FF), var(--rp-end, #CA21B6))',
        transition: 'width 0.12s ease-out, opacity 0.18s ease',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.98,
      }}
    />
  )
}
