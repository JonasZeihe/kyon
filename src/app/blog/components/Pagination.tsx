// src/app/blog/components/Pagination.tsx
import Link from 'next/link'
import Button from '@/components/button/Button'
import Typography from '@/styles/Typography'

type Props = {
  page: number
  pageCount: number
  makeHref?: (page: number) => string
}

export default function Pagination({ page, pageCount, makeHref }: Props) {
  const href = makeHref ?? ((p: number) => `?page=${p}`)
  const prev = page > 1 ? page - 1 : 1
  const next = page < pageCount ? page + 1 : pageCount

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {page > 1 ? (
        <Link href={href(prev)}>
          <Button variant="primary">Zurück</Button>
        </Link>
      ) : (
        <span style={{ visibility: 'hidden' }}>
          <Button variant="primary">Zurück</Button>
        </span>
      )}
      <Typography variant="caption">
        Seite {page} / {pageCount}
      </Typography>
      {page < pageCount ? (
        <Link href={href(next)}>
          <Button variant="primary">Weiter</Button>
        </Link>
      ) : (
        <span style={{ visibility: 'hidden' }}>
          <Button variant="primary">Weiter</Button>
        </span>
      )}
    </div>
  )
}
