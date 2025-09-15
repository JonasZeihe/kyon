// --- src/app/blog/components/PostBody.tsx ---
import { MarkdownStyles } from '@/styles/MarkdownStyles'
import type { PostFull, TOCItem } from '@/lib/blog/types'
import ArticleTOC from '@/components/blog/ArticleTOC'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import React from 'react'

import MDXImageCmp from '@/components/media/MDXImage'
import Badge from '@/components/badge/Badge'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import MediaDisplay from '@/components/data-display/MediaDisplay'
import ListComponent from '@/components/data-display/ListComponent'
import HighlightText from '@/components/utilities/HighlightText'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import Lightbox from '@/components/lightbox/Lightbox'

type Props = { post: PostFull; toc?: TOCItem[] }

type CalloutProps = {
  type?: 'info' | 'note' | 'warning' | 'success' | 'tip'
  title?: string
  children?: React.ReactNode
}
function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={`callout ${type}`}>
      {title ? <div className="callout-title">{title}</div> : null}
      <div className="callout-body">{children}</div>
    </div>
  )
}
const Note = ({ title, children }: Omit<CalloutProps, 'type'>) => (
  <Callout type="note" title={title}>
    {children}
  </Callout>
)
const Warning = ({ title, children }: Omit<CalloutProps, 'type'>) => (
  <Callout type="warning" title={title}>
    {children}
  </Callout>
)

function NumberedSummary(
  props: React.OlHTMLAttributes<HTMLOListElement> & {
    children?: React.ReactNode
  }
) {
  const { children, ...rest } = props
  return (
    <ol className="numbered-summary" {...rest}>
      {children}
    </ol>
  )
}

function CodeBlock({
  title,
  lang,
  children,
}: {
  title?: string
  lang?: string
  children?: React.ReactNode
}) {
  const language = lang ? lang.toLowerCase() : ''
  const content =
    typeof children === 'string' ? (
      <pre>
        <code className={language ? `language-${language}` : undefined}>
          {children}
        </code>
      </pre>
    ) : (
      children
    )
  return (
    <div className="codeblock" data-language={language || undefined}>
      {title ? (
        <div className="codeblock-header">
          <span className="codeblock-title">{title}</span>
          {language ? <span className="codeblock-lang">{language}</span> : null}
        </div>
      ) : null}
      <div className="codeblock-body">{content}</div>
    </div>
  )
}

export default function PostBody({ post, toc }: Props) {
  const items = (toc || post.toc || []).filter((i) => i.depth >= 2)
  const raw = post.raw || ''
  const { content } = matter(raw)

  const components = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <MDXImageCmp {...props} base={post.meta.assetBasePath} />
    ),
    MDXImage: (props: React.ComponentProps<typeof MDXImageCmp>) => (
      <MDXImageCmp {...props} base={post.meta.assetBasePath} />
    ),
    Badge,
    BadgeGrid,
    Button,
    ButtonGrid,
    CardWrapper,
    MediaDisplay,
    ListComponent,
    HighlightText,
    Lightbox,
    SmoothScroller,
    Callout,
    Note,
    Warning,
    NumberedSummary,
    CodeBlock,
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
      <div style={{ order: 1 }}>
        <MarkdownStyles as="div">
          <MDXRemote source={content} components={components as any} />
        </MarkdownStyles>
      </div>
      {!!items.length && (
        <div style={{ order: 2 }}>
          <ArticleTOC items={items} />
        </div>
      )}
    </div>
  )
}
