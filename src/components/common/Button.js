import React from 'react'
import styled, { css } from 'styled-components'

const baseStyles = (theme) => ({
  primary: {
    background: theme.colors.primary.base,
    border: 'none',
    hover: theme.colors.primary.hover,
    active: theme.colors.primary.active,
    color: '#fff',
    shadow: theme.boxShadow.sm,
  },
  github: {
    background: '#24292e',
    border: 'none',
    hover: '#2f363d',
    active: '#1b1f23',
    color: '#fff',
    shadow: theme.boxShadow.sm,
  },
  casestudy: {
    background: theme.colors.secondary.base,
    border: 'none',
    hover: theme.colors.secondary.hover,
    active: theme.colors.secondary.active,
    color: '#fff',
    shadow: theme.boxShadow.sm,
  },
  prototype: {
    background: theme.colors.accent.base,
    border: 'none',
    hover: theme.colors.accent.hover,
    active: theme.colors.accent.active,
    color: '#fff',
    shadow: theme.boxShadow.sm,
  },
  success: {
    background: theme.colors.highlight.base,
    border: 'none',
    hover: theme.colors.highlight.hover,
    active: theme.colors.highlight.active,
    color: '#fff',
    shadow: theme.boxShadow.sm,
  },
})

const StyledButton = styled.button`
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  padding: ${({ theme }) => `${theme.spacing(1.15)} ${theme.spacing(2.5)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  cursor: pointer;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  border: none;
  outline: none;
  transition:
    background 0.19s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.14s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.16s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ variant, theme, customBackground, disabled }) => {
    const base = baseStyles(theme)[variant] || baseStyles(theme).primary
    const bg = customBackground || base.background
    const { border, hover, active, color, shadow } = base

    return css`
      background: ${bg};
      color: ${color};
      border: ${border};
      box-shadow: ${shadow};

      &:hover,
      &:focus-visible {
        background: ${hover};
        color: ${color};
        transform: translateY(-1.5px) scale(1.018);
        box-shadow: 0 2px 14px 0 rgba(32, 46, 99, 0.13);
        outline: none;
        z-index: 2;
      }

      &:active {
        background: ${active};
        color: ${color};
        transform: scale(0.978);
        box-shadow: 0 1px 5px rgba(20, 24, 44, 0.12) inset;
        filter: brightness(0.97);
      }

      ${disabled &&
      css`
        opacity: 0.46;
        cursor: not-allowed;
        pointer-events: none;
        filter: grayscale(0.37) brightness(0.97);
        box-shadow: none;
      `}
    `
  }}

  &:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    min-width: unset;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2.1)}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  @media (pointer: coarse) {
    &:hover,
    &:focus-visible {
      filter: brightness(1.02);
      background: ${({ variant, theme, customBackground }) => {
        const base = baseStyles(theme)[variant] || baseStyles(theme).primary
        return customBackground || base.background
      }};
      box-shadow: none;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`

export default function Button({
  variant = 'primary',
  customBackground,
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <StyledButton
      variant={variant}
      customBackground={customBackground}
      onClick={onClick}
      disabled={disabled}
      type="button"
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}
