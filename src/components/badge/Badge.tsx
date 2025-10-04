// src/components/badge/Badge.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

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
  $pill: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
  background: ${({ theme }) => theme.semantic.hover};
  color: ${({ theme }) => theme.semantic.fg};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme, $pill }) =>
    $pill ? theme.borderRadius.pill : theme.borderRadius.medium};
  padding: ${({ theme }) => `${theme.spacing(0.7)} ${theme.spacing(2)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  user-select: none;
  cursor: default;

  &:hover {
    opacity: 0.92;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing(0.6)} ${theme.spacing(1.5)}`};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    gap: ${({ theme }) => theme.spacing(0.5)};
  }
`

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`

export default function Badge({
  label,
  icon,
  pill = true,
  ...rest
}: BadgeProps) {
  return (
    <BadgeContainer
      $pill={pill}
      aria-label={rest['aria-label'] || label}
      {...rest}
    >
      {icon ? <Icon aria-hidden="true">{icon}</Icon> : null}
      <span>{label}</span>
    </BadgeContainer>
  )
}
