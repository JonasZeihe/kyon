// src/components/blog/ArticleTOC.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import type { TOCItem } from '@/lib/blog/types'

type Props = {
  items: TOCItem[]
}

export default function ArticleTOC({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const ids = useMemo(
    () => items.filter((i) => i.depth >= 2).map((i) => i.id),
    [items]
  )

  useEffect(() => {
    if (!ids.length) return
    const hs = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    hs.forEach((h) => {
      h.style.scrollMarginTop = '96px'
      h.setAttribute('tabindex', '-1')
    })
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
        else {
          const past = entries
            .filter((e) => e.boundingClientRect.top < 0)
            .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)
          if (past[0]?.target?.id) setActiveId(past[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )
    hs.forEach((h) => obs.observe(h))
    return () => obs.disconnect()
  }, [ids])

  if (!ids.length) return null

  return (
    <Wrap role="navigation" aria-label="Inhaltsverzeichnis">
      <Header>Inhalt</Header>
      <List>
        {items
          .filter((i) => i.depth >= 2)
          .map((i) => (
            <Item key={i.id} $depth={i.depth} $active={activeId === i.id}>
              <a href={`#${i.id}`} title={i.value}>
                {i.value}
              </a>
            </Item>
          ))}
      </List>
    </Wrap>
  )
}

const Wrap = styled.aside`
  position: sticky;
  top: 88px;
  align-self: start;
  display: none;
  min-width: 240px;
  max-width: 320px;
  padding: ${({ theme }) => theme.spacing(1.2)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
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
    opacity: ${({ $active }) => ($active ? 1 : 0.85)};
    border-left: 3px solid
      ${({ theme, $active }) =>
        $active ? theme.colors.accent.main : theme.colors.surface[4]};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.surface.hover : 'transparent'};
    font-weight: ${({ theme, $active }) =>
      $active
        ? theme.typography.fontWeight.medium
        : theme.typography.fontWeight.regular};
    margin-left: ${({ $depth }) => ($depth === 3 ? '12px' : '0')};
  }
  a:hover,
  a:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    outline: none;
  }
`
