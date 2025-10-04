// src/components/pagekit/recipes/SectionRecipe.tsx
import type { ReactNode } from 'react'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import { AccentKey } from '@/design/theme'

type SurfaceVariant = 'subtle' | 'intense' | 'none'

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
}

const isPrimitive = (n: ReactNode): n is string | number =>
  typeof n === 'string' || typeof n === 'number'

const mapTone = (v: SurfaceVariant): 'neutral' | 'elevated' | 'accent' => {
  if (v === 'intense') return 'accent'
  if (v === 'none') return 'neutral'
  return 'neutral'
}

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
}: Props) {
  const header =
    title || intro ? (
      <Stack gap={0.75}>
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
      </Stack>
    ) : null

  const tone = mapTone(surface)

  return (
    <Section
      container={narrow ? 'narrow' : 'default'}
      padY
      ariaLabel={ariaLabel}
      titleId={title ? titleId : undefined}
    >
      <Stack gap={1.25}>
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
      </Stack>
    </Section>
  )
}
