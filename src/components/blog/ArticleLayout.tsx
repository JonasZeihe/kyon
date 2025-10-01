// src/components/blog/ArticleLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = { children: React.ReactNode }

export default function ArticleLayout({ children }: Props) {
  return <Outer data-article="true">{children}</Outer>
}

const Outer = styled.div`
  --header-height: 74px;
  --article-scroll-margin: calc(var(--header-height) + 12px);
  --article-max-width: 86ch;
  --toc-width: 320px;
  --article-inline-pad: 0;
  width: 100%;
  max-width: 100%;
  padding-inline: var(--article-inline-pad);
`
