// src/components/button/ThemeToggleButton.tsx
'use client'
import { FiSun, FiMoon } from 'react-icons/fi'
import styled from 'styled-components'
import { useThemeContext } from '@/components/context/ThemeContext'

type BtnProps = { $isDarkMode: boolean }

const ToggleButton = styled.button<BtnProps>`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.fg};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => `${theme.spacing(0.6)} ${theme.spacing(1.6)}`};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  font-size: 1.05rem;
  transition:
    background 0.23s cubic-bezier(0.48, 0.24, 0.56, 1),
    color 0.19s,
    box-shadow 0.23s,
    border-color 0.23s;

  &:hover {
    background: ${({ theme }) => theme.semantic.hover};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.focusRing};
  }
`

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext()
  const isDark = mode === 'dark'
  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Helle Ansicht' : 'Dunkle Ansicht'}
      $isDarkMode={isDark}
    >
      {isDark ? <FiSun size={19} /> : <FiMoon size={18} />}
    </ToggleButton>
  )
}
