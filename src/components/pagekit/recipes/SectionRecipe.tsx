// src/components/pagekit/recipes/SectionRecipe.tsx
import { ReactNode } from 'react'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import Typography from '@/styles/Typography'
import type { AccentKey, MotifKey, RhythmKey } from '@/styles/theme'

type SurfaceVariant = 'subtle' | 'intense' | 'none'

type SectionRecipeProps = {
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  surface?: SurfaceVariant
  rhythm?: RhythmKey
  accent?: AccentKey | 'neutral'
  narrow?: boolean
  motif?: MotifKey | 'none'
  titleId?: string
  ariaLabel?: string
}

export default function SectionRecipe({
  title,
  intro,
  children,
  surface = 'subtle',
  rhythm = 'default',
  accent = 'neutral',
  narrow = false,
  motif = 'none',
  titleId,
  ariaLabel,
}: SectionRecipeProps) {
  const containerSize = narrow
    ? 'narrow'
    : motif === 'edgeToEdge'
      ? 'wide'
      : 'default'
  const titleColor = accent === 'neutral' ? undefined : `${accent}.main`

  return (
    <SectionWrapper $spacious={rhythm === 'spacious'}>
      <ContainerWrapper $size={containerSize as any}>
        <LumenWrapper
          as="section"
          role="region"
          aria-label={ariaLabel}
          aria-labelledby={title ? titleId : undefined}
          variant={surface}
          radius="large"
        >
          {title ? (
            <Typography as="h2" variant="h2" color={titleColor} id={titleId}>
              {title}
            </Typography>
          ) : null}
          {intro ? (
            <Typography as="p" variant="body" color="text.subtle">
              {intro}
            </Typography>
          ) : null}
          {children}
        </LumenWrapper>
      </ContainerWrapper>
    </SectionWrapper>
  )
}
