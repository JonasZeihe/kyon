// src/components/pagekit/islands/PageMeta.tsx
'use client'

import type { TOCItem } from '@/lib/blog/types'
import StickyToc from '@/app/blog/meta/StickyToc'
import ReadingProgress from '@/app/blog/meta/ReadingProgress'

type Props = {
  tocItems?: TOCItem[]
  showProgress?: boolean
  ariaLabel?: string
}

export default function PageMeta({
  tocItems = [],
  showProgress = true,
  ariaLabel = 'Artikel-Navigation',
}: Props) {
  const hasToc = Array.isArray(tocItems) && tocItems.length > 0

  return (
    <aside aria-label={ariaLabel}>
      {showProgress ? <ReadingProgress /> : null}
      {hasToc ? <StickyToc items={tocItems} /> : null}
    </aside>
  )
}
