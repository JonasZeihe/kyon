// src/components/blog/ArticleLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export default function ArticleLayout({ children }: Props) {
  return <Outer data-article="true">{children}</Outer>
}

const Outer = styled.div`
  --site-header-height: var(--site-header-height, 4.6rem);
  --article-scroll-margin: calc(var(--site-header-height) + 12px);
  --article-max-width: 78ch;
  --article-inline-pad: clamp(0.75rem, 3vw, 1.25rem);

  width: 100%;
  max-width: 100%;
  padding-inline: var(--article-inline-pad);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: 0;
  }
`
