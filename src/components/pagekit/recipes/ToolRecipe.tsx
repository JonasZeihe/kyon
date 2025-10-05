// src/components/pagekit/recipes/ToolRecipe.tsx
'use client'

import { ReactNode } from 'react'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import ListComponent from '@/components/data-display/ListComponent'
import { AccentKey } from '@/design/theme'

type Item = {
  id?: string | number
  icon?: ReactNode
  text?: ReactNode
}

type Props = {
  title?: ReactNode
  items: Item[]
  align?: 'left' | 'center' | 'right'
  surface?: 'subtle' | 'intense' | 'none'
  accent?: AccentKey | 'neutral'
}

const mapTone = (v: Props['surface']): 'neutral' | 'elevated' | 'accent' => {
  if (v === 'intense') return 'accent'
  if (v === 'none') return 'neutral'
  return 'neutral'
}

export default function ToolRecipe({
  title,
  items,
  align = 'center',
  surface = 'subtle',
  accent = 'neutral',
}: Props) {
  const tone = mapTone(surface)
  return (
    <Surface
      as="section"
      tone={tone}
      accent={accent}
      radius="large"
      bordered
      padding="clamp(0.8rem,1.8vw,1.2rem)"
    >
      <Stack gap={1}>
        {title ? (
          typeof title === 'string' ? (
            <Typography as="h3" variant="h3" align="center">
              {title}
            </Typography>
          ) : (
            title
          )
        ) : null}
        <ListComponent items={items} mode="cards" align={align} />
      </Stack>
    </Surface>
  )
}
