// src/components/blog/StickyToc.tsx
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ArticleTOC from './ArticleTOC'
import type { TOCItem } from '@/lib/blog/types'

type Props = { items: TOCItem[] }

export default function StickyToc({ items }: Props) {
  const [style, setStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 280,
  })
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number | null>(null)

  const compute = useCallback(() => {
    const anchor = document.querySelector(
      '[data-toc-aside]'
    ) as HTMLElement | null
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    const scrollX =
      window.pageXOffset || document.documentElement.scrollLeft || 0
    const available = Math.max(0, rect.width)
    const width = Math.max(240, Math.min(320, available))
    const left = Math.round(rect.left + scrollX + available - width)
    setStyle({ left, width })
  }, [])

  const schedule = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      compute()
      rafRef.current = null
    })
  }, [compute])

  useEffect(() => {
    setMounted(true)
    compute()
    const ro = new ResizeObserver(schedule)
    const anchor = document.querySelector(
      '[data-toc-aside]'
    ) as HTMLElement | null
    if (anchor) ro.observe(anchor)
    ro.observe(document.documentElement)
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('load', schedule)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('load', schedule)
    }
  }, [compute, schedule])

  const topPx = useMemo(() => {
    if (typeof window === 'undefined') return 88
    const v = getComputedStyle(document.documentElement).getPropertyValue(
      '--article-scroll-margin'
    )
    const n = parseFloat(v)
    return Number.isFinite(n) && n > 0 ? n : 88
  }, [])

  if (!items?.length || !mounted) return null

  return ReactDOM.createPortal(
    <Box
      style={{ left: style.left, width: style.width }}
      $top={topPx}
      aria-label="Inhaltsverzeichnis"
    >
      <ArticleTOC items={items} embedded={false} />
    </Box>,
    document.body
  )
}

const Box = styled.nav<{ $top: number }>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  max-height: calc(100dvh - ${({ $top }) => `${$top}px`});
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.surface.card};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  z-index: 1200;
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`
