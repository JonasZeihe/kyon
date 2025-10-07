// src/components/blog/ArticleGrid.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  aside?: React.ReactNode
}

export default function ArticleGrid({ children, aside }: Props) {
  const hasAside = !!aside
  return (
    <Grid data-article-root data-has-aside={hasAside ? 'true' : 'false'}>
      <Main data-col="main">
        <MainInner>{children}</MainInner>
      </Main>
      {hasAside ? (
        <Aside data-col="aside">
          <AsideSticky>
            <AsideScroll>{aside}</AsideScroll>
          </AsideSticky>
        </Aside>
      ) : null}
    </Grid>
  )
}

const Grid = styled.div`
  --gap: ${({ theme }) => theme.rhythm.default.sectionGap};
  --content: var(--article-max-width, 90ch);
  --toc: var(--toc-width, 320px);

  display: grid;
  width: 100%;
  align-items: stretch;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 3fr)
    minmax(0, var(--toc));
  column-gap: var(--gap);
  row-gap: calc(var(--gap) * 0.75);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr);
    column-gap: ${({ theme }) => theme.spacing(1)};
    row-gap: ${({ theme }) => theme.spacing(1)};
  }

  &[data-has-aside='false'] {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Main = styled.div`
  grid-column: 2;
  min-width: 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1;
  }

  [data-has-aside='false'] & {
    grid-column: 1;
  }
`

const MainInner = styled.div`
  min-width: 0;
  max-width: var(--content);
  margin-inline: auto;
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

const AsideSticky = styled.div`
  position: sticky;
  top: calc(var(--header-height, 74px) + var(--progress-height, 3px) + 0.5rem);
`

const AsideScroll = styled.div`
  max-height: calc(
    100vh - (var(--header-height, 74px) + var(--progress-height, 3px) + 0.5rem)
  );
  overflow: auto;
  pointer-events: auto;
`
