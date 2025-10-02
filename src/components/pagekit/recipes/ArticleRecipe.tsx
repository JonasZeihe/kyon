// src/components/pagekit/recipes/ArticleRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import { MarkdownStyles } from '@/styles/MarkdownStyles'
import HeadingEnhancer from '@/app/blog/components/HeadingEnhancer'
import type { RhythmKey } from '@/styles/theme'

type SurfaceVariant = 'subtle' | 'intense' | 'none'

type ArticleRecipeProps = {
  header: ReactNode
  body: ReactNode
  asideMeta?: ReactNode
  surface?: SurfaceVariant
  rhythm?: RhythmKey
  narrow?: boolean
}

export default function ArticleRecipe({
  header,
  body,
  asideMeta,
  surface = 'subtle',
  rhythm = 'default',
  narrow = false,
}: ArticleRecipeProps) {
  const containerSize = narrow ? 'narrow' : 'default'
  return (
    <>
      <SectionWrapper $spacious={rhythm === 'spacious'}>
        <ContainerWrapper $size={containerSize as any}>
          <Stack role="group" aria-label="Artikel">
            <LumenWrapper
              as="header"
              variant={surface}
              radius="large"
              padding="clamp(0.8rem,1.8vw,1.2rem) clamp(0.9rem,2vw,1.2rem)"
              data-toc-anchor
            >
              {header}
            </LumenWrapper>
            <LumenWrapper
              as="article"
              variant={surface}
              radius="large"
              data-reading-root
            >
              <MarkdownStyles>
                <HeadingEnhancer />
                {body}
              </MarkdownStyles>
            </LumenWrapper>
          </Stack>
        </ContainerWrapper>
      </SectionWrapper>

      {asideMeta ? (
        <SectionWrapper $spacious={rhythm === 'spacious'}>
          <ContainerWrapper $size={containerSize as any}>
            {asideMeta}
          </ContainerWrapper>
        </SectionWrapper>
      ) : null}
    </>
  )
}

const Stack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
  align-items: start;
`
