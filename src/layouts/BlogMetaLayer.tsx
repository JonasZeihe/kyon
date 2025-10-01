// src/layouts/BlogMetaLayer.tsx
'use client'

import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import PageMeta from '@/components/pagekit/islands/PageMeta'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import type { TOCItem } from '@/lib/blog/types'
import {
  FEATURE_READING_PROGRESS,
  FEATURE_BREADCRUMBS,
  FEATURE_STICKY_TOC,
} from '@/lib/blog/meta-config'

export type BreadcrumbItem = { href?: string; label: string }

type Props = {
  toc?: TOCItem[]
  breadcrumbs?: BreadcrumbItem[]
  showProgress?: boolean
  articleAnchorSelector?: string
  tocAsideAnchor?: string
}

export default function BlogMetaLayer({
  toc = [],
  breadcrumbs = [],
  showProgress = true,
}: Props) {
  const hasToc = Array.isArray(toc) && toc.length > 0
  const showBreadcrumbs = FEATURE_BREADCRUMBS && breadcrumbs.length > 0
  const showProgressBar = FEATURE_READING_PROGRESS && showProgress
  const showToc = FEATURE_STICKY_TOC && hasToc

  return (
    <>
      {showBreadcrumbs ? (
        <ContainerWrapper $size="default" $padY={false}>
          <Breadcrumbs items={breadcrumbs} />
        </ContainerWrapper>
      ) : null}
      {showProgressBar || showToc ? (
        <PageMeta
          tocItems={showToc ? toc : []}
          showProgress={showProgressBar}
        />
      ) : null}
    </>
  )
}
