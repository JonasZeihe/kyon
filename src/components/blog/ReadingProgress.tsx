// src/components/blog/ReadingProgress.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const enabled =
  typeof process !== 'undefined' &&
  (process.env.NEXT_PUBLIC_FEATURE_READING_PROGRESS || '').toLowerCase() ===
    'true'

export default function ReadingProgress() {
  const pathname = usePathname()
  const isArticle = /^\/blog\/[^/]+\/[^/]+$/.test(pathname || '')
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const mounted = useMemo(() => typeof window !== 'undefined', [])

  useEffect(() => {
    if (!mounted || !enabled || !isArticle) return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = Math.max(0, scrollHeight - clientHeight)
      const current = Math.max(0, Math.min(scrollTop, total))
      const pct = total > 0 ? (current / total) * 100 : 0
      setProgress(pct)
      setVisible(total > 1200)
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    const onResize = () => update()

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [mounted, isArticle])

  if (!enabled || !visible || !isArticle) return null

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
