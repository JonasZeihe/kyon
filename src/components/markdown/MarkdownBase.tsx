// src/components/markdown/MarkdownBase.tsx
'use client'

import styled, { css } from 'styled-components'

const scrollVars = css`
  --md-max-width: var(--article-max-width, 84ch);
  --md-scroll-margin: var(--article-scroll-margin, var(--header-height, 74px));
`

const headingBase = (t: any) => css`
  line-height: ${t.typography.lineHeight.tight};
  margin-block: 1.4rem 0.85rem;
  font-weight: ${t.typography.fontWeight.bold};
  letter-spacing: ${t.typography.letterSpacing.tight};
  color: ${t.semantic.fg};
`

const listBase = css`
  margin: 0.9rem 0 0.9rem 1.25rem;
  padding: 0;
`

const tableBase = (t: any) => css`
  width: 100%;
  border-collapse: collapse;
  margin: 1.1rem 0;
  font-size: 0.96rem;
  display: block;
  overflow-x: auto;
  max-width: 100%;

  th,
  td {
    padding: 0.6rem 0.7rem;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid ${t.semantic.border};
  }

  thead th {
    font-weight: 700;
    background: ${t.semantic.surface};
  }
`

const mediaBase = (t: any) => css`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1.1rem auto;
  border-radius: ${t.borderRadius.medium};
  box-shadow: ${t.boxShadow.xs};
  background: ${t.semantic.surface};
`

const blockquoteBase = (t: any) => css`
  margin: 1.1rem 0;
  padding: 0.9rem 1rem;
  border-left: 0.28rem solid ${t.semantic.focusRing};
  border-radius: ${t.borderRadius.medium};
  background: ${t.semantic.surface};
`

const linkBase = (t: any) => css`
  color: ${t.semantic.link};
  text-decoration: underline;
  text-underline-offset: 0.16em;
  text-decoration-thickness: 0.06em;
  transition:
    color 0.18s ease,
    opacity 0.18s ease;
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    color: ${t.semantic.linkHover};
  }
`

const hrBase = (t: any) => css`
  border: none;
  height: 1px;
  margin: 1.4rem 0;
  background: ${t.semantic.border};
`

const MarkdownBase = styled.div`
  ${scrollVars};
  max-width: var(--md-max-width);
  margin-inline: auto;
  width: 100%;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  word-break: break-word;
  color: ${({ theme }) => theme.semantic.fg};

  & > :first-child {
    margin-top: 0;
  }
  & > :last-child {
    margin-bottom: 0;
  }

  :where(h1, h2, h3, h4, h5, h6) {
    scroll-margin-top: var(--md-scroll-margin);
  }

  h1 {
    ${({ theme }) => headingBase(theme)};
    font-size: ${({ theme }) => theme.typography.fontSize.h1};
  }
  h2 {
    ${({ theme }) => headingBase(theme)};
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
  }
  h3 {
    ${({ theme }) => headingBase(theme)};
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }
  h4 {
    ${({ theme }) => headingBase(theme)};
    font-size: ${({ theme }) => theme.typography.fontSize.h4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
  h5 {
    ${({ theme }) => headingBase(theme)};
    font-size: 1.05rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
  h6 {
    ${({ theme }) => headingBase(theme)};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  p {
    margin-block: 0.9rem;
  }

  a {
    ${({ theme }) => linkBase(theme)};
  }

  ul,
  ol {
    ${listBase};
  }

  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
  li {
    margin: 0.3rem 0;
  }
  li > ul {
    list-style: circle;
    margin-top: 0.28rem;
  }
  li > ol {
    list-style: lower-alpha;
    margin-top: 0.28rem;
  }

  blockquote {
    ${({ theme }) => blockquoteBase(theme)};
    color: ${({ theme }) => theme.semantic.fg};
  }

  table {
    ${({ theme }) => tableBase(theme)};
  }

  figure {
    margin: 1.1rem auto;
    max-width: 100%;
    text-align: center;
  }
  figcaption {
    margin-top: 0.5rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    color: ${({ theme }) => theme.semantic.mutedFg};
  }

  img,
  video,
  picture {
    ${({ theme }) => mediaBase(theme)};
  }

  hr {
    ${({ theme }) => hrBase(theme)};
  }
`

export default MarkdownBase
