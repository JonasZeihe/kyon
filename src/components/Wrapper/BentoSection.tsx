// --- src/components/Wrapper/BentoSection.tsx ---
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import LumenWrapper from './LumenWrapper'
import ContainerWrapper from './ContainerWrapper'
import AutoGrid from './AutoGrid'

type Props = {
  title?: ReactNode
  subtitle?: ReactNode
  cta?: ReactNode
  children: ReactNode
  min?: string
  gap?: number
  columns?: number | 'auto'
  padY?: boolean
  wide?: boolean
}

export default function BentoSection({
  title,
  subtitle,
  cta,
  children,
  min = '18rem',
  gap = 2,
  columns = 'auto',
  padY = true,
  wide = false,
}: Props) {
  return (
    <Outer>
      <ContainerWrapper $size={wide ? 'wide' : 'default'} $padY={padY}>
        {(title || subtitle || cta) && (
          <Header>
            <Headings>
              {title ? <Title>{title}</Title> : null}
              {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
            </Headings>
            {cta ? <CtaWrap>{cta}</CtaWrap> : null}
          </Header>
        )}
        <Surface as="section" aria-label="Bento Section">
          <AutoGrid $min={min} $gap={gap} $columns={columns}>
            {children}
          </AutoGrid>
        </Surface>
      </ContainerWrapper>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`

const Headings = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text.main};
`

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const CtaWrap = styled.div`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Surface = styled(LumenWrapper).attrs({ $variant: 'subtle' as const })`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.surface.card};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing(1.25)};
  }
`
