// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const revalidate = false
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3068FF, #CA21B6)',
          color: 'white',
          fontSize: 64,
          fontWeight: 700,
          padding: '0 48px',
          textAlign: 'center',
        }}
      >
        KYON Blog
      </div>
    ),
    size
  )
}
