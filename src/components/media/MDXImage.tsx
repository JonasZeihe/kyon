// src/components/media/MDXImage.tsx
import Image from 'next/image'
import React from 'react'
import { withBase } from '@/lib/content/helpers/paths'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { base?: string }

const join = (b: string, r: string) =>
  `${b.replace(/\/+$/, '')}/${String(r).replace(/^\.?\//, '')}`.replace(
    /\/{2,}/g,
    '/'
  )

const resolveSrc = (s: string, base?: string) => {
  if (!s) return s
  if (/^([a-z]+:)?\/\//i.test(s)) return s
  if (s.startsWith('/')) return withBase(s)
  return base ? join(base, s) : s
}

export default function MDXImage(p: Props) {
  const { src = '', alt, width, height, title, base, style, sizes, ...rest } = p
  if (process.env.NODE_ENV !== 'production' && !alt)
    throw new Error('MDXImage alt required')

  const w = typeof width === 'number' ? width : 1200
  const h = typeof height === 'number' ? height : 800
  const resolvedSrc = resolveSrc(String(src), base)
  const resolvedSizes =
    typeof sizes === 'string' && sizes.trim().length > 0
      ? sizes
      : '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'

  if (typeof title === 'string' && title.trim().length > 0) {
    return (
      <figure style={{ margin: '1rem 0' }}>
        <Image
          src={resolvedSrc}
          alt={String(alt || '')}
          width={w}
          height={h}
          sizes={resolvedSizes}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
            ...(style as any),
          }}
          priority={false}
          {...rest}
        />
        <figcaption
          style={{
            textAlign: 'center',
            opacity: 0.8,
            fontSize: '.9em',
            marginTop: 8,
          }}
        >
          {title}
        </figcaption>
      </figure>
    )
  }

  return (
    <Image
      src={resolvedSrc}
      alt={String(alt || '')}
      width={w}
      height={h}
      sizes={resolvedSizes}
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        ...(style as any),
      }}
      priority={false}
      {...rest}
    />
  )
}
