// --- src/components/Wrapper/AutoGrid.tsx ---
'use client'

import styled, { css } from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'space-between' | 'stretch'

type Props = {
  $min?: string
  $gap?: number
  $rowGap?: number
  $align?: Align
  $justify?: Justify
  $dense?: boolean
  $columns?: number | 'auto'
}

const AutoGrid = styled.div<Props>`
  display: grid;
  ${({ $gap = 2, theme }) => css`
    gap: ${theme.spacing($gap)};
  `}
  ${({ $rowGap, theme }) =>
    $rowGap != null &&
    css`
      row-gap: ${theme.spacing($rowGap)};
    `}
  align-items: ${({ $align = 'stretch' }) => $align};
  justify-items: ${({ $justify = 'stretch' }) =>
    $justify === 'space-between' ? 'stretch' : $justify};
  grid-auto-flow: ${({ $dense }) => ($dense ? 'row dense' : 'row')};
  ${({ $min = '18rem', $columns = 'auto' }) =>
    $columns === 'auto'
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(${$min}, 1fr));
        `
      : css`
          grid-template-columns: repeat(${$columns}, minmax(0, 1fr));
        `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ $min = '18rem' }) => css`
      grid-template-columns: repeat(auto-fit, minmax(${$min}, 1fr));
    `}
  }
`

export default AutoGrid
