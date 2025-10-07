// src/components/pagekit/recipes/GridRecipe.tsx
import type { ReactNode } from 'react'
import Section from '@/components/primitives/Section'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

type Props<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  min?: string
  columns?: number | 'auto'
  gap?: number | string
  title?: ReactNode
  subtitle?: ReactNode
  padY?: boolean
  wide?: boolean
}

const isPrimitive = (n: ReactNode): n is string | number =>
  typeof n === 'string' || typeof n === 'number'

export default function GridRecipe<T>({
  items,
  renderItem,
  min,
  columns,
  gap,
  title,
  subtitle,
  padY = true,
  wide = false,
}: Props<T>) {
  const resolvedMin = min ?? '18rem'
  const resolvedColumns = columns ?? 'auto'
  const resolvedGap = gap ?? 2

  const children = items.map((it, i) => renderItem(it, i))

  return (
    <Section container={wide ? 'wide' : 'default'} padY={padY}>
      {(title || subtitle) && (
        <Stack gap={0.75}>
          {title ? (
            isPrimitive(title) ? (
              <Typography as="h2" variant="h2">
                {title}
              </Typography>
            ) : (
              title
            )
          ) : null}
          {subtitle ? (
            isPrimitive(subtitle) ? (
              <Typography as="p" variant="body" color="mutedFg">
                {subtitle}
              </Typography>
            ) : (
              subtitle
            )
          ) : null}
        </Stack>
      )}
      <Grid
        columns={resolvedColumns}
        min={resolvedMin}
        gap={resolvedGap}
        switchAt="md"
      >
        {children}
      </Grid>
    </Section>
  )
}
