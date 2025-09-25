// src/components/blog/ArticleTOC.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import type { TOCItem } from '@/lib/blog/types'

type Props = { items: TOCItem[]; embedded?: boolean }

const HEADER_OFFSET_PX = 88

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

    hs.forEach((h) => {
      h.style.scrollMarginTop = `${HEADER_OFFSET_PX}px`
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
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -60% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    hs.forEach((h) => obs.observe(h))
    return () => obs.disconnect()
  }, [ids])

  if (!ids.length) return null

  return (
    <Wrap $embedded={embedded} data-embedded={embedded ? 'true' : 'false'}>
      <Header>Inhalt</Header>
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
  ${({ $embedded, theme }) =>
    $embedded
      ? css`
          position: static;
          display: block;
          min-width: 240px;
          max-width: 320px;
          padding: ${theme.spacing(1.2)};
          border-radius: ${theme.borderRadius.medium};
          background: ${theme.colors.surface.card};
          border: 1px solid ${theme.colors.neutral.border};
          box-shadow: ${theme.boxShadow.xs};
        `
      : css`
          position: static;
          display: block;
          padding: 0;
          background: transparent;
          border: 0;
          box-shadow: none;
          min-width: 0;
          max-width: none;
        `}
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
