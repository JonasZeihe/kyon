// src/components/card/FeatureCard.tsx
'use client'

import styled from 'styled-components'
import { useCallback } from 'react'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import Card from '@/components/primitives/Card'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Typography from '@/design/typography'
import { useRouter } from 'next/navigation'

type FeatureCardProps = {
  title?: string
  description?: string
  badges?: string[]
  targetId?: string
  href?: string
  external?: boolean
  gradient?: string
  buttonText?: string
  customBackground?: string
  ariaLabel?: string
}

export default function FeatureCard({
  title = '',
  description = '',
  badges = [],
  targetId,
  href,
  external = false,
  gradient,
  buttonText = 'Mehr erfahren',
  customBackground,
  ariaLabel,
}: FeatureCardProps) {
  const router = useRouter()

  const handleScroll = useCallback(() => {
    if (!targetId) return
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [targetId])

  const handleInternalNav = useCallback(() => {
    if (!href) return
    router.push(href)
  }, [href, router])

  const handleExternalNav = useCallback(() => {
    if (!href) return
    window.open(href, '_blank', 'noopener,noreferrer')
  }, [href])

  const isScroll = !!targetId && !href
  const isInternalLink = !!href && !external
  const isExternalLink = !!href && external

  return (
    <Card tone="neutral" radius="large" bordered hover interactive>
      <Inner
        style={
          gradient
            ? ({ ['--feature-gradient' as any]: gradient } as any)
            : undefined
        }
      >
        <Header>
          <Typography
            variant="h2"
            align="center"
            accent="accent"
            gutter={false}
          >
            {title}
          </Typography>
          <Typography variant="body" align="center">
            {description}
          </Typography>
        </Header>

        {badges.length > 0 && <BadgeGrid badges={badges as any} />}

        <ButtonGrid>
          {isScroll && (
            <Button
              onClick={handleScroll}
              customBackground={
                customBackground || (gradient as string | undefined)
              }
              aria-label={ariaLabel || buttonText}
            >
              {buttonText}
            </Button>
          )}

          {isInternalLink && (
            <Button
              onClick={handleInternalNav}
              role="link"
              customBackground={
                customBackground || (gradient as string | undefined)
              }
              aria-label={ariaLabel || buttonText}
            >
              {buttonText}
            </Button>
          )}

          {isExternalLink && (
            <Button
              onClick={handleExternalNav}
              role="link"
              customBackground={
                customBackground || (gradient as string | undefined)
              }
              aria-label={ariaLabel || buttonText}
            >
              {buttonText}
            </Button>
          )}

          {!isScroll && !isInternalLink && !isExternalLink && (
            <Button disabled aria-disabled="true">
              {buttonText}
            </Button>
          )}
        </ButtonGrid>
      </Inner>
    </Card>
  )
}

const Inner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  background: var(--feature-gradient, transparent);
  border-radius: ${({ theme }) => theme.borderRadius.large};
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`
