// src/components/pagekit/recipes/SectionRecipe.tsx
'use client'

import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import { AccentKey } from '@/design/theme'

type SurfaceVariant = 'subtle' | 'intense' | 'none'
type RhythmKey = 'compact' | 'default' | 'spacious'

type Props = {
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  surface?: SurfaceVariant
  accent?: AccentKey | 'neutral'
  narrow?: boolean
  titleId?: string
  ariaLabel?: string
  footer?: ReactNode
  rhythm?: RhythmKey
}

const isPrimitive = (n: ReactNode): n is string | number =>
  typeof n === 'string' || typeof n === 'number'

const mapTone = (v: SurfaceVariant): 'neutral' | 'elevated' | 'accent' => {
  if (v === 'intense') return 'accent'
  if (v === 'none') return 'neutral'
  return 'neutral'
}

const HeaderStack = styled(Stack)<{ $rhythm: RhythmKey }>`
  ${({ theme, $rhythm }) => {
    const pad = theme.rhythm[$rhythm].sectionPad
    return css`
      gap: calc(${pad} / 2);
    `
  }}
`

const BodyStack = styled(Stack)<{ $rhythm: RhythmKey }>`
  ${({ theme, $rhythm }) => {
    const gap = theme.rhythm[$rhythm].sectionGap
    return css`
      gap: calc(${gap} / 1.6);
    `
  }}
`

export default function SectionRecipe({
  title,
  intro,
  children,
  surface = 'subtle',
  accent = 'neutral',
  narrow = false,
  titleId,
  ariaLabel,
  footer,
  rhythm = 'default',
}: Props) {
  const tone = mapTone(surface)

  const header =
    title || intro ? (
      <HeaderStack gap={0} $rhythm={rhythm}>
        {title ? (
          isPrimitive(title) ? (
            <Typography as="h2" variant="h2" accent={accent} id={titleId}>
              {title}
            </Typography>
          ) : (
            title
          )
        ) : null}
        {intro ? (
          isPrimitive(intro) ? (
            <Typography as="p" variant="body" color="mutedFg">
              {intro}
            </Typography>
          ) : (
            intro
          )
        ) : null}
      </HeaderStack>
    ) : null

  return (
    <Section
      container={narrow ? 'narrow' : 'default'}
      padY
      ariaLabel={ariaLabel}
      titleId={title ? titleId : undefined}
      rhythm={rhythm}
    >
      <BodyStack gap={0} $rhythm={rhythm}>
        {header}
        {surface === 'none' ? (
          <>{children}</>
        ) : (
          <Surface
            tone={tone}
            accent={accent}
            radius="large"
            bordered
            padding="clamp(0.8rem,1.8vw,1.2rem)"
          >
            {children}
          </Surface>
        )}
        {footer ?? null}
      </BodyStack>
    </Section>
  )
}
