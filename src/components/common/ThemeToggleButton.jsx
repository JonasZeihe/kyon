// src/components/common/ThemeToggleButton.jsx
import React from 'react'
import { styled } from 'styled-components'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useThemeContext } from '../context/ThemeContext'

export default () => {
  const { mode, toggleTheme } = useThemeContext()

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={
        mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      }
      $isDarkMode={mode === 'dark'}
      title={mode === 'dark' ? 'Helle Ansicht' : 'Dunkle Ansicht'}
    >
      {mode === 'dark' ? <FiSun size={19} /> : <FiMoon size={18} />}
    </ToggleButton>
  )
}

const ToggleButton = styled.button`
  background: ${({ theme, $isDarkMode }) =>
    $isDarkMode ? theme.colors.surface[2] : theme.colors.surface[1]};
  color: ${({ theme, $isDarkMode }) =>
    $isDarkMode ? theme.colors.primary[1] : theme.colors.primary[5]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => `${theme.spacing(0.6)} ${theme.spacing(1.6)}`};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  font-size: 1.05rem;
  transition:
    background 0.23s cubic-bezier(0.48, 0.24, 0.56, 1),
    color 0.19s,
    box-shadow 0.23s;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primary.base};
    color: ${({ theme }) => theme.colors.text.inverse};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    outline: none;
  }
`
