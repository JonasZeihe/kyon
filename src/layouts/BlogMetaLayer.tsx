// src/layouts/BlogMetaLayer.tsx
'use client'

import Container from '@/components/primitives/Container'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import ReadingProgress from '@/app/blog/meta/ReadingProgress'
import type { TOCItem } from '@/lib/blog/types'
import {
  FEATURE_READING_PROGRESS,
  FEATURE_BREADCRUMBS,
} from '@/lib/blog/meta-config'

export type BreadcrumbItem = { href?: string; label: string }

type Props = {
  toc?: TOCItem[]
  breadcrumbs?: BreadcrumbItem[]
  showProgress?: boolean
}

export default function BlogMetaLayer({
  breadcrumbs = [],
  showProgress = true,
}: Props) {
  const showBreadcrumbs = FEATURE_BREADCRUMBS && breadcrumbs.length > 0
  const showProgressBar = FEATURE_READING_PROGRESS && showProgress

  return (
    <>
      {showBreadcrumbs ? (
        <Container max="default">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      ) : null}
      {showProgressBar ? <ReadingProgress /> : null}
    </>
  )
}
