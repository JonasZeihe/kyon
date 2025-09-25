// src/app/blog/components/PostBody.tsx
'use client'

import React from 'react'
import matter from 'gray-matter'
import { MarkdownStyles } from '@/styles/MarkdownStyles'
import type { PostFull } from '@/lib/blog/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
import dynamic from 'next/dynamic'
import Badge from '@/components/badge/Badge'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import ListComponent from '@/components/data-display/ListComponent'
import HighlightText from '@/components/utilities/HighlightText'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import FeatureCard from '@/components/card/FeatureCard'
import ProjectCard from '@/components/card/ProjectCard'

const MediaDisplay = dynamic(
  () => import('@/components/data-display/MediaDisplay'),
  { ssr: false }
)
const Lightbox = dynamic(() => import('@/components/lightbox/Lightbox'), {
  ssr: false,
})

type Props = { post: PostFull }

function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'note' | 'warning' | 'success' | 'tip'
  title?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`callout ${type}`}>
      {title ? <div className="callout-title">{title}</div> : null}
      <div className="callout-body">{children}</div>
    </div>
  )
}

const Note = ({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) => (
  <Callout type="note" title={title}>
    {children}
  </Callout>
)

const Warning = ({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) => (
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
  const childArray = React.Children.toArray(children)
  const allStrings = childArray.every((c) => typeof c === 'string')
  const text = allStrings ? (childArray as string[]).join('') : null

  const content =
    typeof text === 'string' ? (
      <pre>
        <code className={language ? `language-${language}` : undefined}>
          {text}
        </code>
      </pre>
    ) : (
      <>{children}</>
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

export default function PostBody({ post }: Props) {
  const raw = post.raw || ''
  const { content } = matter(raw)
  const mdxSource = content

  const components = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <MediaDisplay
        base={post.meta.assetBasePath}
        variant="large"
        media={[
          {
            type: 'image',
            src: String(props.src || ''),
            alt: String(props.alt || ''),
            caption:
              typeof props.title === 'string' ? String(props.title) : undefined,
          },
        ]}
      />
    ),
    MediaDisplay: (p: React.ComponentProps<typeof MediaDisplay>) => (
      <MediaDisplay {...p} base={post.meta.assetBasePath} />
    ),
    Badge,
    BadgeGrid,
    Button,
    ButtonGrid,
    ListComponent,
    HighlightText,
    Lightbox,
    SmoothScroller,
    FeatureCard,
    ProjectCard,
    Callout,
    Note,
    Warning,
    NumberedSummary,
    CodeBlock,
  }

  return (
    <MarkdownStyles as="div">
      {post.isMDX ? (
        <MDXRemote source={mdxSource} components={components as any} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: post.bodySource || '' }} />
      )}
    </MarkdownStyles>
  )
}
