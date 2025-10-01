// src/components/pagekit/recipes/HeroRecipe.tsx
import { ReactNode } from 'react'
import HeroWrapper from '@/components/Wrapper/HeroWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import Typography from '@/styles/Typography'
import type { AccentKey, MotifKey } from '@/styles/theme'

type ContainerSize = 'default' | 'wide' | 'narrow'

type HeroRecipeProps = {
  title: ReactNode
  kicker?: ReactNode
  lead?: ReactNode
  media?: ReactNode
  container?: ContainerSize
  motif?: Extract<MotifKey, 'edgeToEdge' | 'spotlight'> | 'none'
  accent?: AccentKey | 'neutral'
  isPageHeader?: boolean
  titleId?: string
}

export default function HeroRecipe({
  title,
  kicker,
  lead,
  media,
  container = 'default',
  motif = 'none',
  accent = 'neutral',
  isPageHeader = false,
  titleId,
}: HeroRecipeProps) {
  const size: ContainerSize =
    motif === 'edgeToEdge'
      ? 'wide'
      : container === 'narrow'
        ? 'narrow'
        : container

  const titleVariant = isPageHeader ? 'h1' : 'h2'
  const titleAs = isPageHeader ? 'h1' : 'h2'
  const titleColor = accent === 'neutral' ? undefined : `${accent}.main`

  return (
    <HeroWrapper as="section" role="region" aria-labelledby={titleId}>
      <ContainerWrapper $size={size}>
        {kicker ? (
          <Typography as="p" variant="caption" color="text.subtle">
            {kicker}
          </Typography>
        ) : null}
        <Typography
          as={titleAs}
          variant={titleVariant as any}
          color={titleColor}
          id={titleId}
        >
          {title}
        </Typography>
        {lead ? (
          <Typography as="p" variant="body" color="text.subtle" gutter={false}>
            {lead}
          </Typography>
        ) : null}
        {media ? media : null}
      </ContainerWrapper>
    </HeroWrapper>
  )
}
