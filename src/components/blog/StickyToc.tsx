// src/components/blog/StickyToc.tsx
'use client'

import styled from 'styled-components'
import ArticleTOC from './ArticleTOC'
import type { TOCItem } from '@/lib/blog/types'

type Props = { items: TOCItem[] }

export default function StickyToc({ items }: Props) {
  if (!items?.length) return null

  return (
    <Box>
      <ArticleTOC items={items} embedded />
    </Box>
  )
}

const Box = styled.aside`
  position: sticky;
  top: var(--article-scroll-margin, 88px);
  align-self: start;
  max-height: calc(100vh - var(--article-scroll-margin, 88px));
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(1)};
  border-left: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.surface.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`
