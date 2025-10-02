// src/app/blog/components/PostList.tsx
import GridRecipe from '@/components/pagekit/recipes/GridRecipe'
import Card from '@/components/blog/Card'
import type { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Typography from '@/styles/Typography'

type Props = {
  posts: PostMeta[]
  min?: string
  gap?: number
  columns?: number | 'auto'
  asBento?: boolean
}

export default function PostList({
  posts,
  min = '18rem',
  gap = 2,
  columns = 'auto',
  asBento = false,
}: Props) {
  if (!posts?.length)
    return <Typography color="text.subtle">Keine Beiträge gefunden.</Typography>

  return (
    <GridRecipe
      items={posts}
      min={min}
      gap={gap}
      columns={columns}
      asBento={asBento}
      renderItem={(m) => {
        const href = `/blog/${m.category}/${m.slug}`
        const cover = m.cover
          ? toPublicAssetUrl(m.category, m.dirName, m.cover)
          : undefined
        return (
          <Card
            key={m.id}
            href={href}
            title={m.title}
            cover={cover}
            date={m.updated || m.date}
            readingTime={m.readingTime}
            excerpt={m.excerpt}
            tag={m.category}
          />
        )
      }}
    />
  )
}
