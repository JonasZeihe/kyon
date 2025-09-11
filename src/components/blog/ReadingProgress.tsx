// src/components/blog/ReadingProgress.tsx
'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      const current = scrollTop
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: `${progress}%`,
        background: 'var(--progress-bar-color, #3068FF)',
        transition: 'width 0.15s ease-out',
        zIndex: 9999,
      }}
    />
  )
}
