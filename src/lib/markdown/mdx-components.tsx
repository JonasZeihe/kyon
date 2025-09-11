import React from 'react'
import Link from 'next/link'
import MDXImage from '@/components/media/MDXImage'
import Badge from '@/components/badge/Badge'
import BadgeGrid from '@/components/badge/BadgeGrid'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import MediaDisplay from '@/components/data-display/MediaDisplay'
import HighlightText from '@/components/utilities/HighlightText'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import Lightbox from '@/components/lightbox/Lightbox'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode
}

const A: React.FC<AnchorProps> = (p) => {
  const { href = '', children, ...rest } = p
  const c = children ?? href
  return /^https?:\/\//i.test(href) ? (
    <a href={href} rel="noopener noreferrer nofollow" target="_blank" {...rest}>
      {c}
    </a>
  ) : (
    <Link href={href}>{c}</Link>
  )
}
A.displayName = 'A'

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (p) => {
  const { children, ...r } = p
  return <h1 {...r}>{children ?? ''}</h1>
}
H1.displayName = 'H1'

const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (p) => {
  const { children, ...r } = p
  return <h2 {...r}>{children ?? ''}</h2>
}
H2.displayName = 'H2'

const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (p) => {
  const { children, ...r } = p
  return <h3 {...r}>{children ?? ''}</h3>
}
H3.displayName = 'H3'

const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (p) => {
  const { children, ...r } = p
  return <h4 {...r}>{children ?? ''}</h4>
}
H4.displayName = 'H4'

const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (p) => {
  const { children, ...r } = p
  return <h5 {...r}>{children ?? ''}</h5>
}
H5.displayName = 'H5'

const H6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (p) => {
  const { children, ...r } = p
  return <h6 {...r}>{children ?? ''}</h6>
}
H6.displayName = 'H6'

const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (p) => {
  const { children, ...r } = p
  return <p {...r}>{children ?? ''}</p>
}
P.displayName = 'P'

const UL: React.FC<React.HTMLAttributes<HTMLUListElement>> = (p) => {
  const { children, ...r } = p
  return <ul {...r}>{children}</ul>
}
UL.displayName = 'UL'

const OL: React.FC<React.HTMLAttributes<HTMLOListElement>> = (p) => {
  const { children, ...r } = p
  return <ol {...r}>{children}</ol>
}
OL.displayName = 'OL'

const LI: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = (p) => {
  const { children, ...r } = p
  return <li {...r}>{children}</li>
}
LI.displayName = 'LI'

const BQ: React.FC<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = (p) => {
  const { children, ...r } = p
  return <blockquote {...r}>{children}</blockquote>
}
BQ.displayName = 'Blockquote'

const Code: React.FC<React.HTMLAttributes<HTMLElement>> = (p) => {
  const { children, ...r } = p
  return <code {...r}>{children}</code>
}
Code.displayName = 'Code'

const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = (p) => {
  const { children, ...r } = p
  return <pre {...r}>{children}</pre>
}
Pre.displayName = 'Pre'

const T: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (p) => {
  const { children, ...r } = p
  return <table {...r}>{children}</table>
}
T.displayName = 'Table'

const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (p) => {
  const { children, ...r } = p
  return <thead {...r}>{children}</thead>
}
Thead.displayName = 'Thead'

const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (p) => {
  const { children, ...r } = p
  return <tbody {...r}>{children}</tbody>
}
Tbody.displayName = 'Tbody'

const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (p) => {
  const { children, ...r } = p
  return <tr {...r}>{children}</tr>
}
Tr.displayName = 'Tr'

const Th: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = (
  p
) => {
  const { children, ...r } = p
  return <th {...r}>{children}</th>
}
Th.displayName = 'Th'

const Td: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = (p) => {
  const { children, ...r } = p
  return <td {...r}>{children}</td>
}
Td.displayName = 'Td'

type CalloutProps = {
  type?: 'info' | 'note' | 'warning' | 'success' | 'tip'
  title?: string
  children?: React.ReactNode
}

const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  return (
    <div className={`callout ${type}`}>
      {title ? <div className="callout-title">{title}</div> : null}
      <div className="callout-body">{children}</div>
    </div>
  )
}

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
}) => {
  return (
    <ol className="numbered-summary" {...rest}>
      {children}
    </ol>
  )
}

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
  code: Code,
  pre: Pre,
  table: T,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  a: A,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <MDXImage {...props} base={assetBaseUrl} />
  ),
  Badge,
  BadgeGrid,
  Button,
  ButtonGrid,
  CardWrapper,
  MediaDisplay,
  HighlightText,
  SmoothScroller,
  Lightbox,
  Callout,
  Note,
  Warning,
  NumberedSummary,
  CodeBlock,
})

export { getMDXComponents }
