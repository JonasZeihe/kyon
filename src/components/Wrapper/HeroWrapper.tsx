// src/components/Wrapper/HeroWrapper.tsx
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
  $padding || 'clamp(1.2rem, 2.5vw, 2rem) clamp(1.2rem, 3vw, 2rem)'

const Container = styled.section<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme, $radius }) =>
    (theme.borderRadius as any)?.[$radius || 'large'] || '1rem'};
  padding: ${resolvePadding};
  background: ${({ theme, $backgroundColor, $variant }) => {
    if ($backgroundColor) return $backgroundColor
    if ($variant === 'intense') return theme.gradients.primary
    if ($variant === 'none') return theme.colors.neutral.background
    return theme.colors.surface.card
  }};
  color: ${({ theme, $variant }) =>
    $variant === 'intense'
      ? theme.colors.text.inverse
      : theme.colors.text.main};
  border: ${({ theme, $variant }) =>
    $variant === 'none' ? 'none' : `1px solid ${theme.colors.neutral.border}`};
  box-shadow: ${({ theme, $variant }) =>
    $variant === 'intense' ? theme.boxShadow.lg : theme.boxShadow.sm};
  will-change: background, box-shadow;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: clamp(1rem, 2.4vw, 1.6rem);
    border-radius: ${({ theme }) =>
      (theme.borderRadius as any)?.medium || '0.7rem'};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: clamp(0.9rem, 2vw, 1.2rem);
  }
`

type HeroWrapperProps = {
  children: ReactNode
  as?: any
  role?: string
  radius?: LumenRadius
  padding?: string
  backgroundColor?: string
  variant?: LumenVariant
  [key: string]: any
}

const HeroWrapper = forwardRef<any, HeroWrapperProps>(
  (
    {
      children,
      as = 'section',
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

HeroWrapper.displayName = 'HeroWrapper'

export default memo(HeroWrapper)
