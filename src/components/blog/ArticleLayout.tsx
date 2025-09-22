// src/components/blog/ArticleLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import type { TOCItem } from '@/lib/blog/types'
import StickyToc from './StickyToc'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'

type Props = {
  toc: TOCItem[]
  children: React.ReactNode
}

export default function ArticleLayout({ toc, children }: Props) {
  const hasTOC =
    Array.isArray(toc) && toc.some((i) => i.depth === 2 || i.depth === 3)

  return (
    <Outer>
      <ContainerWrapper $size="wide">
        <Grid $hasTOC={hasTOC}>
          <LeftSpacer aria-hidden="true" />
          <Main>{children}</Main>
          {hasTOC ? (
            <Aside>
              <StickyToc items={toc} />
            </Aside>
          ) : (
            <RightSpacer />
          )}
        </Grid>
      </ContainerWrapper>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
`

const Grid = styled.div<{ $hasTOC: boolean }>`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ $hasTOC }) =>
      $hasTOC
        ? `
      grid-template-columns: 1fr minmax(0, 80ch) 320px;
      gap: 2rem;
    `
        : `
      grid-template-columns: 1fr minmax(0, 80ch) 1fr;
    `}
  }
`

const LeftSpacer = styled.div`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

const RightSpacer = styled.div`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

const Main = styled.div`
  min-width: 0;
  grid-column: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 2;
  }
`

const Aside = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    grid-column: 3;
  }
`
