// src/app/blog/layout.tsx
import React from 'react'
import ArticleLayout from '@/components/blog/ArticleLayout'
import ReadingProgress from '@/components/blog/ReadingProgress'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ReadingProgress />
      <ArticleLayout>{children}</ArticleLayout>
    </>
  )
}
