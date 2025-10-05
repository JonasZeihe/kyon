// src/components/primitives/Surface.tsx
'use client'

import styled from 'styled-components'
import { ReactNode, forwardRef, useMemo } from 'react'
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
  const a = useAccent(accent)
  const computed = useMemo(() => {
    const t = (rest as any).theme
    return t
  }, [rest])

  const bg = useMemo(() => {
    const theme = (rest as any).theme
    if (!theme) return 'transparent'
    if (tone === 'accent') return theme.semantic.surface
    if (tone === 'elevated') return theme.semantic.card
    return theme.semantic.card
  }, [rest, tone])

  const borderColor = useMemo(() => {
    const theme = (rest as any).theme
    if (!theme) return a.border
    if (tone === 'accent') return a.border
    return theme.semantic.border
  }, [rest, tone, a.border])

  const shadow = useMemo(() => {
    const theme = (rest as any).theme
    if (!theme) return undefined
    if (tone === 'elevated') return theme.boxShadow.sm
    return undefined
  }, [rest, tone])

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
