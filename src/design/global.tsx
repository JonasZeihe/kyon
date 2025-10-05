// src/design/global.tsx
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #__next {
    width: 100%;
    min-height: 100vh;
    min-width: 0;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    color-scheme: ${({ theme }) => theme.mode || 'light'};
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.semantic.fg};
    background: ${({ theme }) => theme.semantic.bg};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #__next {
    isolation: isolate;
    min-height: 100vh;
    background: ${({ theme }) => theme.semantic.bg};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    max-width: 100%;
  }

  button, input, select, textarea {
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.semantic.border};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.semantic.focusRing};
    outline-offset: 2px;
  }

  code, kbd, samp, pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
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
