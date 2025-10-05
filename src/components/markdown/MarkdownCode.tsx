// src/components/markdown/MarkdownCode.tsx
'use client'

import styled, { css } from 'styled-components'

export const codeStyles = css`
  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.95em;
    padding: 0.12em 0.34em;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background: ${({ theme }) => theme.semantic.surface};
    border: 1px solid ${({ theme }) => theme.semantic.border};
    color: ${({ theme }) => theme.semantic.fg};
  }

  pre {
    overflow: auto;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    line-height: 1.55;
    font-size: 0.95rem;
    margin: 1.1rem 0;
    max-width: 100%;
    background: ${({ theme }) => theme.semantic.surface};
    border: 1px solid ${({ theme }) => theme.semantic.border};
  }

  pre code {
    padding: 0;
    background: transparent;
    white-space: pre;
    border: 0;
  }

  .codeblock {
    margin: 1.1rem 0;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.semantic.border};
    background: ${({ theme }) => theme.semantic.surface};
  }

  .codeblock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.85rem;
    font-size: 0.85rem;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.semantic.border};
    background: ${({ theme }) => theme.semantic.surface};
    color: ${({ theme }) => theme.semantic.fg};
  }

  .codeblock-body {
    padding: 0.8rem;
  }

  .codeblock-body pre {
    margin: 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`

const MarkdownCode = styled.div`
  ${codeStyles}
`

export default MarkdownCode
