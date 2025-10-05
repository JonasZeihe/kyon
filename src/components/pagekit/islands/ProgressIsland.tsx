// src/components/pagekit/islands/ProgressIsland.tsx
'use client'

import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

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

const gradient = css`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.accentFor('primary').color}, ${theme.accentFor('accent').color})`};
`

const Bar = styled.div<{ $p: number }>`
  width: ${({ $p }) => `${$p}%`};
  height: 100%;
  ${gradient};
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

  useEffect(() => {
    const root = document.querySelector(rootSelector) as HTMLElement | null

    const getScrollTop = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const getTopFromDoc = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      const docTop = getScrollTop()
      return rect.top + docTop
    }

    const update = () => {
      const doc = document.documentElement
      const viewportH = window.innerHeight || doc.clientHeight
      const scrollY = getScrollTop()

      if (root) {
        const top = getTopFromDoc(root)
        const total = Math.max(0, root.scrollHeight - viewportH)
        const current = Math.max(0, Math.min(scrollY - top, total))
        const pct = total > 0 ? (current / total) * 100 : 0
        setP(pct)
        return
      }

      const totalDoc = Math.max(0, doc.scrollHeight - viewportH)
      const pctDoc = totalDoc > 0 ? (scrollY / totalDoc) * 100 : 0
      setP(pctDoc)
    }

    update()
    const onScroll = () => update()
    const onResize = () => update()
    window.addEventListener('scroll', onScroll, { passive: true } as any)
    window.addEventListener('resize', onResize, { passive: true } as any)
    window.addEventListener('load', update)

    return () => {
      window.removeEventListener('scroll', onScroll as any)
      window.removeEventListener('resize', onResize as any)
      window.removeEventListener('load', update as any)
    }
  }, [rootSelector])

  return (
    <BarWrap aria-hidden="true">
      <Bar $p={p} />
    </BarWrap>
  )
}
