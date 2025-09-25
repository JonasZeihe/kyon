// src/components/blog/ArticleGrid.tsx
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

type Props = {
  aside?: React.ReactNode
  children: React.ReactNode
  anchorSelector?: string
}

export default function ArticleGrid({
  aside,
  children,
  anchorSelector = '[data-toc-anchor]',
}: Props) {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const [tocTop, setTocTop] = useState<number | undefined>(undefined)

  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    let ro: ResizeObserver | null = null
    let frame = 0

    const getTop = () => {
      const anchor =
        (main.querySelector(anchorSelector) as HTMLElement | null) || main
      const rect = anchor.getBoundingClientRect()
      return rect.top
    }

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setTocTop(getTop()))
    }

    ro = new ResizeObserver(update)
    ro.observe(document.documentElement)
    ro.observe(main)
    const anchor =
      (main.querySelector(anchorSelector) as HTMLElement | null) || null
    if (anchor) ro.observe(anchor)

    update()
    window.addEventListener('resize', update)
    window.addEventListener('load', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('load', update)
      cancelAnimationFrame(frame)
      ro && ro.disconnect()
    }
  }, [anchorSelector])

  const asideWithTop = useMemo(() => {
    if (!aside) return null
    if (React.isValidElement(aside))
      return React.cloneElement(aside as any, { top: tocTop })
    return aside
  }, [aside, tocTop])

  const hasAside = !!aside

  return (
    <Grid $hasAside={hasAside}>
      <Main ref={mainRef}>{children}</Main>
      {hasAside ? <Aside data-toc-aside>{asideWithTop}</Aside> : null}
    </Grid>
  )
}

const Grid = styled.div<{ $hasAside: boolean }>`
  --article-gap: clamp(1rem, 2vw, 2rem);
  display: grid;
  align-items: start;
  column-gap: var(--article-gap);
  row-gap: var(--article-gap);
  grid-template-columns: minmax(0, 1fr) minmax(0, 80ch) minmax(260px, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Main = styled.div`
  grid-column: 2;
  min-width: 0;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1;
  }
`

const Aside = styled.aside`
  grid-column: 3;
  min-width: 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`
