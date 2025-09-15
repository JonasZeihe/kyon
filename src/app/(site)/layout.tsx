// --- src/app/(site)/layout.tsx ---
import type { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styled from 'styled-components'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  )
}

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.neutral.background};
`
