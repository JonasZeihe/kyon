// src/app/blog/layout.tsx
import React from 'react'
import ArticleLayout from '@/components/blog/ArticleLayout'
import ArticleGrid from '@/components/blog/ArticleGrid'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ArticleLayout>
      <ArticleGrid aside={<div data-toc-aside />}>{children}</ArticleGrid>
    </ArticleLayout>
  )
}
