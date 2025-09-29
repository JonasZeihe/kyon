// src/app/layout.tsx
import type { Metadata } from 'next'
import Shell from '@/layouts/Shell'
import Providers from '@/providers'
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
  return (
    <html lang="de" data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
