// src/lib/markdown/mdx-components.tsx
import * as React from 'react'
import Link from 'next/link'
import Badge from '@/components/badge/Badge'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import MediaDisplay from '@/components/data-display/MediaDisplay'
import ListComponent from '@/components/data-display/ListComponent'
import HighlightText from '@/components/utilities/HighlightText'
import SmoothScroller from '@/components/utilities/SmoothScroller'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode
}

const A: React.FC<AnchorProps> = ({ href = '', children, ...rest }) => {
  const c = children ?? href
  if (!href) return <a {...rest}>{c}</a>
  if (href.startsWith('#'))
    return (
      <SmoothScroller targetId={href.slice(1)} href={href} {...rest}>
        {c}
      </SmoothScroller>
    )
  if (/^https?:\/\//i.test(href))
    return (
      <a
        href={href}
        rel="noopener noreferrer nofollow"
        target="_blank"
        {...rest}
      >
        {c}
      </a>
    )
  return (
    <Link href={href} {...rest}>
      {c}
    </Link>
  )
}

const isMediaDisplayElement = (el: unknown) => {
  if (!React.isValidElement(el)) return false
  if (el.type === MediaDisplay) return true
  const anyType: any = el.type
  const dn = anyType?.displayName || anyType?.name
  return dn === 'MediaDisplay' || (el.props as any)?.mdxInline
}

const isOnlyImageLike = (children: React.ReactNode) => {
  const arr = React.Children.toArray(children).filter(Boolean)
  if (arr.length !== 1) return false
  const only = arr[0]
  if (!React.isValidElement(only)) return false
  const t = only.type as any
  if (typeof t === 'string') return t === 'img' || t === 'figure'
  return isMediaDisplayElement(only)
}

const hasBlockyChild = (children: React.ReactNode): boolean => {
  let blocky = false
  React.Children.forEach(children as any, (child) => {
    if (!React.isValidElement(child)) return
    const t = child.type as any
    if (typeof t === 'string') {
      if (t === 'figure' || t === 'div' || t === 'img') blocky = true
      return
    }
    if (isMediaDisplayElement(child)) blocky = true
  })
  return blocky
}

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...r
}) => <h1 {...r}>{children ?? ''}</h1>
const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...r
}) => <h2 {...r}>{children ?? ''}</h2>
const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...r
}) => <h3 {...r}>{children ?? ''}</h3>
const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...r
}) => <h4 {...r}>{children ?? ''}</h4>
const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...r
}) => <h5 {...r}>{children ?? ''}</h5>
const H6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...r
}) => <h6 {...r}>{children ?? ''}</h6>

const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...rest
}) => {
  if (isOnlyImageLike(children)) return <div {...rest}>{children}</div>
  if (hasBlockyChild(children)) return <div {...rest}>{children}</div>
  return <p {...rest}>{children ?? ''}</p>
}

const UL: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
  children,
  ...r
}) => <ul {...r}>{children}</ul>
const OL: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({
  children,
  ...r
}) => <ol {...r}>{children}</ol>
const LI: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
  children,
  ...r
}) => <li {...r}>{children}</li>
const BQ: React.FC<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = ({
  children,
  ...r
}) => <blockquote {...r}>{children}</blockquote>
const CodeInline: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...r
}) => <code {...r}>{children}</code>
const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  children,
  ...r
}) => <pre {...r}>{children}</pre>
const T: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...r
}) => <table {...r}>{children}</table>
const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...r
}) => <thead {...r}>{children}</thead>
const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...r
}) => <tbody {...r}>{children}</tbody>
const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...r
}) => <tr {...r}>{children}</tr>
const Th: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({
  children,
  ...r
}) => <th {...r}>{children}</th>
const Td: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = ({
  children,
  ...r
}) => <td {...r}>{children}</td>

type CalloutProps = {
  type?: 'info' | 'note' | 'warning' | 'success' | 'tip'
  title?: string
  children?: React.ReactNode
}
const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => (
  <div className={`callout ${type}`}>
    {title ? <div className="callout-title">{title}</div> : null}
    <div className="callout-body">{children}</div>
  </div>
)
const Note: React.FC<Omit<CalloutProps, 'type'>> = ({ title, children }) => (
  <Callout type="note" title={title}>
    {children}
  </Callout>
)
const Warning: React.FC<Omit<CalloutProps, 'type'>> = ({ title, children }) => (
  <Callout type="warning" title={title}>
    {children}
  </Callout>
)

type NumberedSummaryProps = React.OlHTMLAttributes<HTMLOListElement> & {
  children?: React.ReactNode
}
const NumberedSummary: React.FC<NumberedSummaryProps> = ({
  children,
  ...rest
}) => (
  <ol className="numbered-summary" {...rest}>
    {children}
  </ol>
)

type CodeBlockProps = {
  title?: string
  lang?: string
  children?: React.ReactNode
}
const CodeBlock: React.FC<CodeBlockProps> = ({ title, lang, children }) => {
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

const getMDXComponents = (assetBaseUrl?: string) => ({
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
  blockquote: BQ,
  code: CodeInline,
  pre: Pre,
  table: T,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  a: A,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <MediaDisplay
      mdxInline
      base={assetBaseUrl}
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
  Badge,
  BadgeGrid,
  Button,
  ButtonGrid,
  MediaDisplay,
  ListComponent,
  HighlightText,
  SmoothScroller,
  Callout,
  Note,
  Warning,
  NumberedSummary,
  CodeBlock,
})

export { getMDXComponents }
