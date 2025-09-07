import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  html,body,#__next{width:100%;min-height:100vh;min-width:0;overflow-x:hidden}

  html{
    font-size:16px;
    scroll-behavior:smooth;
    color-scheme:${({ theme }) => theme.mode || 'light'};
  }

  body{
    font-family:${({ theme }) => theme.typography.fontFamily.primary};
    font-size:${({ theme }) => theme.typography.fontSize.body};
    line-height:${({ theme }) => theme.typography.lineHeight.normal};
    color:${({ theme }) => theme.colors.text.main};
    background:transparent;
    min-height:100vh;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    transition:color .23s cubic-bezier(.34,.54,.51,1),background-color .36s cubic-bezier(.38,.54,.51,1);
  }

  #__next{isolation:isolate;min-height:100vh;background:transparent}

  button,input,select,textarea{
    font-family:${({ theme }) => theme.typography.fontFamily.button};
    font-size:${({ theme }) => theme.typography.fontSize.body};
    color:inherit;
    background:none;
    border:none;
    outline:none;
    transition:color .22s;
  }

  button{
    cursor:pointer;
    border-radius:${({ theme }) => theme.borderRadius.medium};
    box-shadow:${({ theme }) => theme.boxShadow.xs};
    transition:box-shadow .19s, filter .19s;
    -webkit-tap-highlight-color: transparent;
  }
  button:focus-visible{
    outline:2.5px solid ${({ theme }) => theme.colors.accent.main};
    outline-offset:2px;
    box-shadow:0 0 0 4px ${({ theme }) => theme.colors.accent['1']}44;
  }
  button:hover{
    box-shadow:${({ theme }) => theme.boxShadow.md};
    filter:brightness(1.05);
  }
  button:active{filter:brightness(.95)}

  input:focus-visible,textarea:focus-visible,select:focus-visible{
    outline:2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset:2px;
    box-shadow:0 0 0 3px ${({ theme }) => theme.colors.primary['1']}55;
  }

  a{
    color:${({ theme }) => theme.colors.primary.main};
    text-decoration:none;
    transition:color .19s;
  }
  a:hover,a:focus-visible{
    color:${({ theme }) => theme.colors.accent.main};
    text-decoration:underline;
  }

  img,svg{max-width:100%;display:block;user-select:none}

  ul,ol{list-style:none;padding-left:0}

  @media (prefers-reduced-motion: reduce){
    *,*::before,*::after{animation-duration:0.001ms !important;animation-iteration-count:1 !important;transition-duration:0.001ms !important;scroll-behavior:auto !important}
  }
`

export default GlobalStyles
