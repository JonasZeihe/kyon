// src/components/pagekit/recipes/GridRecipe.tsx
import { ReactNode } from 'react'
import AutoGrid from '@/components/Wrapper/AutoGrid'
import BentoSection from '@/components/Wrapper/BentoSection'

type GridRecipeProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  min?: string
  columns?: number | 'auto'
  gap?: number
  asBento?: boolean
  title?: ReactNode
  subtitle?: ReactNode
  padY?: boolean
  wide?: boolean
}

export default function GridRecipe<T>({
  items,
  renderItem,
  min = '18rem',
  columns = 'auto',
  gap = 2,
  asBento = false,
  title,
  subtitle,
  padY = false,
  wide = false,
}: GridRecipeProps<T>) {
  if (asBento) {
    return (
      <BentoSection
        title={title}
        subtitle={subtitle}
        columns={columns}
        min={min}
        gap={gap}
        padY={padY}
        wide={wide}
      >
        {items.map((it, i) => (
          <div key={i}>{renderItem(it, i)}</div>
        ))}
      </BentoSection>
    )
  }
  return (
    <AutoGrid $min={min} $columns={columns} $gap={gap}>
      {items.map((it, i) => (
        <div key={i}>{renderItem(it, i)}</div>
      ))}
    </AutoGrid>
  )
}
