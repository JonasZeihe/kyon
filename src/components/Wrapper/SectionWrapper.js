import styled, { css } from 'styled-components'
import LumenWrapper from './LumenWrapper'

const getVerticalSpacing = (theme, spacious) =>
  spacious
    ? css`
        padding-top: ${theme.spacing(6)};
        padding-bottom: ${theme.spacing(6)};
        margin-top: ${theme.spacing(8)};
        margin-bottom: ${theme.spacing(8)};
      `
    : css`
        padding-top: ${theme.spacing(2)};
        padding-bottom: ${theme.spacing(2)};
        margin-top: ${theme.spacing(3)};
        margin-bottom: ${theme.spacing(3)};
      `

const SectionWrapper = styled(LumenWrapper).attrs({
  variant: 'subtle',
})`
  width: 100%;
  max-width: clamp(26rem, 92vw, 72rem);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme, $spacious }) => getVerticalSpacing(theme, $spacious)}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(1.2)};
    ${({ theme, $spacious }) =>
      $spacious
        ? css`
            padding-top: ${theme.spacing(3)};
            padding-bottom: ${theme.spacing(3)};
            margin-top: ${theme.spacing(4)};
            margin-bottom: ${theme.spacing(4)};
          `
        : css`
            padding-top: ${theme.spacing(1)};
            padding-bottom: ${theme.spacing(1)};
            margin-top: ${theme.spacing(2)};
            margin-bottom: ${theme.spacing(2)};
          `}
  }
`
export default SectionWrapper
