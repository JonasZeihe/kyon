// src/components/markdown/MarkdownCallouts.tsx
'use client'

import styled, { css } from 'styled-components'

const calloutColor = (
  k: 'primary' | 'secondary' | 'accent' | 'highlight',
  t: any
) => t.accentFor(k).color

export const calloutStyles = css`
  .callout {
    display: grid;
    gap: 0.5rem;
    padding: 0.95rem 1rem;
    border-left: 4px solid ${({ theme }) => theme.semantic.focusRing};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    margin: 1.1rem 0;
    background: ${({ theme }) => theme.semantic.surface};
    color: ${({ theme }) => theme.semantic.fg};
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
    border-left-color: ${({ theme }) => calloutColor('accent', theme)};
  }
  .callout.warning {
    border-left-color: ${({ theme }) => calloutColor('highlight', theme)};
  }
  .callout.success {
    border-left-color: ${({ theme }) => calloutColor('secondary', theme)};
  }
  .callout.tip {
    border-left-color: ${({ theme }) => calloutColor('primary', theme)};
  }
`

const MarkdownCallouts = styled.div`
  ${calloutStyles}
`

export default MarkdownCallouts
