// src/app/blog/components/PostHeader.tsx
import Image from 'next/image'
import Typography from '@/styles/Typography'
import { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/blog/fs'
type Props = { meta: PostMeta }
const f = (v?: string) => {
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
const PostHeader = ({ meta }: Props) => {
  const cover = meta.cover
    ? toPublicAssetUrl(meta.category, meta.dirName, meta.cover)
    : null
  const d = f(meta.updated || meta.date)
  return (
    <header style={{ display: 'grid', gap: 16 }}>
      <Typography variant="h1" align="center" color="accent.main">
        {meta.title}
      </Typography>
      <Typography align="center" variant="caption">
        {d}
      </Typography>
      {cover && (
        <Image
          src={cover}
          alt={meta.title}
          width={1600}
          height={900}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
          unoptimized
          style={{ width: '100%', height: 'auto', borderRadius: 12 }}
        />
      )}
      {meta.tags && meta.tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {meta.tags.map((t) => (
            <span key={t} style={{ fontSize: 12, opacity: 0.8 }}>
              #{t}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
export default PostHeader
