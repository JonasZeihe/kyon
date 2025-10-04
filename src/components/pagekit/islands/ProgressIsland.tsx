// src/components/pagekit/islands/ProgressIsland.tsx
'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'

const BarWrap = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 4px;
  background: transparent;
`

const Bar = styled.div<{ $p: number }>`
  width: ${({ $p }) => `${$p}%`};
  height: 100%;
  background: ${({ theme }) => theme.semantic.focusRing};
  transition: width 0.1s linear;
`

export default function ProgressIsland({
  rootSelector = '[data-reading-root]',
}: {
  rootSelector?: string
}) {
  const [p, setP] = useState(0)

  useEffect(() => {
    const root = document.querySelector(rootSelector) as HTMLElement | null
    const onScroll = () => {
      const el = root || document.documentElement
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - el.clientHeight
      const scrolled = root ? el.scrollTop : window.scrollY
      const pct =
        total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0
      setP(pct)
    }
    onScroll()
    const target = root ? root : window
    target.addEventListener('scroll', onScroll, { passive: true } as any)
    if (!root) window.addEventListener('resize', onScroll)
    return () => {
      target.removeEventListener('scroll', onScroll as any)
      if (!root) window.removeEventListener('resize', onScroll)
    }
  }, [rootSelector])

  return (
    <BarWrap aria-hidden="true">
      <Bar $p={p} />
    </BarWrap>
  )
}
