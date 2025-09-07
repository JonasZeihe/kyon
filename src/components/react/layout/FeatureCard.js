import React from 'react'
import styled from 'styled-components'
import {
  Button,
  Typography,
  ButtonGrid,
  CardWrapper,
} from '../../utils/sharedComponents'
import BadgeGrid from '../common/BadgeGrid'

export default function FeatureCard({
  title = '',
  description = '',
  badges = [],
  targetId,
  gradient,
  buttonText = 'Mehr erfahren',
  customBackground,
}) {
  const scrollToSection = (id) => {
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

        {badges?.length > 0 && <BadgeGrid badges={badges} />}

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
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`
