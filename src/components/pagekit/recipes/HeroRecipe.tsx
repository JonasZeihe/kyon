// src/components/pagekit/recipes/HeroRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import HeroWrapper from '@/components/Wrapper/HeroWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import Typography from '@/styles/Typography'
import type { AccentKey } from '@/styles/theme'

type ContainerSize = 'default' | 'wide' | 'narrow'
type Variant = 'default' | 'split'

type HeroRecipeProps = {
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

const MediaShell = styled.div<{ $aspect?: string }>`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 1px;
  background: ${({ theme }) => theme.gradients.accent};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden;

  > .inner {
    position: relative;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.surface.card};
    overflow: hidden;
    ${({ $aspect }) =>
      $aspect ? `aspect-ratio: ${$aspect};` : `aspect-ratio: 16/9;`}
  }
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
}: HeroRecipeProps) {
  const size: ContainerSize = container === 'narrow' ? 'narrow' : container
  const titleVariant = isPageHeader ? 'h1' : 'h2'
  const titleAs = isPageHeader ? 'h1' : 'h2'
  const titleColor = accent === 'neutral' ? undefined : `${accent}.main`

  return (
    <HeroWrapper as="section" role="region" aria-labelledby={titleId}>
      <ContainerWrapper $size={size}>
        {variant === 'split' ? (
          <Split>
            <div>
              {kicker ? (
                isPrimitive(kicker) ? (
                  <Typography as="p" variant="caption" color="text.subtle">
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
                  color={titleColor}
                  id={titleId}
                >
                  {title}
                </Typography>
              ) : (
                title
              )}
              {lead ? (
                isPrimitive(lead) ? (
                  <Typography
                    as="p"
                    variant="body"
                    color="text.subtle"
                    gutter={false}
                  >
                    {lead}
                  </Typography>
                ) : (
                  lead
                )
              ) : null}
            </div>
            {media ? (
              <MediaShell $aspect={mediaAspect}>
                <div className="inner">{media}</div>
              </MediaShell>
            ) : null}
          </Split>
        ) : (
          <>
            {kicker ? (
              isPrimitive(kicker) ? (
                <Typography as="p" variant="caption" color="text.subtle">
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
                color={titleColor}
                id={titleId}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
            {lead ? (
              isPrimitive(lead) ? (
                <Typography
                  as="p"
                  variant="body"
                  color="text.subtle"
                  gutter={false}
                >
                  {lead}
                </Typography>
              ) : (
                lead
              )
            ) : null}
            {media ? (
              <MediaShell>
                <div className="inner">{media}</div>
              </MediaShell>
            ) : null}
          </>
        )}
      </ContainerWrapper>
    </HeroWrapper>
  )
}
