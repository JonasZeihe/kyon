// src/components/badge/Badge.tsx
'use client'

import React from 'react'
import styled, { useTheme } from 'styled-components'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  label: string
  icon?: React.ReactNode
  bg?: string
  bgLight?: string
  bgDark?: string
  textColor?: string
  textColorLight?: string
  textColorDark?: string
  pill?: boolean
}

const BadgeContainer = styled.span<{
  $bg: string
  $pill: boolean
  $color: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-radius: ${({ theme, $pill }) =>
    $pill ? theme.borderRadius.pill : theme.borderRadius.medium};
  padding: ${({ theme }) => `${theme.spacing(0.7)} ${theme.spacing(2)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition: opacity 0.2s ease-out;
  user-select: none;
  cursor: default;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing(0.6)} ${theme.spacing(1.5)}`};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    gap: ${({ theme }) => theme.spacing(0.5)};
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  line-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`

export default function Badge({
  label,
  icon,
  bg,
  bgLight,
  bgDark,
  textColor,
  textColorLight,
  textColorDark,
  pill = true,
  ...rest
}: BadgeProps) {
  const theme = useTheme()
  const isDark = theme.mode === 'dark'

  const resolvedBg =
    bg ??
    (isDark
      ? (bgDark ?? theme.colors.accent?.border ?? '#5b4bb7')
      : (bgLight ?? theme.colors.accent?.surface ?? '#f3e9ff'))

  const resolvedColor =
    textColor ??
    (isDark
      ? (textColorDark ?? theme.colors.text?.inverse ?? '#ffffff')
      : (textColorLight ?? theme.colors.text?.main ?? '#16171D'))

  return (
    <BadgeContainer
      $bg={resolvedBg}
      $pill={pill}
      $color={resolvedColor}
      {...rest}
    >
      {icon ? <IconWrapper aria-hidden="true">{icon}</IconWrapper> : null}
      <span>{label}</span>
    </BadgeContainer>
  )
}
