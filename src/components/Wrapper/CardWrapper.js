import styled from 'styled-components'
import LumenWrapper from './LumenWrapper'

const CardWrapper = styled(LumenWrapper).attrs({
  variant: 'subtle',
})`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  width: 100%;
  z-index: 2;
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-2px) scale(1.005);
    filter: brightness(${({ theme }) => (theme.mode === 'dark' ? 1.05 : 1.02)});
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
    z-index: 4;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 98vw;
    margin: ${({ theme }) => theme.spacing(1)} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100vw;
    margin: 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};

    &:hover,
    &:focus-within {
      transform: scale(1.002);
      filter: brightness(1.01);
      box-shadow: none;
    }
  }
`

export default CardWrapper
