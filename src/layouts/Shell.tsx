// src/layouts/Shell.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type Props = { children: React.ReactNode }

export default function Shell({ children }: Props) {
  return (
    <Outer>
      <SkipLink href="#main">Zum Inhalt springen</SkipLink>
      <Header />
      <Main id="main" role="main">
        {children}
      </Main>
      <Footer />
      <Portals id="portals" />
    </Outer>
  )
}

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.semantic.bg};
`

const Main = styled.main`
  flex: 1 1 auto;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  padding-top: var(--header-height, 74px);
`

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: -9999px;
  padding: ${({ theme }) => `${theme.spacingHalf(3)} ${theme.spacing(1)}`};
  background: ${({ theme }) => theme.semantic.card};
  color: ${({ theme }) => theme.semantic.fg};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  z-index: 10000;
  &:focus {
    left: 8px;
    top: 8px;
    outline: none;
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`

const Portals = styled.div`
  position: relative;
  z-index: 0;
`
