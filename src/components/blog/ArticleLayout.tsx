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
  --article-scroll-margin: calc(var(--header-height, 74px) + 12px);
  --article-max-width: 78ch;
  --article-inline-pad: 0;
  width: 100%;
  max-width: 100%;
  padding-inline: var(--article-inline-pad);
`
