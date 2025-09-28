// src/components/blog/ArticleTOC.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import type { TOCItem } from '@/lib/blog/types'

type Props = { items: TOCItem[]; embedded?: boolean }

export default function ArticleTOC({ items, embedded = false }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const filtered = useMemo(
    () => (items || []).filter((i) => i.depth === 2 || i.depth === 3),
    [items]
  )
  const ids = useMemo(() => filtered.map((i) => i.id), [filtered])

  useEffect(() => {
    if (!ids.length) return
    const hs = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const getOffset = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(
        '--article-scroll-margin'
      )
      const n = parseFloat(v)
      return Number.isFinite(n) && n > 0 ? n : 88
    }

    const offset = getOffset()

    hs.forEach((h) => {
      h.style.scrollMarginTop = `${offset}px`
      if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1')
    })

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
          return
        }
        const past = entries
          .filter((e) => e.boundingClientRect.top < 0)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)
        if (past[0]?.target?.id) setActiveId(past[0].target.id)
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    )

    hs.forEach((h) => obs.observe(h))
    return () => obs.disconnect()
  }, [ids])

  if (!ids.length) return null

  return (
    <Wrap $embedded={embedded}>
      {!embedded && <Header>Inhalt</Header>}
      <List>
        {filtered.map((i) => {
          const active = activeId === i.id
          return (
            <Item key={i.id} $depth={i.depth} $active={active}>
              <a
                href={`#${i.id}`}
                title={i.value}
                aria-current={active ? 'true' : undefined}
              >
                {i.value}
              </a>
            </Item>
          )
        })}
      </List>
    </Wrap>
  )
}

const Wrap = styled.aside<{ $embedded: boolean }>`
  display: block;
  min-width: ${({ $embedded }) => ($embedded ? '240px' : 'auto')};
`

const Header = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text.main};
`

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.6)};
`

const Item = styled.li<{ $depth: number; $active: boolean }>`
  a {
    display: block;
    text-decoration: none;
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    color: ${({ theme }) => theme.colors.text.main};
    opacity: ${({ $active }) => ($active ? 1 : 0.9)};
    border-left: 3px solid
      ${({ theme, $active }) =>
        $active ? theme.colors.accent.main : theme.colors.neutral.border};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.surface.hover : 'transparent'};
    font-weight: ${({ theme, $active }) =>
      $active
        ? theme.typography.fontWeight.medium
        : theme.typography.fontWeight.regular};
    margin-left: ${({ $depth }) => ($depth === 3 ? '12px' : '0')};
    transition:
      background 0.15s ease,
      opacity 0.15s ease;
  }
  a:hover,
  a:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    outline: none;
  }
`
