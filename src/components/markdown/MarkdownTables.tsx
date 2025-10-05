// src/components/markdown/MarkdownTables.tsx
'use client'

import styled, { css } from 'styled-components'

export const tableStyles = css`
  .table-wrap {
    width: 100%;
    overflow-x: auto;
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
    border-bottom: 1px solid ${({ theme }) => theme.semantic.border};
  }

  thead th {
    font-weight: 700;
    background: ${({ theme }) => theme.semantic.surface};
  }
`

const MarkdownTables = styled.div`
  ${tableStyles}
`

export default MarkdownTables
