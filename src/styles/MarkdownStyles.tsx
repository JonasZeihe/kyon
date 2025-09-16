// --- src/styles/MarkdownStyles.tsx ---
'use client'

import styled, { css } from 'styled-components'

export const MarkdownStyles = styled.div`
  line-height: 1.7;
  font-size: 1.065rem;
  word-break: break-word;
  max-width: 72ch;
  margin-left: auto;
  margin-right: auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.25;
    margin: 2rem 0 0.9rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  h1 {
    font-size: clamp(1.9rem, 2.4vw, 2.4rem);
  }
  h2 {
    font-size: clamp(1.55rem, 2vw, 2rem);
  }
  h3 {
    font-size: clamp(1.28rem, 1.6vw, 1.6rem);
  }
  h4 {
    font-size: clamp(1.14rem, 1.35vw, 1.35rem);
  }
  h5 {
    font-size: 1.05rem;
  }
  h6 {
    font-size: 1rem;
  }

  p {
    margin: 0.9rem 0;
  }

  a {
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
    transition: opacity 0.18s ease;
  }
  a:hover {
    opacity: 0.88;
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
    margin: 0.33rem 0;
  }
  li > ul {
    list-style: circle;
    margin-top: 0.33rem;
  }
  li > ol {
    list-style: lower-alpha;
    margin-top: 0.33rem;
  }

  blockquote {
    margin: 1.1rem 0;
    padding: 0.7rem 0.95rem;
    border-left: 0.25rem solid;
    border-radius: 0.5rem;
  }

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.95em;
    padding: 0.12em 0.34em;
    border-radius: 0.3rem;
  }

  pre {
    overflow: auto;
    padding: 0.9rem;
    border-radius: 0.55rem;
    line-height: 1.55;
    font-size: 0.95rem;
    margin: 1.1rem 0;
  }
  pre code {
    padding: 0;
    background: transparent;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.1rem 0;
    font-size: 0.96rem;
  }
  th,
  td {
    padding: 0.6rem 0.7rem;
    text-align: left;
    vertical-align: top;
  }
  thead th {
    font-weight: 700;
  }

  img,
  video {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1rem auto;
    border-radius: 0.5rem;
  }

  hr {
    border: none;
    height: 1px;
    margin: 1.6rem 0;
  }

  .callout {
    display: grid;
    gap: 0.45rem;
    padding: 0.85rem 0.95rem;
    border-left: 4px solid;
    border-radius: 0.5rem;
    margin: 1.1rem 0;
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
    margin: 0.55rem 0;
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
  }

  .codeblock {
    margin: 1.1rem 0;
    border-radius: 0.55rem;
    overflow: hidden;
  }
  .codeblock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.55rem 0.8rem;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .codeblock-body {
    padding: 0.7rem;
  }
  .codeblock-body pre {
    margin: 0;
    border-radius: 0.4rem;
  }

  ${(p: any) => css`
    color: ${p.theme.colors.text.main};

    a {
      color: ${p.theme.colors.primary.main};
    }
    a:hover {
      color: ${p.theme.colors.accent.main};
    }

    blockquote {
      background: ${p.theme.colors.surface[1]};
      border-left-color: ${p.theme.colors.accent.main};
      color: ${p.theme.colors.text.main};
    }
    code {
      background: ${p.theme.colors.surface[1]};
      border: 1px solid ${p.theme.colors.surface[4]};
      color: ${p.theme.colors.text.main};
    }
    pre {
      background: ${p.theme.colors.surface[2]};
      border: 1px solid ${p.theme.colors.surface[4]};
    }
    th,
    td {
      border-bottom: 1px solid ${p.theme.colors.surface[4]};
    }
    thead th {
      background: ${p.theme.colors.surface[1]};
    }
    hr {
      background: ${p.theme.colors.surface[4]};
    }

    .callout.info {
      border-left-color: ${p.theme.colors.primary[3]};
      background: ${p.theme.colors.surface[1]};
    }
    .callout.note {
      border-left-color: ${p.theme.colors.accent[3]};
      background: ${p.theme.colors.surface[1]};
    }
    .callout.warning {
      border-left-color: ${p.theme.colors.highlight[3]};
      background: ${p.theme.colors.surface[1]};
    }
    .callout.success {
      border-left-color: ${p.theme.colors.secondary[3]};
      background: ${p.theme.colors.surface[1]};
    }
    .callout.tip {
      border-left-color: ${p.theme.colors.primary[4]};
      background: ${p.theme.colors.surface[1]};
    }

    .numbered-summary > li::before {
      background: ${p.theme.colors.primary[1]};
      color: ${p.theme.colors.primary[6]};
    }

    .codeblock {
      border: 1px solid ${p.theme.colors.surface[4]};
      background: ${p.theme.colors.surface[1]};
    }
    .codeblock-header {
      border-bottom: 1px solid ${p.theme.colors.surface[4]};
      background: ${p.theme.colors.surface[2]};
      color: ${p.theme.colors.text.main};
    }
  `}
`
