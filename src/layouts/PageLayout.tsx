// src/layouts/PageLayout.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'

type Variant = 'none' | 'subtle' | 'intense'
type Size = 'narrow' | 'default' | 'wide' | 'full'

type Props = {
  children: React.ReactNode
  variant?: Variant
  size?: Size
}

export default function PageLayout({
  children,
  variant = 'none',
  size = 'default',
}: Props) {
  return (
    <PageWrapper>
      <Surface data-variant={variant}>
        <SectionWrapper>
          <ContainerWrapper $size={size} $padY>
            {children}
          </ContainerWrapper>
        </SectionWrapper>
      </Surface>
    </PageWrapper>
  )
}

const Surface = styled.div`
  &[data-variant='none'] {
    background: transparent;
  }
  &[data-variant='subtle'] {
    background: ${({ theme }) => theme.colors.surface.backdrop};
  }
  &[data-variant='intense'] {
    background: ${({ theme }) => theme.colors.surface[2]};
  }
`
