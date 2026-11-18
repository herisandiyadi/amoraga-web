import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://amoraga.co.id'),
  title: {
    default: 'Amoraga Creative | Cermin Custom & Kaca Dekoratif Tulungagung',
    template: '%s | Amoraga Creative'
  },
  description: 'Produsen cermin custom dan kaca dekoratif di Tulungagung, Jawa Timur. Standing mirror, wall mirror, cermin kayu estetik, kaca cermin custom. Pengiriman Surabaya, Malang, Jakarta, seluruh Indonesia.',
  keywords: [
    'cermin kayu',
    'cermin kayu Tulungagung',
    'CNC Tulungagung',
    'CNC kayu Tulungagung',
    'cutting CNC Tulungagung',
    'ukiran CNC kayu',
    'kerajinan kayu Tulungagung',
    'cermin ukir kayu',
    'frame cermin kayu',
    'cermin custom Tulungagung',
    'kaca cermin Surabaya',
    'standing mirror Indonesia',
    'wall mirror custom Jawa Timur',
    'cermin kayu estetik',
    'cermin dinding custom',
    'kaca dekoratif Malang',
    'mirror creation Indonesia',
    'wood creation mirror',
    'cermin berdiri custom',
    'kaca cermin murah',
    'cermin aesthetic',
    'cermin minimalis',
    'cermin kamar tidur',
    'cermin ruang tamu',
    'custom mirror Surabaya',
    'standing mirror Tulungagung',
    'wall mirror Surabaya',
    'kaca cermin Jawa Timur',
    'mirror', 'glass', 'kaca cermin', 'cermin custom', 'kaca dekoratif', 'glass panel'
  ],
  authors: [{ name: 'Amoraga Creative' }],
  creator: 'Amoraga Creative',
  publisher: 'Amoraga Creative',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    siteName: 'Amoraga Creative',
    title: 'Amoraga Creative | Cermin Custom & Kaca Dekoratif Tulungagung',
    description: 'Produsen cermin custom dan kaca dekoratif di Tulungagung. Standing mirror, wall mirror, cermin kayu estetik. Pengiriman seluruh Indonesia.',
    images: [{ url: '/logo.png', width: 691, height: 686, alt: 'Amoraga Creative Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amoraga Creative | Cermin Custom Tulungagung',
    description: 'Produsen cermin custom dan kaca dekoratif. Standing mirror, wall mirror, cermin kayu estetik.',
    images: ['/logo.png'],
  },
  verification: {
    google: 'google45b7528ec319afa0',
  },
}

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://amoraga.co.id/#business',
  name: 'Amoraga Creative',
  url: 'https://amoraga.co.id',
  logo: 'https://amoraga.co.id/logo.png',
  image: 'https://amoraga.co.id/logo.png',
  description: 'Produsen cermin custom dan kaca dekoratif di Tulungagung, Jawa Timur. Melayani standing mirror, wall mirror, cermin kayu estetik, dan kaca cermin custom dengan pengiriman ke seluruh Indonesia.',
  telephone: '+62-812-3448-0282',
  email: 'info@amoragacreative.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dsn. Tanjung, Ds. Tanjung, Kromasan 11A, Jenon, Kromasan, Kec. Ngunut',
    addressLocality: 'Tulungagung',
    addressRegion: 'Jawa Timur',
    postalCode: '66292',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -8.0654,
    longitude: 111.9024,
  },
  areaServed: [
    { '@type': 'City', name: 'Tulungagung' },
    { '@type': 'City', name: 'Surabaya' },
    { '@type': 'City', name: 'Malang' },
    { '@type': 'City', name: 'Kediri' },
    { '@type': 'City', name: 'Blitar' },
    { '@type': 'State', name: 'Jawa Timur' },
    { '@type': 'Country', name: 'Indonesia' },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
  ],
  sameAs: ['https://maps.app.goo.gl/eT6t1d5qiLpffzJJA'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Katalog Cermin & Kaca',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Standing Mirror', description: 'Cermin berdiri dengan frame kayu, tersedia dengan LED' },
      { '@type': 'OfferCatalog', name: 'Wall Mirror', description: 'Cermin dinding dekoratif berbagai bentuk dan ukuran' },
      { '@type': 'OfferCatalog', name: 'Cermin Kayu Estetik', description: 'Cermin dengan bingkai kayu natural handcrafted' },
      { '@type': 'OfferCatalog', name: 'Glass Panel', description: 'Panel kaca untuk partisi dan dekorasi interior' },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#2D2D2D" />
        <meta name="geo.region" content="ID-JI" />
        <meta name="geo.placename" content="Tulungagung, Jawa Timur" />
        <meta name="geo.position" content="-8.0654;111.9024" />
        <meta name="ICBM" content="-8.0654, 111.9024" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CDXWXJ4FCW" strategy="lazyOnload" />
        <Script id="ga4" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CDXWXJ4FCW');
        `}</Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      <link rel="preload" href="/hero-bg-mobile.webp" as="image" type="image/webp" media="(max-width: 640px)" fetchPriority="high" /><link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" media="(min-width: 641px)" fetchPriority="high" /></head>
      <body className="bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
