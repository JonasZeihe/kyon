// src/components/primitives/Grid.tsx
'use client'

import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type Columns = number | 'auto'
type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

type Props = {
  columns?: Columns
  min?: string
  gap?: number | string
  dense?: boolean
  switchAt?: BreakpointKey | string
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

const toGap = (theme: any, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  return theme.spacing(2)
}

const GridBox = styled.div<{
  $columns: Columns
  $min?: string
  $gap?: number | string
  $dense?: boolean
  $switch?: string
}>`
  display: grid;
  ${({ theme, $gap }) => css`
    gap: ${toGap(theme, $gap)};
  `}
  grid-auto-flow: ${({ $dense }) => ($dense ? 'row dense' : 'row')};
  ${({ $columns, $min }) =>
    $columns === 'auto'
      ? css`
          grid-template-columns: repeat(
            auto-fit,
            minmax(${($min as string) || '18rem'}, 1fr)
          );
        `
      : css`
          grid-template-columns: repeat(
            ${Number($columns || 1)},
            minmax(0, 1fr)
          );
        `};

  ${({ theme, $switch }) =>
    $switch
      ? css`
          @media (max-width: ${$switch in theme.breakpoints
              ? theme.breakpoints[$switch as keyof typeof theme.breakpoints]
              : $switch}) {
            grid-template-columns: 1fr;
          }
        `
      : ''}
`

export default function Grid({
  columns = 'auto',
  min = '18rem',
  gap = 2,
  dense = false,
  switchAt = 'md',
  children,
  ...rest
}: Props) {
  return (
    <GridBox
      $columns={columns}
      $min={min}
      $gap={gap}
      $dense={dense}
      $switch={switchAt}
      {...rest}
    >
      {children}
    </GridBox>
  )
}
