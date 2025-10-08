// src/components/button/ThemeToggleButton.tsx
'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import styled, { css } from 'styled-components'
import { useThemeContext } from '@/components/context/ThemeContext'

type BtnProps = { $isDarkMode: boolean }

const ToggleButton = styled.button<BtnProps>`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5ch;
  min-height: 40px;
  min-width: 44px;
  padding: ${({ theme }) => `${theme.spacing(0.6)} ${theme.spacing(1.4)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font: inherit;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.fg};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    background 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    transform 0.08s ease;

  &:hover {
    background: ${({ theme }) => theme.semantic.hover};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.focusRing};
  }

  ${({ $isDarkMode, theme }) =>
    $isDarkMode
      ? css`
          background: ${theme.semantic.card};
          border-color: ${theme.semantic.border};
        `
      : null}
`

const Label = styled.span`
  font-size: 0.95rem;
  line-height: 1;
`

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext()
  const isDark = mode === 'dark'
  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={
        isDark ? 'Helle Ansicht aktivieren' : 'Dunkle Ansicht aktivieren'
      }
      title={isDark ? 'Helle Ansicht' : 'Dunkle Ansicht'}
      aria-pressed={isDark}
      $isDarkMode={isDark}
      type="button"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
      <Label aria-hidden="true">{isDark ? 'Light' : 'Dark'}</Label>
    </ToggleButton>
  )
}
