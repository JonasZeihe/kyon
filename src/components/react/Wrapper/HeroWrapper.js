import styled, { css } from 'styled-components'
import LumenWrapper from './LumenWrapper'

const getHeroSpacing = (theme, spacious) =>
  spacious
    ? css`
        margin-top: ${theme.spacing(9)};
        padding: ${theme.spacing(9)} ${theme.spacing(3.5)};
        gap: ${theme.spacing(3)};
      `
    : css`
        margin-top: ${theme.spacing(6)};
        padding: ${theme.spacing(6)} ${theme.spacing(2)};
        gap: ${theme.spacing(2)};
      `

const HeroWrapper = styled(LumenWrapper).attrs(({ variant = 'intense' }) => ({
  variant,
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 24vh;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  ${({ theme, $spacious }) => getHeroSpacing(theme, $spacious)}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 14vh;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    ${({ theme, $spacious }) =>
      $spacious
        ? css`
            margin-top: ${theme.spacing(6)};
            padding: ${theme.spacing(6)} ${theme.spacing(2.2)};
            gap: ${theme.spacing(2)};
          `
        : css`
            margin-top: ${theme.spacing(4)};
            padding: ${theme.spacing(4)} ${theme.spacing(1)};
            gap: ${theme.spacing(1.6)};
          `}
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 7vh;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    ${({ theme, $spacious }) =>
      $spacious
        ? css`
            margin-top: ${theme.spacing(3)};
            padding: ${theme.spacing(3.2)} ${theme.spacing(0.7)};
            gap: ${theme.spacing(1.2)};
          `
        : css`
            margin-top: ${theme.spacing(2)};
            padding: ${theme.spacing(2)} ${theme.spacing(0.5)};
            gap: ${theme.spacing(0.8)};
          `}
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`

export default HeroWrapper
