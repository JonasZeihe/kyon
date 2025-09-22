// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --header-height: 74px;
    --article-scroll-margin: 88px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #__next {
    width: 100%;
    min-height: 100vh;
    min-width: 0;
    overflow-x: hidden;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    color-scheme: ${({ theme }) => theme.mode || 'light'};
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.main};
    background: ${({ theme }) => theme.colors.neutral.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: color 0.25s ease, background-color 0.35s ease;
  }

  #__next {
    isolation: isolate;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.neutral.background};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary[2]};
    color: ${({ theme }) => theme.colors.text.inverse};
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      `${theme.colors.surface[4]} ${theme.colors.surface[1]}`};
  }
  *::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface[1]};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surface[4]};
    border: 3px solid ${({ theme }) => theme.colors.surface[1]};
    border-radius: 999px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.surface[5]};
  }

  button, input, select, textarea {
    font-family: ${({ theme }) => theme.typography.fontFamily.button};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    color: inherit;
    background: none;
    border: none;
    outline: none;
    transition: color 0.22s, background 0.22s, box-shadow 0.22s, filter 0.22s;
  }

  button {
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    -webkit-tap-highlight-color: transparent;
  }
  button:focus-visible {
    outline: 2.5px solid ${({ theme }) => theme.colors.accent.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accent[2]}55;
  }
  button:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    filter: brightness(1.05);
  }
  button:active {
    filter: brightness(0.95);
  }

  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[2]}55;
    background: ${({ theme }) => theme.colors.surface[0]};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color 0.18s ease, text-decoration-color 0.18s ease;
  }
  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    text-decoration: underline;
  }
  a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent[2]}55;
  }

  img, svg {
    max-width: 100%;
    display: block;
    user-select: none;
  }

  code, kbd, samp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`

export default GlobalStyles
