import styled, { css } from 'styled-components'

const TAG_MAP = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subhead: 'h4',
  body: 'p',
  caption: 'span',
}

const variantCSS = (v, t, gutter) => {
  const {
    typography: { fontSize, fontWeight, lineHeight, letterSpacing },
    spacing,
    colors: {
      text: { main, subtle },
    },
  } = t
  const s = spacing
  switch (v) {
    case 'h1':
      return css`
        font-size: ${fontSize.h1};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tight};
        color: ${main};
        margin-bottom: ${gutter ? s(5) : 0};
      `
    case 'h2':
      return css`
        font-size: ${fontSize.h2};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tight};
        color: ${main};
        margin-bottom: ${gutter ? s(4) : 0};
      `
    case 'h3':
      return css`
        font-size: ${fontSize.h3};
        font-weight: ${fontWeight.medium};
        line-height: ${lineHeight.normal};
        letter-spacing: ${letterSpacing.normal};
        color: ${main};
        margin-bottom: ${gutter ? s(3) : 0};
      `
    case 'subhead':
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.medium};
        line-height: ${lineHeight.normal};
        color: ${main};
        margin-bottom: ${gutter ? s(2) : 0};
      `
    case 'caption':
      return css`
        font-size: ${fontSize.small};
        font-weight: ${fontWeight.light};
        line-height: ${lineHeight.tight};
        color: ${subtle};
        margin-bottom: ${gutter ? s(1) : 0};
      `
    default:
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.regular};
        line-height: ${lineHeight.normal};
        color: ${main};
        margin-bottom: ${gutter ? s(2) : 0};
      `
  }
}

const getThemeColor = (color, theme) => {
  if (!color) return null
  if (/^(#|rgb|hsl|var\(--)/.test(color)) return color
  const [group, tone] = color.split('.')
  const g = theme.colors[group] || {}
  if (tone) return g[tone] ?? theme.colors.text?.[tone] ?? null
  return g.base ?? g.main ?? null
}

const StyledTypography = styled.span`
  margin: 0;
  padding: 0;
  text-align: ${({ align }) => align};
  ${({ variant, theme, gutter }) => variantCSS(variant, theme, gutter)}
  ${({ color, theme }) => {
    const themeColor = getThemeColor(color, theme)
    return themeColor
      ? css`
          color: ${themeColor};
        `
      : ''
  }}
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize};
    `}
`

function Typography({
  variant = 'body',
  color,
  align = 'left',
  children,
  as: asTagProp,
  gutter = true,
  fontSize,
  ...rest
}) {
  const asTag = asTagProp || TAG_MAP[variant] || 'p'
  return (
    <StyledTypography
      as={asTag}
      variant={variant}
      color={color}
      align={align}
      gutter={gutter}
      fontSize={fontSize}
      {...rest}
    >
      {children}
    </StyledTypography>
  )
}

export default Typography
