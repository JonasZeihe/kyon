const HEX_REGEX = /#(?:[\da-f]{3}){1,2}/gi

export type GradientSet = Record<string, string | string[]> & {
  meshPalette: string[]
}

const createLinear = (from: string, to: string, angle = 135) =>
  `linear-gradient(${angle}deg, ${from}, ${to})`

const luminance = (hex: string) => {
  const norm = hex.replace('#', '').padEnd(6, hex.slice(1))
  const val = (i: number) => parseInt(norm.slice(i, i + 2), 16) / 255
  const lin = (x: number) =>
    x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(val(0)) + 0.7152 * lin(val(2)) + 0.0722 * lin(val(4))
}

const contrastRatio = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

type Colors = Record<string, Record<string, string> & { main?: string }>

const pickColor = (
  group: string,
  colors: Colors,
  target = 'main',
  mode: 'light' | 'dark' = 'light'
) => {
  const base = colors[group] || {}
  const baseColor =
    (base as any)[target] || base.main || Object.values(base)[0] || '#ccc'
  if (mode === 'dark' && contrastRatio(baseColor, '#fff') < 2) {
    const keys = ['0', '1', '2', 'main', '4', '5', '6']
    const fallback = keys.find(
      (k) => (base as any)[k] && contrastRatio((base as any)[k], '#fff') >= 2
    )
    return fallback ? (base as any)[fallback] : baseColor
  }
  return baseColor
}

const extractHex = (gradient: string) => gradient.match(HEX_REGEX) || []

let lastColors: Colors | null = null
let lastResult: GradientSet | null = null

const gradients = ({ colors }: { colors: Colors }): GradientSet => {
  if (lastColors === colors && lastResult) return lastResult

  const mode: 'light' | 'dark' =
    luminance(colors?.text?.main || '#000') < 0.5 ? 'dark' : 'light'

  const g: GradientSet = {
    pageBackground: createLinear(
      pickColor('surface', colors, '1', mode),
      pickColor('surface', colors, '2', mode),
      133
    ),
    backgroundPrimary: createLinear(
      pickColor('primary', colors, '1', mode),
      pickColor('primary', colors, '4', mode),
      120
    ),
    backgroundSecondary: createLinear(
      pickColor('secondary', colors, '1', mode),
      pickColor('secondary', colors, '3', mode),
      133
    ),
    backgroundAccent: createLinear(
      pickColor('accent', colors, '1', mode),
      pickColor('accent', colors, '3', mode),
      123
    ),
    backgroundDepth: createLinear(
      pickColor('depth', colors, '1', mode),
      pickColor('depth', colors, '3', mode),
      180
    ),
    backgroundSurface: createLinear(
      pickColor('surface', colors, '1', mode),
      pickColor('surface', colors, '3', mode),
      180
    ),
    buttonPrimary: createLinear(
      pickColor('primary', colors, '2', mode),
      pickColor('primary', colors, '3', mode),
      115
    ),
    buttonSecondary: createLinear(
      pickColor('secondary', colors, '2', mode),
      pickColor('secondary', colors, '3', mode),
      117
    ),
    buttonAccent: createLinear(
      pickColor('accent', colors, '2', mode),
      pickColor('accent', colors, '3', mode),
      119
    ),
    focus: createLinear(
      pickColor('highlight', colors, '3', mode),
      pickColor('accent', colors, '3', mode),
      88
    ),
    danger: createLinear(
      pickColor('accent', colors, '5', mode),
      pickColor('accent', colors, '3', mode),
      111
    ),
    info: createLinear(
      pickColor('secondary', colors, '3', mode),
      pickColor('secondary', colors, '2', mode),
      120
    ),
    hero: createLinear(
      pickColor('primary', colors, '1', mode),
      pickColor('secondary', colors, '1', mode),
      127
    ),
    highlightSoft: createLinear(
      pickColor('highlight', colors, '1', mode),
      pickColor('neutral', colors, 'grey', mode),
      93
    ),
    dividerSoft: createLinear(
      pickColor('neutral', colors, 'light', mode),
      pickColor('neutral', colors, 'grey', mode),
      90
    ),
    dividerHard: createLinear(
      pickColor('neutral', colors, 'dark', mode),
      pickColor('neutral', colors, 'black', mode),
      90
    ),
    meshPalette: [],
  }

  const meshSource = [
    ...extractHex(g.backgroundPrimary as string),
    ...extractHex(g.backgroundAccent as string),
    ...extractHex(g.hero as string),
  ]

  const meshBase = meshSource.length
    ? meshSource.slice(0, 8)
    : ['#9999ff', '#ff99cc', '#99e6ff']

  g.meshPalette = meshBase.map((hex) => {
    const l = luminance(hex)
    if (l <= 0.55) return hex
    const clean = hex.replace('#', '').padEnd(6, hex.slice(1))
    const rgb = [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16))
    const darkened = rgb
      .map((v) => Math.max(0, Math.round(v * 0.75)))
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
    return `#${darkened}`
  })

  lastColors = colors
  lastResult = g
  return g
}

export default gradients
