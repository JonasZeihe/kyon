// src/components/pagekit/recipes/ArticleRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import { AccentKey } from '@/design/theme'

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

const Layout = styled.div<{ $hasAside: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasAside }) =>
    $hasAside ? 'minmax(0,1fr) 22rem' : '1fr'};
  gap: ${({ theme }) => theme.spacing(2.5)};
  align-items: start;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const Main = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  min-width: 0;
`

const Aside = styled.aside`
  position: sticky;
  top: calc(var(--header-height, 72px) + 0.75rem);
  align-self: start;
  height: fit-content;
  isolation: isolate;
  z-index: 100;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    top: auto;
    margin-top: ${({ theme }) => theme.spacing(1.5)};
  }
`

const mapTone = (v: SurfaceVariant): 'neutral' | 'elevated' | 'accent' => {
  if (v === 'intense') return 'accent'
  if (v === 'none') return 'neutral'
  return 'neutral'
}

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
  const hasAside = !!asideMeta
  const tone = mapTone(surface)
  const widthToken =
    bodyWidth === 'wide' ? '90ch' : bodyWidth === 'narrow' ? '70ch' : '84ch'

  return (
    <Section
      container={narrow ? 'narrow' : 'wide'}
      padY
      ariaLabel={ariaLabel}
      titleId={titleId}
    >
      <Layout $hasAside={hasAside}>
        <Main>
          <Surface
            tone={tone}
            accent={accent}
            radius="large"
            bordered
            padding="clamp(1rem, 2vw, 1.4rem)"
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
        </Main>
        {hasAside && <Aside>{asideMeta}</Aside>}
      </Layout>
    </Section>
  )
}
