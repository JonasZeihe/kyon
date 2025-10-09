// src/app/layout.tsx
import type { Metadata } from 'next'
import Shell from '@/layouts/Shell'
import Providers from '@/providers'
import { SITE_URL } from '@/lib/blog/constants'
import { withBase } from '@/lib/content/helpers/paths'

export const metadata: Metadata = {
  title: 'kyon',
  description: 'Prozess statt Pose. Natürlichkeit vor Methode.',
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: withBase('/favicon.ico'),
    shortcut: withBase('/favicon.ico'),
    apple: withBase('/apple-touch-icon.png'),
  },
  openGraph: {
    images: [{ url: withBase('/og-default.png'), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [withBase('/og-default.png')],
  },
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
