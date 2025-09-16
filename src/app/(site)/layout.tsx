// --- src/app/(site)/layout.tsx ---
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'
import ReadingProgress from '@/components/blog/ReadingProgress'

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/'
  const isArticle = /^\/blog\/[^/]+\/[^/]+\/?$/.test(pathname)

  return (
    <Shell>
      <Header />
      {isArticle ? <ReadingProgress /> : null}
      <Main role="main">{children}</Main>
      <Footer />
    </Shell>
  )
}

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.neutral.background};
`

const Main = styled.main`
  flex: 1 1 auto;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  padding-top: 4.6rem;
`
