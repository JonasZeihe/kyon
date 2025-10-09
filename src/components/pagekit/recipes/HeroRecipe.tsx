// src/components/pagekit/recipes/HeroRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import { AccentKey } from '@/design/theme'

type ContainerSize = 'default' | 'wide' | 'narrow'
type Variant = 'default' | 'split'

type Props = {
  title: ReactNode
  kicker?: ReactNode
  lead?: ReactNode
  media?: ReactNode
  container?: ContainerSize
  accent?: AccentKey | 'neutral'
  isPageHeader?: boolean
  titleId?: string
  variant?: Variant
  mediaAspect?: string
}

const isPrimitive = (n: ReactNode): n is string | number =>
  typeof n === 'string' || typeof n === 'number'

const Split = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.2)};
  }
`

const MediaFrame = styled.div<{ $aspect?: string }>`
  width: 100%;
  background: ${({ theme }) => theme.semantic.surface};
  border-radius: inherit;
  .inner {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: inherit;
    ${({ $aspect }) => ($aspect ? `aspect-ratio: ${$aspect};` : '')}
  }
`

const GradientBar = styled.div`
  height: 6px;
  width: 100%;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.large};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.gradients.rainbow};
  opacity: 0.9;
`

export default function HeroRecipe({
  title,
  kicker,
  lead,
  media,
  container = 'default',
  accent = 'neutral',
  isPageHeader = false,
  titleId,
  variant = 'default',
  mediaAspect,
}: Props) {
  const effectiveAccent: AccentKey | 'neutral' = isPageHeader
    ? 'neutral'
    : accent
  const titleVariant = isPageHeader ? 'h1' : 'h2'
  const titleAs = isPageHeader ? 'h1' : 'h2'

  const Head = (
    <Stack gap={1}>
      {kicker ? (
        isPrimitive(kicker) ? (
          <Typography as="p" variant="caption" color="mutedFg">
            {kicker}
          </Typography>
        ) : (
          kicker
        )
      ) : null}
      {isPrimitive(title) ? (
        <Typography
          as={titleAs}
          variant={titleVariant as any}
          accent={effectiveAccent}
          id={titleId}
        >
          {title}
        </Typography>
      ) : (
        title
      )}
      {lead ? (
        isPrimitive(lead) ? (
          <Typography as="p" variant="body" color="mutedFg">
            {lead}
          </Typography>
        ) : (
          lead
        )
      ) : null}
    </Stack>
  )

  const Media =
    media != null ? (
      <Surface tone="elevated" radius="large" bordered padding="1px">
        <MediaFrame $aspect={mediaAspect}>
          <div className="inner">{media}</div>
        </MediaFrame>
        <GradientBar />
      </Surface>
    ) : null

  return (
    <Section container={container} padY>
      {variant === 'split' ? (
        <Split>
          <div>{Head}</div>
          {Media}
        </Split>
      ) : (
        <Stack gap={1.25}>
          {Head}
          {Media}
        </Stack>
      )}
    </Section>
  )
}
