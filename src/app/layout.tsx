// src/app/layout.tsx
import type { Metadata } from 'next'
import Providers from './providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/blog/constants'

export const metadata: Metadata = {
  title: 'kyon',
  description: 'Prozess statt Pose. Natürlichkeit vor Methode.',
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const enableMesh =
    (process.env.NEXT_PUBLIC_FEATURE_MESH_BG ?? 'true').toLowerCase() !==
    'false'

  return (
    <html lang="de">
      <body>
        <Providers>
          <Header navSections={[]} />
          <main style={{ paddingTop: '4.6rem' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
