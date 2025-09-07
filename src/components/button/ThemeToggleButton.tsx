// src/components/badge/Badge.tsx
'use client'

import React from 'react'
import styled, { useTheme } from 'styled-components'
import * as Icons from 'react-icons/fa'

type IconKey = keyof typeof Icons

type BadgeProps = {
  label?: string
  icon?: IconKey | React.ReactElement
  background?: string
  colorLight?: string
  colorDark?: string
  className?: string
  children?: React.ReactNode
}

const BadgeContainer = styled.span<{ $background: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
  background-color: ${({ $background }) => $background};
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
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
  background,
  colorLight,
  colorDark,
  className,
  children,
}: BadgeProps) {
  const theme = useTheme()
  const isDark = theme.mode === 'dark'

  const fallbackBg = isDark
    ? theme.colors.primary[3] || theme.colors.primary.base
    : theme.colors.primary.base

  const resolvedBackground =
    background || (isDark ? colorDark : colorLight) || fallbackBg

  let IconComp: React.ComponentType | null = null
  if (typeof icon === 'string' && Icons[icon as IconKey]) {
    IconComp = Icons[icon as IconKey] as unknown as React.ComponentType
  } else if (React.isValidElement(icon)) {
    const Node = () => icon as React.ReactElement
    IconComp = Node
  }

  const text =
    label ?? (typeof children === 'string' ? (children as string) : '')

  if (!text) return null

  return (
    <BadgeContainer
      className={className}
      $background={resolvedBackground}
      aria-label={text}
    >
      {IconComp && (
        <IconWrapper aria-hidden="true">
          <IconComp />
        </IconWrapper>
      )}
      <span>{text}</span>
    </BadgeContainer>
  )
}

export type { BadgeProps }
