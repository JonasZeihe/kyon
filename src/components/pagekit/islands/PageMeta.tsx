// src/components/pagekit/islands/PageMeta.tsx
'use client'

import styled from 'styled-components'
import type { TOCItem } from '@/lib/blog/types'
import ArticleTOC from '@/components/blog/ArticleTOC'
import ProgressIsland from './ProgressIsland'

type Props = {
  tocItems?: TOCItem[]
  showProgress?: boolean
  ariaLabel?: string
}

export default function PageMeta({
  tocItems = [],
  showProgress = true,
  ariaLabel = 'Artikel-Navigation',
}: Props) {
  const hasToc =
    Array.isArray(tocItems) &&
    tocItems.some((i) => i.depth === 2 || i.depth === 3)

  return (
    <Aside aria-label={ariaLabel}>
      {showProgress ? (
        <ProgressIsland rootSelector="[data-reading-root]" />
      ) : null}
      {hasToc ? (
        <Box role="navigation">
          <ArticleTOC items={tocItems} embedded={false} />
        </Box>
      ) : null}
    </Aside>
  )
}

const Aside = styled.aside`
  display: block;
  width: 100%;
`

const Box = styled.nav`
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.semantic.card};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  scrollbar-width: thin;
  pointer-events: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`
