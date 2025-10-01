// src/components/pagekit/recipes/ArticleRecipe.tsx
import { ReactNode } from 'react'
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
  rhythm = 'spacious',
  narrow = false,
}: ArticleRecipeProps) {
  const containerSize = narrow ? 'narrow' : 'default'
  return (
    <>
      <SectionWrapper $spacious={rhythm === 'spacious'}>
        <ContainerWrapper $size={containerSize as any}>
          <LumenWrapper
            as="header"
            variant={surface}
            radius="large"
            data-toc-anchor
          >
            {header}
          </LumenWrapper>
        </ContainerWrapper>
      </SectionWrapper>
      {asideMeta ? (
        <SectionWrapper $spacious={rhythm === 'spacious'}>
          <ContainerWrapper $size={containerSize as any}>
            {asideMeta}
          </ContainerWrapper>
        </SectionWrapper>
      ) : null}
      <SectionWrapper $spacious={rhythm === 'spacious'}>
        <ContainerWrapper $size={containerSize as any}>
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
        </ContainerWrapper>
      </SectionWrapper>
    </>
  )
}
