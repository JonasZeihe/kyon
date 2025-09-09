// src/styles/MarkdownStyles.tsx
'use client'

import styled, { css } from 'styled-components'

export const MarkdownStyles = styled.div`
  line-height: 1.7;
  font-size: 1rem;
  word-break: break-word;

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
  `}
`
