// src/app/blog/components/PostBody.tsx
'use client'

import { useMemo } from 'react'
import { MarkdownStyles } from '@/styles/MarkdownStyles'
import type { PostFull, TOCItem } from '@/lib/blog/types'
import ArticleTOC from '@/components/blog/ArticleTOC'

type Props = {
  post: PostFull
  toc?: TOCItem[]
}

export default function PostBody({ post, toc }: Props) {
  const ids = useMemo(
    () => (toc || post.toc || []).filter((i) => i.depth >= 2).map((i) => i.id),
    [toc, post.toc]
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
      {!!(toc || post.toc)?.length && (
        <div style={{ order: 2 }}>
          <ArticleTOC items={toc || post.toc || []} />
        </div>
      )}
      <div style={{ order: 1 }}>
        <MarkdownStyles
          dangerouslySetInnerHTML={{ __html: post.bodySource || '' }}
        />
      </div>
    </div>
  )
}
