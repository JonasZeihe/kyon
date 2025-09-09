// src/app/blog/components/PostHeader.tsx
import Image from 'next/image'
import Typography from '@/styles/Typography'
import { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/blog/fs'

type Props = { meta: PostMeta }

export default function PostHeader({ meta }: Props) {
  const cover = meta.cover
    ? toPublicAssetUrl(meta.category, meta.dirName, meta.cover)
    : null
  const raw = (meta.updated as any) ?? (meta.date as any)
  const displayDate =
    typeof raw === 'string'
      ? new Date(raw).toLocaleDateString('de-DE')
      : raw instanceof Date
        ? raw.toLocaleDateString('de-DE')
        : String(raw || '')

  return (
    <header style={{ display: 'grid', gap: 16 }}>
      <Typography variant="h1" align="center" color="accent.main">
        {meta.title}
      </Typography>
      <Typography align="center" variant="caption">
        {displayDate}
      </Typography>
      {cover && (
        <Image
          src={cover}
          alt={meta.title}
          width={1600}
          height={900}
          sizes="100vw"
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
