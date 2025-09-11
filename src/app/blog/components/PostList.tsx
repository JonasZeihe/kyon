// src/app/blog/components/PostList.tsx
import Link from 'next/link'
import Image from 'next/image'
import Typography from '@/styles/Typography'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/blog/fs'
type Props = { posts: PostMeta[] }
const d = (v?: string) => {
  try {
    return v
      ? new Date(v).toLocaleDateString('de-DE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      : ''
  } catch {
    return v || ''
  }
}
const PostList = ({ posts }: Props) => (
  <div style={{ display: 'grid', gap: 16 }}>
    {posts.map((m) => {
      const href = `/blog/${m.category}/${m.slug}`
      const cover = m.cover
        ? toPublicAssetUrl(m.category, m.dirName, m.cover)
        : null
      return (
        <CardWrapper key={m.id}>
          <article style={{ display: 'grid', gap: 12 }}>
            {cover && (
              <Link href={href}>
                <Image
                  src={cover}
                  alt={m.title}
                  width={1600}
                  height={900}
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
                  unoptimized
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
              </Link>
            )}
            <div style={{ padding: 16, display: 'grid', gap: 8 }}>
              <Typography variant="h3">
                <Link href={href}>{m.title}</Link>
              </Typography>
              <Typography variant="caption">
                {d(m.updated || m.date)}
                {typeof m.readingTime === 'number' && m.readingTime > 0
                  ? ` · ⏱️ ${m.readingTime} min`
                  : ''}
              </Typography>
              {m.excerpt && <Typography>{m.excerpt}</Typography>}
              {m.tags && m.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {m.tags.map((t) => (
                    <span key={t} style={{ fontSize: 12, opacity: 0.8 }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        </CardWrapper>
      )
    })}
  </div>
)
export default PostList
