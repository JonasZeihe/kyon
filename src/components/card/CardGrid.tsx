import styled from 'styled-components'

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding: ${({ theme }) => theme.spacing(1)};
  margin: 0 auto;
  max-width: 1200px;
  align-items: start;

  & > *:only-child {
    max-width: 40rem;
    justify-self: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: ${({ theme }) => theme.spacing(2)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: 0;
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export default CardGrid
