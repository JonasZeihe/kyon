// src/components/primitives/Surface.tsx
'use client'

import styled from 'styled-components'
import { ReactNode, forwardRef } from 'react'
import { AccentKey } from '@/design/theme'
import useAccent from '@/design/hooks/useAccent'

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
  $radius: Props['radius']
  $padding?: string
  $bg: string
  $bordered: boolean
  $borderColor: string
  $shadow?: string
}>`
  position: relative;
  border-radius: ${({ theme, $radius }) =>
    (theme.borderRadius as any)?.[$radius || 'large'] || '1rem'};
  padding: ${({ $padding }) => ($padding ? $padding : 0)};
  background: ${({ $bg }) => $bg};
  border: ${({ $bordered, $borderColor }) =>
    $bordered ? `1px solid ${$borderColor}` : 'none'};
  box-shadow: ${({ $shadow }) => $shadow || 'none'};
`

const Surface = forwardRef<HTMLDivElement, Props>(function Surface(
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
  const a = useAccent(accent)
  return (
    <Base
      ref={ref}
      $radius={radius}
      $padding={padding}
      $bg={(rest.style?.background as string) ?? 'transparent'}
      $bordered={bordered}
      $borderColor={tone === 'accent' ? a.border : a.border}
      $shadow={tone === 'elevated' ? undefined : undefined}
      {...rest}
    >
      {children}
    </Base>
  )
})

export default Surface
