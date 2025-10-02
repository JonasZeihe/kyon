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
  padding: 0 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    box-shadow 0.22s ease,
    transform 0.12s ease,
    filter 0.16s ease;
  -webkit-tap-highlight-color: transparent;
`

const Primary = css`
  color: ${({ theme }) => theme.colors.text.inverse};
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
    filter: brightness(0.97);
  }
  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.semantic.focusRing};
  }
`

const Secondary = css`
  color: ${({ theme }) => theme.colors.text.inverse};
  background: ${({ theme }) => theme.gradients.secondary};
  border: none;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
    filter: brightness(0.97);
  }
  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.semantic.focusRing};
  }
`

const Ghost = css`
  color: ${({ theme }) => theme.colors.text.main};
  background: ${({ theme }) => theme.colors.surface.card};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }
  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.semantic.focusRing};
  }
`

const Linkish = css`
  color: ${({ theme }) => theme.colors.link};
  background: transparent;
  border: 1px solid transparent;
  padding: 0 0.25rem;
  min-height: 0;
  height: auto;
  box-shadow: none;
  &:hover {
    color: ${({ theme }) => theme.semantic.linkHover};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
  }
  &:active {
    filter: brightness(0.98);
  }
  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.focusRing};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`

const StyledButton = styled.button<{ $variant: Variant; $bg?: string }>`
  ${base}
  ${({ $variant }) =>
    $variant === 'primary'
      ? Primary
      : $variant === 'secondary'
        ? Secondary
        : $variant === 'ghost'
          ? Ghost
          : Linkish}

  ${({ $bg, theme }) =>
    $bg
      ? css`
          background: ${$bg};
          color: ${theme.colors.text.inverse};
          border: none;
          box-shadow: ${theme.boxShadow.sm};
          &:hover {
            box-shadow: ${theme.boxShadow.md};
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
            filter: brightness(0.97);
          }
          &:focus-visible {
            outline: 2px solid transparent;
            box-shadow: 0 0 0 4px ${theme.semantic.focusRing};
          }
        `
      : null}

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 0.55;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
    filter: grayscale(0.1);
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', customBackground, children, ...rest },
  ref
) {
  return (
    <StyledButton ref={ref} $variant={variant} $bg={customBackground} {...rest}>
      {children}
    </StyledButton>
  )
})

export default Button
