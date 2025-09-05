// src/components/context/ReactRoot.jsx
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../../styles/GlobalStyles'
import { lightTheme, darkTheme } from '../../styles/theme'
import themeToCssVars from '../../styles/themeToCssVars'

export default ({ children }) => {
  const mode =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('kyonTheme') || '{}').mode || 'dark'
      : 'dark'

  const theme = mode === 'dark' ? darkTheme : lightTheme

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.mode = mode
    document.documentElement.style.cssText += themeToCssVars(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
