// src/components/media/MDXImage.tsx
'use client'
import Image from 'next/image'
import React from 'react'
type Props = React.ImgHTMLAttributes<HTMLImageElement> & { base?: string }
const j = (b: string, r: string) =>
  `${b.replace(/\/+$/, '')}/${r.replace(/^\.?\//, '')}`.replace(/\/{2,}/g, '/')
const r = (s: string, base?: string) =>
  !s || /^([a-z]+:)?\/\//i.test(s) || s.startsWith('/')
    ? s
    : base
      ? j(base, s)
      : s
const MDXImage = (p: Props) => {
  const { src = '', alt, width, height, title, base, style, ...rest } = p
  if (process.env.NODE_ENV !== 'production' && !alt)
    throw new Error('MDXImage alt required')
  const w = typeof width === 'number' ? width : 1200
  const h = typeof height === 'number' ? height : 800
  const s = r(String(src), base)
  return typeof title === 'string' && title.trim().length > 0 ? (
    <figure style={{ margin: '1rem 0' }}>
      <Image
        src={s}
        alt={String(alt || '')}
        width={w}
        height={h}
        sizes="100vw"
        unoptimized
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: 8,
          ...(style as any),
        }}
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
  ) : (
    <Image
      src={s}
      alt={String(alt || '')}
      width={w}
      height={h}
      sizes="100vw"
      unoptimized
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        ...(style as any),
      }}
      {...rest}
    />
  )
}
export default MDXImage
