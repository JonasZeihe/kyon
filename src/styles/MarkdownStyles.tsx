// src/styles/MarkdownStyles.tsx
'use client'

import styled, { css } from 'styled-components'

export const MarkdownStyles = styled.div`
  --ms-max-width: var(--article-max-width, 78ch);
  --ms-scroll-margin: var(--article-scroll-margin, 88px);

  max-width: var(--ms-max-width);
  margin-inline: auto;
  width: 100%;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  word-break: break-word;

  & > :first-child {
    margin-top: 0;
  }
  & > :last-child {
    margin-bottom: 0;
  }

  :where(h1, h2, h3, h4, h5, h6) {
    scroll-margin-top: var(--ms-scroll-margin);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    margin-block: 1.4rem 0.85rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  }
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.h1};
  }
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
  }
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
  }
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.h4};
  }
  h5 {
    font-size: 1.05rem;
  }
  h6 {
    font-size: 1rem;
  }

  p {
    margin-block: 0.9rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
    transition:
      color 0.18s ease,
      opacity 0.18s ease;
    overflow-wrap: anywhere;
  }
  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
  }

  ul,
  ol {
    margin: 0.9rem 0 0.9rem 1.25rem;
    padding: 0;
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
    margin: 1.1rem 0;
    padding: 0.9rem 1rem;
    border-left: 0.28rem solid ${({ theme }) => theme.colors.accent.main};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background: ${({ theme }) => theme.colors.surface[1]};
  }

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.95em;
    padding: 0.12em 0.34em;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background: ${({ theme }) => theme.colors.surface[1]};
    border: 1px solid ${({ theme }) => theme.colors.surface[4]};
    color: ${({ theme }) => theme.colors.text.main};
  }

  pre {
    overflow: auto;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    line-height: 1.55;
    font-size: 0.95rem;
    margin: 1.1rem 0;
    max-width: 100%;
    background: ${({ theme }) => theme.colors.surface[2]};
    border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  }
  pre code {
    padding: 0;
    background: transparent;
    white-space: pre;
    border: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.1rem 0;
    font-size: 0.96rem;
    display: block;
    overflow-x: auto;
    max-width: 100%;
  }
  th,
  td {
    padding: 0.6rem 0.7rem;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid ${({ theme }) => theme.colors.surface[4]};
  }
  thead th {
    font-weight: 700;
    background: ${({ theme }) => theme.colors.surface[1]};
  }

  figure {
    margin: 1.1rem auto;
    max-width: 100%;
    text-align: center;
  }
  figcaption {
    margin-top: 0.5rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    color: ${({ theme }) => theme.colors.text.subtle};
  }

  img,
  video,
  picture {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.1rem auto;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    background: ${({ theme }) => theme.colors.surface.card};
  }

  hr {
    border: none;
    height: 1px;
    margin: 1.4rem 0;
    background: ${({ theme }) => theme.colors.surface[4]};
  }

  .callout {
    display: grid;
    gap: 0.5rem;
    padding: 0.95rem 1rem;
    border-left: 4px solid ${({ theme }) => theme.colors.primary[3]};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    margin: 1.1rem 0;
    background: ${({ theme }) => theme.colors.surface[1]};
  }
  .callout-title {
    font-weight: 600;
  }
  .callout-body > :first-child {
    margin-top: 0;
  }
  .callout-body > :last-child {
    margin-bottom: 0;
  }

  .callout.note {
    border-left-color: ${({ theme }) => theme.colors.accent[3]};
  }
  .callout.warning {
    border-left-color: ${({ theme }) => theme.colors.highlight[3]};
  }
  .callout.success {
    border-left-color: ${({ theme }) => theme.colors.secondary[3]};
  }
  .callout.tip {
    border-left-color: ${({ theme }) => theme.colors.primary[4]};
  }

  .numbered-summary {
    counter-reset: kyon-num;
    list-style: none;
    margin: 1.1rem 0;
    padding-left: 0;
  }
  .numbered-summary > li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    align-items: start;
    margin: 0.6rem 0;
  }
  .numbered-summary > li::before {
    counter-increment: kyon-num;
    content: counter(kyon-num);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1;
    transform: translateY(0.12rem);
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
  }

  .codeblock {
    margin: 1.1rem 0;
  }

  .codeblock {
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.surface[4]};
    background: ${({ theme }) => theme.colors.surface[1]};
  }
  .codeblock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.85rem;
    font-size: 0.85rem;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.colors.surface[4]};
    background: ${({ theme }) => theme.colors.surface[2]};
    color: ${({ theme }) => theme.colors.text.main};
  }
  .codeblock-body {
    padding: 0.8rem;
  }
  .codeblock-body pre {
    margin: 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  ${(p: any) => css`
    color: ${p.theme.colors.text.main};
  `}
`
