import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Amoraga Creative | Premium Mirror & Glass Products',
    template: '%s | Amoraga Creative'
  },
  description: 'Premium mirror and glass solutions for homes and businesses. Custom mirrors, decorative glass, glass panels, and professional installation services in Indonesia.',
  keywords: ['mirror', 'glass', 'kaca cermin', 'cermin custom', 'kaca dekoratif', 'glass panel', 'mirror installation', 'Surabaya', 'Tulungagung', 'Indonesia'],
  authors: [{ name: 'Amoraga Creative' }],
  creator: 'Amoraga Creative',
  publisher: 'Amoraga Creative',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'id_ID',
    siteName: 'Amoraga Creative',
    title: 'Amoraga Creative | Premium Mirror & Glass Products',
    description: 'Premium mirror and glass solutions for homes and businesses. Custom mirrors, decorative glass, and professional installation.',
    images: [{ url: '/logo.png', width: 691, height: 686, alt: 'Amoraga Creative Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amoraga Creative | Premium Mirror & Glass Products',
    description: 'Premium mirror and glass solutions for homes and businesses.',
    images: ['/logo.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#2D2D2D" />
      </head>
      <body className="bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
