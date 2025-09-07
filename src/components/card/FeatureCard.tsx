'use client'

import styled, { DefaultTheme } from 'styled-components'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Typography from '@/styles/Typography'

type FeatureCardProps = {
  title?: string
  description?: string
  badges?: string[]
  targetId?: string
  gradient?: string
  buttonText?: string
  customBackground?: string
}

export default function FeatureCard({
  title = '',
  description = '',
  badges = [],
  targetId,
  gradient,
  buttonText = 'Mehr erfahren',
  customBackground,
}: FeatureCardProps) {
  const scrollToSection = (id?: string) => {
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CardWrapper gradient={gradient}>
      <Inner>
        <Header>
          <Typography variant="h2" color="accent.main" align="center">
            {title}
          </Typography>
          <Typography variant="body" align="center">
            {description}
          </Typography>
        </Header>

        {badges.length > 0 && <BadgeGrid badges={badges as any} />}

        <ButtonGrid>
          <Button
            customBackground={customBackground}
            onClick={() => scrollToSection(targetId)}
          >
            {buttonText}
          </Button>
        </ButtonGrid>
      </Inner>
    </CardWrapper>
  )
}

const Inner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(2)};
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(1)};
`
