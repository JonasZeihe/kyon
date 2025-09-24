// src/components/blog/ArticleLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export default function ArticleLayout({ children }: Props) {
  return <Outer>{children}</Outer>
}

const Outer = styled.div`
  width: 100%;
`
