// src/components/blog/ArticleGrid.tsx
'use client'
import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export default function ArticleGrid({ children }: Props) {
  return (
    <Grid data-article-root>
      <Main>
        <MainInner>{children}</MainInner>
      </Main>
      <Aside>
        <AsideInner data-toc-aside />
      </Aside>
    </Grid>
  )
}

const Grid = styled.div`
  --gap: clamp(
    ${({ theme }) => theme.spacing(2)},
    2vw,
    ${({ theme }) => theme.spacing(4)}
  );
  --content: var(--article-max-width, 78ch);
  --toc: var(--toc-width, 320px);

  display: grid;
  width: 100%;
  align-items: start;
  grid-template-columns:
    minmax(var(--toc), 1fr)
    minmax(0, var(--content))
    minmax(var(--toc), 1fr);
  column-gap: var(--gap);
  row-gap: var(--gap);

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

const MainInner = styled.div`
  min-width: 0;
`

const Aside = styled.aside`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    grid-column: 3;
    min-width: 0;
    position: relative;
    justify-self: start;
    width: var(--toc);
    max-width: var(--toc);
  }
`

const AsideInner = styled.div`
  position: sticky;
  top: 0;
  align-self: start;
`
