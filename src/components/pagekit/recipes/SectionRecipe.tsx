// src/components/pagekit/recipes/SectionRecipe.tsx
import { ReactNode } from 'react'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import Typography from '@/styles/Typography'
import type { AccentKey, RhythmKey } from '@/styles/theme'

type SurfaceVariant = 'subtle' | 'intense' | 'none'

type SectionRecipeProps = {
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  surface?: SurfaceVariant
  rhythm?: RhythmKey
  accent?: AccentKey | 'neutral'
  narrow?: boolean
  titleId?: string
  ariaLabel?: string
  footer?: ReactNode
}

const isPrimitive = (n: ReactNode): n is string | number =>
  typeof n === 'string' || typeof n === 'number'

export default function SectionRecipe({
  title,
  intro,
  children,
  surface = 'subtle',
  rhythm = 'default',
  accent = 'neutral',
  narrow = false,
  titleId,
  ariaLabel,
  footer,
}: SectionRecipeProps) {
  const containerSize = narrow ? 'narrow' : 'default'
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
            isPrimitive(title) ? (
              <Typography as="h2" variant="h2" color={titleColor} id={titleId}>
                {title}
              </Typography>
            ) : (
              title
            )
          ) : null}
          {intro ? (
            isPrimitive(intro) ? (
              <Typography as="p" variant="body" color="text.subtle">
                {intro}
              </Typography>
            ) : (
              intro
            )
          ) : null}
          {children}
          {footer ?? null}
        </LumenWrapper>
      </ContainerWrapper>
    </SectionWrapper>
  )
}
