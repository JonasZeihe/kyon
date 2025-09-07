'use client'

import { useMemo } from 'react'
import styled from 'styled-components'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MeshGradientBackground from '@/components/layout/MeshGradientBackground'

export default function Page() {
  const navSections = useMemo(
    () => [
      { id: 'intro', label: 'Einführung' },
      { id: 'uxui', label: 'UX/UI' },
      { id: 'python', label: 'Python' },
      { id: 'java', label: 'Java' },
    ],
    []
  )

  return (
    <>
      <MeshGradientBackground />
      <Header navSections={navSections} />
      <Main>
        <Section id="intro">kyon läuft.</Section>
      </Main>
      <Footer />
    </>
  )
}

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.spacing(3)};
  padding-right: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(8)};
  padding-bottom: ${({ theme }) => theme.spacing(8)};
  min-height: 0;
  box-sizing: border-box;
`

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing(2)} 0;
`
