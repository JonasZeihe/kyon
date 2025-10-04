// src/app/blog/meta/StickyToc.tsx
'use client'

import styled from 'styled-components'
import ArticleTOC from '@/components/blog/ArticleTOC'
import type { TOCItem } from '@/lib/blog/types'

type Props = { items: TOCItem[] }

export default function StickyTOC({ items }: Props) {
  const hasTOC =
    Array.isArray(items) && items.some((i) => i.depth === 2 || i.depth === 3)
  if (!hasTOC) return null
  return (
    <Box aria-label="Inhaltsverzeichnis">
      <ArticleTOC items={items} embedded={false} />
    </Box>
  )
}

const Box = styled.nav`
  position: sticky;
  top: calc(var(--header-height, 72px) + 0.75rem);
  max-height: calc(100vh - var(--header-height, 72px) - 0.75rem);
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.semantic.card};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  z-index: 100;
  isolation: isolate;
  scrollbar-width: thin;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`
