// src/components/primitives/Surface.tsx
'use client'

import styled, { useTheme } from 'styled-components'
import { ReactNode, forwardRef } from 'react'
import { AccentKey } from '@/design/theme'

type Tone = 'neutral' | 'elevated' | 'accent'

type Props = {
  tone?: Tone
  accent?: AccentKey | 'neutral'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'pill'
  padding?: string
  bordered?: boolean
  children?: ReactNode
  as?: any
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'color'>

const Base = styled.div<{
  $radius: NonNullable<Props['radius']>
  $padding?: string
  $bg: string
  $bordered: boolean
  $borderColor: string
  $shadow?: string
}>`
  position: relative;
  border-radius: ${({ theme, $radius }) => theme.borderRadius[$radius]};
  padding: ${({ $padding }) => ($padding ? $padding : 0)};
  background: ${({ $bg }) => $bg};
  border: ${({ $bordered, $borderColor }) =>
    $bordered ? `1px solid ${$borderColor}` : 'none'};
  box-shadow: ${({ $shadow }) => $shadow || 'none'};
`

export default forwardRef<HTMLDivElement, Props>(function Surface(
  {
    tone = 'neutral',
    accent = 'neutral',
    radius = 'large',
    padding,
    bordered = false,
    children,
    ...rest
  },
  ref
) {
  const theme = useTheme()

  const acc =
    accent === 'neutral'
      ? {
          color: theme.semantic.fg,
          border: theme.semantic.border,
          focusRing: theme.semantic.focusRing,
        }
      : theme.accentFor(accent)

  const bg =
    tone === 'accent'
      ? `color-mix(in oklab, ${acc.color} 12%, ${theme.semantic.card})`
      : tone === 'elevated'
        ? theme.semantic.surface
        : theme.semantic.card

  const borderColor = tone === 'accent' ? acc.border : theme.semantic.border
  const shadow = tone === 'elevated' ? theme.boxShadow.sm : undefined

  return (
    <Base
      ref={ref}
      $radius={radius}
      $padding={padding}
      $bg={bg}
      $bordered={bordered}
      $borderColor={borderColor}
      $shadow={shadow}
      {...rest}
    >
      {children}
    </Base>
  )
})
