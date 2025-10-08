// src/components/button/Button.tsx
'use client'

import styled, { css } from 'styled-components'
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  as?: any
  href?: string
  customBackground?: string
}

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5ch;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.06s ease;
  border: 1px solid transparent;

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.focusRing};
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 0.55;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

const primary = css`
  background: ${({ theme }) => theme.gradients.primary};
  color: #ffffff;
  border-color: transparent;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-0.5px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`

const secondary = css`
  background: ${({ theme }) => theme.gradients.secondary};
  color: #ffffff;
  border-color: transparent;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-0.5px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`

const ghost = css`
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.fg};
  border-color: ${({ theme }) => theme.semantic.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  &:hover {
    background: ${({ theme }) => theme.semantic.hover};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
    transform: translateY(-0.5px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
  }
`

const linkish = css`
  background: transparent;
  color: ${({ theme }) => theme.semantic.link};
  border-color: transparent;
  padding: 0 ${({ theme }) => theme.spacingHalf(1)};
  min-height: 0;
  height: auto;
  box-shadow: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
  }

  &:active {
    transform: translateY(0);
  }
`

const StyledButton = styled.button<{ $variant: Variant; $customBg?: string }>`
  ${base};
  ${({ $variant }) =>
    $variant === 'primary'
      ? primary
      : $variant === 'secondary'
        ? secondary
        : $variant === 'ghost'
          ? ghost
          : linkish}

  ${({ $customBg }) =>
    $customBg &&
    css`
      background: ${$customBg};
      color: #ffffff;
      border-color: transparent;
    `}
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', customBackground, children, ...rest },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $customBg={customBackground}
      {...rest}
    >
      {children}
    </StyledButton>
  )
})

export default Button
