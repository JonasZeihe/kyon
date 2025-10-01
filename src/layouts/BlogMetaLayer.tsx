// src/layouts/BlogMetaLayer.tsx
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import { Breadcrumbs, StickyTOC } from '@/app/blog/meta'
import ReadingProgress from '@/app/blog/meta/ReadingProgress'
import type { TOCItem } from '@/lib/blog/types'
import {
  ARTICLE_ANCHOR_SELECTOR,
  TOC_ASIDE_SELECTOR,
  FEATURE_READING_PROGRESS,
  FEATURE_BREADCRUMBS,
  FEATURE_STICKY_TOC,
} from '@/lib/blog/meta-config'

export type BreadcrumbItem = { href?: string; label: string }

type Props = {
  toc?: TOCItem[]
  breadcrumbs?: BreadcrumbItem[]
  showProgress?: boolean
  articleAnchorSelector?: string
  tocAsideAnchor?: string
}

export default function BlogMetaLayer({
  toc = [],
  breadcrumbs = [],
  showProgress = true,
  articleAnchorSelector = ARTICLE_ANCHOR_SELECTOR,
  tocAsideAnchor = TOC_ASIDE_SELECTOR,
}: Props) {
  const [top, setTop] = useState<number | undefined>(undefined)
  const rafRef = useRef<number | null>(null)
  const moRef = useRef<MutationObserver | null>(null)

  const hasToc = useMemo(
    () => Array.isArray(toc) && toc.some((i) => i.depth === 2 || i.depth === 3),
    [toc]
  )

  const computeTop = useCallback(() => {
    const doc = document.documentElement
    const scrollMarginRaw = getComputedStyle(doc).getPropertyValue(
      '--article-scroll-margin'
    )
    const scrollMargin = Number.parseFloat(scrollMarginRaw) || 88

    const anchor = document.querySelector(
      articleAnchorSelector
    ) as HTMLElement | null

    if (anchor) {
      const r = anchor.getBoundingClientRect()
      const candidate = Math.max(scrollMargin, Math.round(r.top))
      setTop(candidate)
      return
    }

    setTop(scrollMargin)
  }, [articleAnchorSelector])

  const schedule = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      computeTop()
      rafRef.current = null
    })
  }, [computeTop])

  useEffect(() => {
    computeTop()
    const ro = new ResizeObserver(schedule)
    ro.observe(document.documentElement)

    const anchor = document.querySelector(
      articleAnchorSelector
    ) as HTMLElement | null
    if (anchor) ro.observe(anchor)

    if (!anchor) {
      moRef.current = new MutationObserver(() => {
        const found = document.querySelector(
          articleAnchorSelector
        ) as HTMLElement | null
        if (found) {
          schedule()
          moRef.current?.disconnect()
          moRef.current = null
        }
      })
      moRef.current.observe(document.body, { childList: true, subtree: true })
    }

    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('load', schedule)

    return () => {
      ro.disconnect()
      moRef.current?.disconnect()
      moRef.current = null
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
    }
  }, [computeTop, schedule, articleAnchorSelector])

  return (
    <>
      {FEATURE_BREADCRUMBS && breadcrumbs.length > 0 ? (
        <TopBar>
          <ContainerWrapper $size="default" $padY={false}>
            <Breadcrumbs items={breadcrumbs} />
          </ContainerWrapper>
        </TopBar>
      ) : null}

      {FEATURE_READING_PROGRESS && showProgress ? (
        <ReadingProgress targetSelector="[data-reading-root]" />
      ) : null}

      {FEATURE_STICKY_TOC && hasToc ? (
        <StickyTOC
          items={toc}
          tocAsideAnchor={tocAsideAnchor}
          articleAnchorSelector={articleAnchorSelector}
          top={top}
        />
      ) : null}
    </>
  )
}

const TopBar = styled.div`
  position: relative;
  z-index: 2;
`
