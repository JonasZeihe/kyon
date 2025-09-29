// src/components/blog/ArticleGrid.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export default function ArticleGrid({ children }: Props) {
  return (
    <Grid>
      <Main>{children}</Main>
      <Aside>
        <AsideInner data-toc-aside />
      </Aside>
    </Grid>
  )
}

const Grid = styled.div`
  --article-gap: clamp(1rem, 2vw, 2rem);
  --article-max: var(--article-max-width, 80ch);
  display: grid;
  align-items: start;
  grid-template-columns: minmax(0, 1fr) minmax(0, var(--article-max)) minmax(
      0,
      320px
    );
  column-gap: var(--article-gap);
  row-gap: var(--article-gap);
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
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    grid-column: 3;
    min-width: 0;
    position: relative;
  }
`

const AsideInner = styled.div`
  position: sticky;
  top: var(--article-scroll-margin, calc(var(--header-height, 74px) + 12px));
  align-self: start;
`
