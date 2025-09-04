import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledHighlightText = styled.span`
  color: ${({ theme, color }) => color || theme.colors.accent.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

function HighlightText({ children, color }) {
  return <StyledHighlightText color={color}>{children}</StyledHighlightText>
}

HighlightText.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HighlightText
