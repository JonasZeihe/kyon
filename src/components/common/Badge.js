import React from 'react'
import styled, { useTheme } from 'styled-components'
import * as Icons from 'react-icons/fa'
import BadgeLibrary from './BadgeLibrary'

const BadgeContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
  background-color: ${({ background }) => background};
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

export default function Badge({ badgeKey, ...props }) {
  const theme = useTheme()
  const badge = BadgeLibrary[badgeKey]
  if (!badge) return null

  const { label, icon, colorLight, colorDark } = badge
  const Icon = Icons[icon] || null
  const isDarkMode = theme.mode === 'dark'
  const background = isDarkMode ? colorDark : colorLight

  return (
    <BadgeContainer background={background} aria-label={label} {...props}>
      {Icon && (
        <IconWrapper aria-hidden="true">
          <Icon />
        </IconWrapper>
      )}
      <span>{label}</span>
    </BadgeContainer>
  )
}
