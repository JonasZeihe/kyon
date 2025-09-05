// src/styles/themeToCssVars.js
export default (theme) =>
  Object.entries({
    '--c-bg': theme.colors.neutral.background,
    '--c-surface': theme.colors.neutral.surface,
    '--c-border': theme.colors.neutral.border,
    '--c-text': theme.text.main,
    '--c-text-subtle': theme.text.subtle,
    '--c-inverse': theme.colors.neutral.inverse,
    '--c-primary': theme.primary.base,
    '--c-primary-contrast': theme.primary.contrast,
    '--c-accent': theme.accent.base,
    '--c-accent-contrast': theme.accent.contrast,
    '--c-highlight': theme.highlight.base,
  }).reduce((css, [k, v]) => (v ? `${css}${k}:${v};` : css), '')
