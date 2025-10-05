// src/components/pagekit/recipes/ArticleRecipe.tsx
'use client'

import { ReactNode } from 'react'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import { AccentKey } from '@/design/theme'
import ArticleGrid from '@/components/blog/ArticleGrid'
import ArticleLayout from '@/components/blog/ArticleLayout'

type SurfaceVariant = 'subtle' | 'intense' | 'none'
type BodyWidth = 'narrow' | 'default' | 'wide'

type Props = {
  header: ReactNode
  body: ReactNode
  asideMeta?: ReactNode
  surface?: SurfaceVariant
  accent?: AccentKey | 'neutral'
  narrow?: boolean
  bodyWidth?: BodyWidth
  titleId?: string
  ariaLabel?: string
}

const mapTone = (v: SurfaceVariant): 'neutral' | 'elevated' | 'accent' => {
  if (v === 'intense') return 'accent'
  if (v === 'none') return 'neutral'
  return 'neutral'
}

const widthFor = (w: BodyWidth) =>
  w === 'wide' ? '110ch' : w === 'narrow' ? '70ch' : '90ch'

export default function ArticleRecipe({
  header,
  body,
  asideMeta,
  surface = 'subtle',
  accent = 'neutral',
  narrow = false,
  bodyWidth = 'wide',
  titleId,
  ariaLabel,
}: Props) {
  const tone = mapTone(surface)
  const widthToken = widthFor(bodyWidth)

  return (
    <Section
      container={narrow ? 'narrow' : 'wide'}
      padY
      ariaLabel={ariaLabel}
      titleId={titleId}
    >
      <ArticleLayout>
        <ArticleGrid aside={asideMeta}>
          <Surface
            tone={tone}
            accent={accent}
            radius="large"
            bordered
            padding="clamp(1rem, 2vw, 1.4rem)"
            data-toc-anchor
          >
            <Stack gap={1}>
              {typeof header === 'string' ? (
                <Typography as="h2" variant="h2" accent={accent}>
                  {header}
                </Typography>
              ) : (
                header
              )}
            </Stack>
          </Surface>
          <Surface
            tone={tone}
            accent={accent}
            radius="large"
            bordered
            padding="clamp(1rem, 2vw, 1.4rem)"
            data-reading-root
            style={{ ['--article-max-width' as any]: widthToken }}
          >
            {body}
          </Surface>
        </ArticleGrid>
      </ArticleLayout>
    </Section>
  )
}
