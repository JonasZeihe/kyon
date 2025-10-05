// src/components/blog/ArticleLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = { children: React.ReactNode }

export default function ArticleLayout({ children }: Props) {
  return <Outer data-article="true">{children}</Outer>
}

const Outer = styled.div`
  --article-max-width: var(--article-max-width, 110ch);
  --toc-width: var(--toc-width, 320px);
  width: 100%;
  max-width: 100%;
`
