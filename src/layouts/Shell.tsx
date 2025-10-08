// src/layouts/Shell.tsx
'use client'

import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type Props = { children: React.ReactNode }

export default function Shell({ children }: Props) {
  useEffect(() => {
    const root = document.documentElement
    const get = (n: string) => root.style.getPropertyValue(n)
    const set = (n: string, v: string) => root.style.setProperty(n, v)

    if (!get('--header-height')) set('--header-height', '74px')
    if (!get('--header-offset')) set('--header-offset', '74px')
    if (!get('--article-scroll-margin')) set('--article-scroll-margin', '86px')
    if (!get('--sticky-offset')) set('--sticky-offset', '89px')
  }, [])

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
  border: 1px solid ${({ theme }) => theme.semantic.border}};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  z-index: 10000;
  &:focus-visible {
    left: 8px;
    top: 8px;
    outline: 2px solid ${({ theme }) => theme.semantic.focusRing};
    outline-offset: 2px;
    box-shadow: none;
  }
`

const Portals = styled.div`
  position: relative;
  z-index: 0;
`
