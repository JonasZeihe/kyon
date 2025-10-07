// src/components/primitives/Card.tsx
'use client'

import { forwardRef, ReactNode } from 'react'
import styled from 'styled-components'
import Surface from './Surface'
import { AccentKey } from '@/design/theme'

type Props = {
  padding?: string
  hover?: boolean
  interactive?: boolean
  tone?: 'neutral' | 'elevated' | 'accent'
  accent?: AccentKey | 'neutral'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'pill'
  bordered?: boolean
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'color'>

const StyledCard = styled(Surface)<{ $hover: boolean; $interactive: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};

  &:hover,
  &:focus-within {
    transform: ${({ $hover, theme }) =>
      $hover ? `translateY(-${theme.spacingHalf(1)})` : 'none'};
    box-shadow: ${({ theme, $hover }) =>
      $hover ? theme.boxShadow.md : 'none'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &:hover,
    &:focus-within {
      transform: none;
      box-shadow: ${({ theme, $hover }) =>
        $hover ? theme.boxShadow.xs : 'none'};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    padding = 'clamp(0.75rem, 2vw, 1rem)',
    hover = true,
    interactive = false,
    tone = 'neutral',
    accent = 'neutral',
    radius = 'large',
    bordered = true,
    children,
    ...rest
  },
  ref
) {
  return (
    <StyledCard
      ref={ref}
      padding={padding}
      tone={tone}
      accent={accent}
      radius={radius}
      bordered={bordered}
      $hover={hover}
      $interactive={interactive}
      {...rest}
    >
      {children}
    </StyledCard>
  )
})

export default Card
