'use client'

import styled, { css } from 'styled-components'

export const MarkdownStyles = styled.div`
  line-height: 1.75;
  font-size: 1.125rem;
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
    margin: 2.2rem 0 1rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  h1 {
    font-size: clamp(1.9rem, 2.6vw, 2.6rem);
  }
  h2 {
    font-size: clamp(1.6rem, 2.1vw, 2.1rem);
  }
  h3 {
    font-size: clamp(1.3rem, 1.7vw, 1.7rem);
  }
  h4 {
    font-size: clamp(1.15rem, 1.4vw, 1.4rem);
  }
  h5 {
    font-size: 1.05rem;
  }
  h6 {
    font-size: 1rem;
  }

  p {
    margin: 1rem 0;
  }

  a {
    text-decoration: underline;
    text-underline-offset: 0.15em;
    text-decoration-thickness: 0.08em;
    transition: opacity 0.2s ease;
  }
  a:hover {
    opacity: 0.85;
  }

  ul,
  ol {
    margin: 1rem 0 1rem 1.25rem;
    padding: 0;
  }
  li {
    margin: 0.35rem 0;
  }
  li > ul,
  li > ol {
    margin-top: 0.35rem;
  }

  blockquote {
    margin: 1.25rem 0;
    padding: 0.75rem 1rem;
    border-left: 0.25rem solid;
    opacity: 0.95;
  }

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.95em;
    padding: 0.15em 0.35em;
    border-radius: 0.3rem;
  }

  pre {
    overflow: auto;
    padding: 1rem;
    border-radius: 0.6rem;
    line-height: 1.55;
    font-size: 0.95rem;
    margin: 1.25rem 0;
  }
  pre code {
    padding: 0;
    background: transparent;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
    font-size: 0.95rem;
  }
  th,
  td {
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid;
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
    margin: 2rem 0;
  }

  .callout {
    display: grid;
    gap: 0.5rem;
    padding: 0.9rem 1rem;
    border-left: 4px solid;
    border-radius: 0.5rem;
    margin: 1.25rem 0;
  }
  .callout-title {
    font-weight: 600;
    letter-spacing: -0.005em;
  }
  .callout-body > :first-child {
    margin-top: 0;
  }
  .callout-body > :last-child {
    margin-bottom: 0;
  }

  .callout.info {
    border-left-color: var(--c-info-border);
    background: var(--c-info-bg);
    color: inherit;
  }
  .callout.note {
    border-left-color: var(--c-note-border);
    background: var(--c-note-bg);
    color: inherit;
  }
  .callout.warning {
    border-left-color: var(--c-warn-border);
    background: var(--c-warn-bg);
    color: inherit;
  }
  .callout.success {
    border-left-color: var(--c-success-border);
    background: var(--c-success-bg);
    color: inherit;
  }
  .callout.tip {
    border-left-color: var(--c-tip-border);
    background: var(--c-tip-bg);
    color: inherit;
  }

  .numbered-summary {
    counter-reset: kyon-num;
    list-style: none;
    margin: 1.25rem 0;
    padding-left: 0;
  }
  .numbered-summary > li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    margin: 0.6rem 0;
  }
  .numbered-summary > li::before {
    counter-increment: kyon-num;
    content: counter(kyon-num);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.9rem;
    line-height: 1;
    background: var(--n-pill-bg);
    color: var(--n-pill-fg);
    transform: translateY(0.15rem);
  }

  .codeblock {
    margin: 1.25rem 0;
    border-radius: 0.6rem;
    overflow: hidden;
    border: 1px solid var(--cb-border);
    background: var(--cb-bg);
  }
  .codeblock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.85rem;
    font-size: 0.85rem;
    border-bottom: 1px solid var(--cb-border);
    background: var(--cb-head);
  }
  .codeblock-title {
    font-weight: 600;
  }
  .codeblock-lang {
    opacity: 0.75;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
  }
  .codeblock-body {
    padding: 0.75rem;
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
    blockquote {
      background: ${p.theme.colors.surface.card};
      border-left-color: ${p.theme.colors.accent.main};
    }
    code {
      background: ${p.theme.colors.surface[1]};
    }
    pre {
      background: ${p.theme.colors.surface[2]};
    }
    th,
    td {
      border-bottom-color: ${p.theme.colors.surface[4]};
    }
    hr {
      background: ${p.theme.colors.surface[4]};
    }

    --c-info-bg: ${p.theme.colors.surface[1]};
    --c-info-border: ${p.theme.colors.primary[2]};
    --c-note-bg: ${p.theme.colors.surface[1]};
    --c-note-border: ${p.theme.colors.accent[3]};
    --c-warn-bg: ${p.theme.colors.surface[1]};
    --c-warn-border: ${p.theme.colors.highlight[3]};
    --c-success-bg: ${p.theme.colors.surface[1]};
    --c-success-border: ${p.theme.colors.secondary[3]};
    --c-tip-bg: ${p.theme.colors.surface[1]};
    --c-tip-border: ${p.theme.colors.primary[3]};

    --n-pill-bg: ${p.theme.colors.primary[1]};
    --n-pill-fg: ${p.theme.colors.primary[6]};

    --cb-border: ${p.theme.colors.surface[4]};
    --cb-bg: ${p.theme.colors.surface[1]};
    --cb-head: ${p.theme.colors.surface[2]};
  `}
`
