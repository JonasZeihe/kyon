// src/app/blog/meta/ReadingProgress.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'
import {
  ARTICLE_PATH_REGEX,
  FEATURE_READING_PROGRESS,
  READING_ROOT_SELECTOR,
  ARTICLE_ANCHOR_SELECTOR,
} from '@/lib/blog/meta-config'

type Props = {
  targetSelector?: string
}

const Bar = styled.div<{ $reduceMotion: boolean; $progress: number }>`
  position: fixed;
  top: var(--header-height, 74px);
  left: 0;
  height: 3px;
  width: ${({ $progress }) => `${$progress}%`};
  background: ${({ theme }) => theme.gradients.accent};
  transition: ${({ $reduceMotion }) =>
    $reduceMotion ? 'none' : 'width 0.12s ease-out, opacity 0.18s ease'};
  z-index: 10010;
  pointer-events: none;
  opacity: 0.98;
`

export default function ReadingProgress({ targetSelector }: Props) {
  const pathname = usePathname() || ''
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const rafRef = useRef<number | null>(null)
  const moRef = useRef<MutationObserver | null>(null)
  const mounted = useMemo(() => typeof window !== 'undefined', [])
  const selector =
    targetSelector || READING_ROOT_SELECTOR || ARTICLE_ANCHOR_SELECTOR

  const enabled = FEATURE_READING_PROGRESS && ARTICLE_PATH_REGEX.test(pathname)

  useEffect(() => {
    if (!mounted || !enabled) return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(!!prefersReduced)

    const getTarget = () =>
      (document.querySelector(selector) as HTMLElement | null) ||
      (document.querySelector('main') as HTMLElement | null) ||
      document.body

    const update = () => {
      const el = getTarget()
      if (!el) return
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
      setVisible(el.scrollHeight > viewportH * 1.05)
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      if (reduceMotion) {
        update()
      } else {
        rafRef.current = window.requestAnimationFrame(update)
      }
    }

    const onResize = () => update()

    let target = getTarget()
    const ro = new ResizeObserver(update)
    if (target) ro.observe(target)
    ro.observe(document.documentElement)

    if (!target) {
      moRef.current = new MutationObserver(() => {
        const found = getTarget()
        if (found) {
          target = found
          ro.observe(found)
          update()
          moRef.current?.disconnect()
          moRef.current = null
        }
      })
      moRef.current.observe(document.body, { childList: true, subtree: true })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('load', update)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', update)
      ro.disconnect()
      moRef.current?.disconnect()
      moRef.current = null
    }
  }, [mounted, enabled, selector, pathname, reduceMotion])

  if (!enabled || !visible) return null

  return (
    <Bar aria-hidden="true" $reduceMotion={reduceMotion} $progress={progress} />
  )
}
