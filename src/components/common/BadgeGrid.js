import styled from 'styled-components'
import Badge from './Badge'

const StyledBadgeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ align }) => align};
  gap: ${({ theme, gapSize }) => theme.spacing(gapSize)};
  margin: ${({ theme, marginSize }) => theme.spacing(marginSize)} 0;
`

export default function BadgeGrid({
  badges = [],
  align = 'center',
  gapSize = 2,
  marginSize = 1,
}) {
  return badges.length ? (
    <StyledBadgeGrid align={align} gapSize={gapSize} marginSize={marginSize}>
      {badges.map((badgeKey) => (
        <Badge key={badgeKey} badgeKey={badgeKey} />
      ))}
    </StyledBadgeGrid>
  ) : null
}
