// --- src/components/Wrapper/LumenWrapper.tsx ---
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

const resolvePadding = ({ $padding }: ContainerProps) =>
  $padding || 'clamp(1rem, 2.2vw, 1.6rem) clamp(1rem, 2.5vw, 1.6rem)'

const surfaceForVariant = (variant?: LumenVariant) => {
  switch (variant) {
    case 'none':
      return 'none'
    case 'intense':
      return 'intense'
    case 'subtle':
    default:
      return 'subtle'
  }
}

const Container = styled.div<ContainerProps>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme, $radius }) =>
    (theme.borderRadius as any)?.[$radius || 'large'] || '1rem'};
  padding: ${resolvePadding};
  background: ${({ theme, $backgroundColor, $variant }) => {
    if ($backgroundColor) return $backgroundColor
    const mode = surfaceForVariant($variant)
    if (mode === 'none') return theme.colors.neutral.background
    return theme.colors.surface.card
  }};
  border: ${({ theme, $variant }) =>
    surfaceForVariant($variant) === 'none'
      ? 'none'
      : `1px solid ${theme.colors.neutral.border}`};
  box-shadow: ${({ theme, $variant }) => {
    const mode = surfaceForVariant($variant)
    if (mode === 'none') return 'none'
    if (mode === 'intense') return theme.boxShadow.md
    return theme.boxShadow.xs
  }};
  will-change: transform, background, box-shadow;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.1s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: clamp(0.9rem, 2.2vw, 1.3rem);
    border-radius: ${({ theme }) =>
      (theme.borderRadius as any)?.medium || '0.7rem'};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: clamp(0.8rem, 2vw, 1rem);
    max-width: 100%;
  }
`

type LumenWrapperProps = {
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
