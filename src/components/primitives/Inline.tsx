// src/components/primitives/Inline.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

type Props = {
  gap?: number | string
  align?: Align
  justify?: Justify
  wrap?: boolean
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

const toGap = (theme: any, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  return theme.spacing(1)
}

const mapJustify = (j: Justify) =>
  j === 'start'
    ? 'flex-start'
    : j === 'end'
      ? 'flex-end'
      : j === 'between'
        ? 'space-between'
        : j === 'around'
          ? 'space-around'
          : j === 'evenly'
            ? 'space-evenly'
            : 'center'

const Row = styled.div<{
  $gap?: number | string
  $align: Align
  $justify: Justify
  $wrap: boolean
}>`
  display: flex;
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  align-items: ${({ $align }) =>
    $align === 'start' ? 'flex-start' : $align === 'end' ? 'flex-end' : $align};
  justify-content: ${({ $justify }) => mapJustify($justify)};
  gap: ${({ theme, $gap }) => toGap(theme, $gap)};
  min-width: 0;
`

export default function Inline({
  gap = 1,
  align = 'center',
  justify = 'start',
  wrap = true,
  children,
  ...rest
}: Props) {
  return (
    <Row $gap={gap} $align={align} $justify={justify} $wrap={wrap} {...rest}>
      {children}
    </Row>
  )
}
