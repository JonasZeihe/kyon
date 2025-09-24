// src/components/blog/StickyToc.tsx
'use client'

import styled from 'styled-components'
import ArticleTOC from './ArticleTOC'
import type { TOCItem } from '@/lib/blog/types'

type Props = { items: TOCItem[]; top?: number }

export default function StickyToc({ items, top }: Props) {
  if (!items?.length) return null
  return (
    <Box $top={top}>
      <ArticleTOC items={items} />
    </Box>
  )
}

const Box = styled.nav<{ $top?: number }>`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: ${({ $top }) =>
      $top != null
        ? `${$top}px`
        : 'var(--toc-top, calc(var(--header-height, 74px) + 14px))'};
    left: calc(50% + 40ch + var(--article-gap));
    width: 320px;
    max-height: calc(
      100vh -
        ${({ $top }) =>
          $top != null
            ? `${$top}px`
            : 'var(--toc-top, calc(var(--header-height, 74px) + 14px))'}
    );
    overflow-y: auto;
    padding: ${({ theme }) => theme.spacing(1)};
    background: ${({ theme }) => theme.colors.surface.card};
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    z-index: 10;
    display: block;
  }
`
