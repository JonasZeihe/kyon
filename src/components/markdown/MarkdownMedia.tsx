// src/components/markdown/MarkdownMedia.tsx
'use client'

import styled, { css } from 'styled-components'

export const mediaStyles = css`
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
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.1rem auto;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    background: ${({ theme }) => theme.semantic.surface};
  }
`

const MarkdownMedia = styled.div`
  ${mediaStyles}
`

export default MarkdownMedia
