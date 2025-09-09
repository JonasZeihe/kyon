// src/lib/markdown/mdx-components.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/badge/Badge'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import MediaDisplay from '@/components/data-display/MediaDisplay'
import HighlightText from '@/components/utilities/HighlightText'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import Lightbox from '@/components/lightbox/Lightbox'

function joinUrl(base: string, rel: string) {
  const b = base.replace(/\/+$/, '')
  const r = rel.replace(/^\.?\//, '')
  return `${b}/${r}`.replace(/\/{2,}/g, '/')
}

function MDXImgFactory(assetBaseUrl?: string) {
  return function MDXImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    const src = typeof props.src === 'string' ? props.src : ''
    const isRel = src && !/^([a-z]+:)?\/\//i.test(src) && !src.startsWith('/')
    const resolved = isRel && assetBaseUrl ? joinUrl(assetBaseUrl, src) : src
    const width = typeof props.width === 'number' ? props.width : 1200
    const height = typeof props.height === 'number' ? props.height : 800
    const alt = typeof props.alt === 'string' ? props.alt : ''
    return (
      <Image
        src={resolved}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        unoptimized
        style={{ width: '100%', height: 'auto' }}
      />
    )
  }
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode
}

function MDXAnchor(props: AnchorProps) {
  const { href = '', children, ...rest } = props
  const content = children ?? href
  const isExternal = /^https?:\/\//i.test(href)
  if (isExternal) {
    return (
      <a
        href={href}
        rel="noopener noreferrer nofollow"
        target="_blank"
        {...rest}
      >
        {content}
      </a>
    )
  }
  return <Link href={href}>{content}</Link>
}

function H1(p: React.HTMLAttributes<HTMLHeadingElement>) {
  const { children, ...r } = p
  return <h1 {...r}>{children ?? ''}</h1>
}
function H2(p: React.HTMLAttributes<HTMLHeadingElement>) {
  const { children, ...r } = p
  return <h2 {...r}>{children ?? ''}</h2>
}
function H3(p: React.HTMLAttributes<HTMLHeadingElement>) {
  const { children, ...r } = p
  return <h3 {...r}>{children ?? ''}</h3>
}
function H4(p: React.HTMLAttributes<HTMLHeadingElement>) {
  const { children, ...r } = p
  return <h4 {...r}>{children ?? ''}</h4>
}
function H5(p: React.HTMLAttributes<HTMLHeadingElement>) {
  const { children, ...r } = p
  return <h5 {...r}>{children ?? ''}</h5>
}
function H6(p: React.HTMLAttributes<HTMLHeadingElement>) {
  const { children, ...r } = p
  return <h6 {...r}>{children ?? ''}</h6>
}

function P(p: React.HTMLAttributes<HTMLParagraphElement>) {
  const { children, ...r } = p
  return <p {...r}>{children ?? ''}</p>
}
function UL(p: React.HTMLAttributes<HTMLUListElement>) {
  const { children, ...r } = p
  return <ul {...r}>{children}</ul>
}
function OL(p: React.HTMLAttributes<HTMLOListElement>) {
  const { children, ...r } = p
  return <ol {...r}>{children}</ol>
}
function LI(p: React.LiHTMLAttributes<HTMLLIElement>) {
  const { children, ...r } = p
  return <li {...r}>{children}</li>
}
function Blockquote(p: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  const { children, ...r } = p
  return <blockquote {...r}>{children}</blockquote>
}
function Code(p: React.HTMLAttributes<HTMLElement>) {
  const { children, ...r } = p
  return <code {...r}>{children}</code>
}
function Pre(p: React.HTMLAttributes<HTMLPreElement>) {
  const { children, ...r } = p
  return <pre {...r}>{children}</pre>
}
function Table(p: React.TableHTMLAttributes<HTMLTableElement>) {
  const { children, ...r } = p
  return <table {...r}>{children}</table>
}
function Thead(p: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { children, ...r } = p
  return <thead {...r}>{children}</thead>
}
function Tbody(p: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { children, ...r } = p
  return <tbody {...r}>{children}</tbody>
}
function Tr(p: React.HTMLAttributes<HTMLTableRowElement>) {
  const { children, ...r } = p
  return <tr {...r}>{children}</tr>
}
function Th(p: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  const { children, ...r } = p
  return <th {...r}>{children}</th>
}
function Td(p: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  const { children, ...r } = p
  return <td {...r}>{children}</td>
}

export function getMDXComponents(assetBaseUrl?: string) {
  const Img = MDXImgFactory(assetBaseUrl)
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    ul: UL,
    ol: OL,
    li: LI,
    blockquote: Blockquote,
    code: Code,
    pre: Pre,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    a: MDXAnchor,
    img: Img,
    Badge,
    BadgeGrid,
    Button,
    ButtonGrid,
    CardWrapper,
    MediaDisplay,
    HighlightText,
    SmoothScroller,
    Lightbox,
  }
}
