// src/components/markdown/MarkdownBase.tsx
'use client'

import styled, { css, DefaultTheme } from 'styled-components'

const scrollVars = css`
  --md-max-width: var(--article-max-width, 84ch);
  --md-scroll-margin: var(--article-scroll-margin, var(--header-height, 74px));
`

const headingBase = (t: DefaultTheme) => css`
  line-height: ${t.typography.lineHeight.tight};
  margin-block: ${t.spacing(2)} ${t.spacing(1)};
  font-weight: ${t.typography.fontWeight.bold};
  letter-spacing: ${t.typography.letterSpacing.tight};
  color: ${t.semantic.fg};
`

const listBase = (t: DefaultTheme) => css`
  margin: ${t.spacing(1)} 0 ${t.spacing(1)} ${t.spacing(1.5)};
  padding: 0;
`

const tableBase = (t: DefaultTheme) => css`
  width: 100%;
  border-collapse: collapse;
  margin: ${t.spacing(1.25)} 0;
  font-size: 0.96rem;
  display: block;
  overflow-x: auto;
  max-width: 100%;

  th,
  td {
    padding: ${t.spacingHalf(2)} ${t.spacing(0.9)};
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid ${t.semantic.border};
  }

  thead th {
    font-weight: 700;
    background: ${t.semantic.surface};
  }
`

const mediaBase = (t: DefaultTheme) => css`
  display: block;
  max-width: 100%;
  height: auto;
  margin: ${t.spacing(1.25)} auto;
  border-radius: ${t.borderRadius.medium};
  box-shadow: ${t.boxShadow.xs};
  background: ${t.semantic.surface};
`

const blockquoteBase = (t: DefaultTheme) => css`
  margin: ${t.spacing(1.25)} 0;
  padding: ${t.spacing(1)} ${t.spacing(1.25)};
  border-left: 0.28rem solid ${t.semantic.focusRing};
  border-radius: ${t.borderRadius.medium};
  background: ${t.semantic.surface};
  color: ${t.semantic.fg};
`

const hrBase = (t: DefaultTheme) => css`
  border: none;
  height: 1px;
  margin: ${t.spacing(1.5)} 0;
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
    margin-block: ${({ theme }) => theme.spacing(1)};
  }

  ul,
  ol {
    ${({ theme }) => listBase(theme)};
  }

  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
  li {
    margin: ${({ theme }) => theme.spacingHalf(3)} 0;
  }
  li > ul {
    list-style: circle;
    margin-top: ${({ theme }) => theme.spacingHalf(3)};
  }
  li > ol {
    list-style: lower-alpha;
    margin-top: ${({ theme }) => theme.spacingHalf(3)};
  }

  blockquote {
    ${({ theme }) => blockquoteBase(theme)};
  }

  table {
    ${({ theme }) => tableBase(theme)};
  }

  figure {
    margin: ${({ theme }) => theme.spacing(1.25)} auto;
    max-width: 100%;
    text-align: center;
  }
  figcaption {
    margin-top: ${({ theme }) => theme.spacingHalf(3)};
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
