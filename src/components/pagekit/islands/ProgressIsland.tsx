// src/components/pagekit/islands/ProgressIsland.tsx
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const BarWrap = styled.div`
  position: fixed;
  top: var(--header-offset, var(--header-height, 74px));
  left: 0;
  right: 0;
  z-index: 10010;
  width: 100%;
  height: 3px;
  pointer-events: none;
`

const Bar = styled.div<{ $p: number }>`
  width: ${({ $p }) => `${$p}%`};
  height: 100%;
  background: ${({ theme }) => theme.gradients.rainbow};
  transition:
    width 0.12s ease-out,
    opacity 0.18s ease;
  opacity: ${({ $p }) => ($p > 0 ? 0.8 : 0)};
  will-change: width;
`

export default function ProgressIsland({
  rootSelector = '[data-reading-root]',
}: {
  rootSelector?: string
}) {
  const [p, setP] = useState(0)

  const rootRef = useRef<HTMLElement | null>(null)
  const rootTopRef = useRef(0)
  const totalRef = useRef(0)
  const docModeRef = useRef(false)

  const tickingRef = useRef(false)
  const latestScrollYRef = useRef(0)

  const readScrollY = () =>
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    (document.body ? document.body.scrollTop : 0) ||
    0

  const measure = useCallback(() => {
    const root = document.querySelector(rootSelector) as HTMLElement | null
    rootRef.current = root

    const docEl = document.documentElement
    const viewportH = window.innerHeight || docEl.clientHeight

    if (root) {
      const rect = root.getBoundingClientRect()
      const scrollTop =
        window.pageYOffset ||
        docEl.scrollTop ||
        (document.body ? document.body.scrollTop : 0) ||
        0

      rootTopRef.current = rect.top + scrollTop
      totalRef.current = Math.max(0, root.scrollHeight - viewportH)
      docModeRef.current = false
    } else {
      const totalDoc = Math.max(0, docEl.scrollHeight - viewportH)
      rootTopRef.current = 0
      totalRef.current = totalDoc
      docModeRef.current = true
    }
  }, [rootSelector])

  const onScroll = useCallback(() => {
    latestScrollYRef.current = readScrollY()
    if (tickingRef.current) return
    tickingRef.current = true
    requestAnimationFrame(() => {
      const total = totalRef.current
      const top = rootTopRef.current
      const y = latestScrollYRef.current

      const current = Math.max(
        0,
        Math.min(docModeRef.current ? y : y - top, total)
      )
      const pct = total > 0 ? (current / total) * 100 : 0
      setP(pct)
      tickingRef.current = false
    })
  }, [])

  useEffect(() => {
    measure()

    let ro: ResizeObserver | null = null
    if (rootRef.current && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => {
        measure()
        onScroll()
      })
      ro.observe(rootRef.current)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true } as any)
    const onLoad = () => {
      measure()
      onScroll()
    }
    window.addEventListener('load', onLoad)

    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll as any)
      window.removeEventListener('resize', onResize as any)
      window.removeEventListener('load', onLoad as any)
      if (ro) ro.disconnect()
    }
  }, [measure, onScroll])

  return (
    <BarWrap aria-hidden="true">
      <Bar $p={p} />
    </BarWrap>
  )
}
