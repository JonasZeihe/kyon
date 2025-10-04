// src/components/primitives/Stack.tsx
'use client'

import { Children, ReactNode } from 'react'
import styled from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'

type Props = {
  gap?: number | string
  align?: Align
  splitAfter?: number
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

const toGap = (theme: any, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  return theme.spacing(1)
}

const Box = styled.div<{ $gap?: number | string; $align: Align }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) =>
    $align === 'start' ? 'flex-start' : $align === 'end' ? 'flex-end' : $align};
  gap: ${({ theme, $gap }) => toGap(theme, $gap)};
  min-width: 0;
`

const Spacer = styled.div`
  flex: 1 1 auto;
  min-height: 0;
`

export default function Stack({
  gap = 1,
  align = 'stretch',
  splitAfter,
  children,
  ...rest
}: Props) {
  if (typeof splitAfter === 'number' && splitAfter >= 0) {
    const items = Children.toArray(children)
    const head = items.slice(0, splitAfter)
    const tail = items.slice(splitAfter)
    return (
      <Box $gap={gap} $align={align} {...rest}>
        {head}
        <Spacer />
        {tail}
      </Box>
    )
  }
  return (
    <Box $gap={gap} $align={align} {...rest}>
      {children}
    </Box>
  )
}
