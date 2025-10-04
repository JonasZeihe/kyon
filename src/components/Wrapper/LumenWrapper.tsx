// src/components/Wrapper/LumenWrapper.tsx
'use client'

import { forwardRef, memo, ReactNode } from 'react'
import styled from 'styled-components'

export const LUMEN_VARIANTS = {
  intense: 'intense',
  subtle: 'subtle',
  none: 'none',
} as const

export const LUMEN_RADII = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const

type LumenVariant = keyof typeof LUMEN_VARIANTS
type LumenRadius = keyof typeof LUMEN_RADII

type ContainerProps = {
  $radius?: LumenRadius
  $padding?: string
  $backgroundColor?: string
  $variant?: LumenVariant
}

const resolveBackground = (
  theme: any,
  variant?: LumenVariant,
  override?: string
) => {
  if (override) return override
  if (variant === 'none') return 'transparent'
  if (variant === 'intense') return theme.gradients.primary
  return theme.colors.surface.card
}

const resolveBorder = (theme: any, variant?: LumenVariant) =>
  variant === 'none' ? 'none' : `1px solid ${theme.colors.neutral.border}`

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme, $radius }) =>
    (theme.borderRadius as any)?.[$radius || 'large'] || '1rem'};
  padding: ${({ $padding }) => ($padding ? $padding : '0')};
  background: ${({ theme, $backgroundColor, $variant }) =>
    resolveBackground(theme, $variant, $backgroundColor)};
  border: ${({ theme, $variant }) => resolveBorder(theme, $variant)};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: ${({ theme }) =>
      (theme.borderRadius as any)?.medium || '0.7rem'};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`

export type LumenWrapperProps = {
  children: ReactNode
  as?: any
  role?: string
  radius?: LumenRadius
  padding?: string
  backgroundColor?: string
  variant?: LumenVariant
  [key: string]: any
}

const LumenWrapper = forwardRef<any, LumenWrapperProps>(
  (
    {
      children,
      as = 'div',
      radius = 'large',
      padding,
      backgroundColor,
      variant = 'subtle',
      role,
      ...rest
    },
    ref
  ) => (
    <Container
      ref={ref}
      as={as}
      $radius={radius}
      $padding={padding}
      $backgroundColor={backgroundColor}
      $variant={variant}
      role={role}
      {...rest}
    >
      {children}
    </Container>
  )
)

LumenWrapper.displayName = 'LumenWrapper'

export default memo(LumenWrapper)
