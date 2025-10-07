// src/components/blog/ArticleLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = { children: React.ReactNode }

export default function ArticleLayout({ children }: Props) {
  return <Outer data-article="true">{children}</Outer>
}

const Outer = styled.div`
  --article-max-width: clamp(24em, 90vw, 90ch);
  --toc-width: clamp(260px, 22vw, 340px);
  width: 100%;
  max-width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    --toc-width: 0px;
  }
`
