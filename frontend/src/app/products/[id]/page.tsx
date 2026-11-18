import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Layout from '@/components/Layout'

const SITE = 'https://amoraga.co.id'

async function getProduct(id: string) {
  if (!/^\d+$/.test(id)) return null
  try {
    const res = await fetch(`http://backend:4000/api/products/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const p = await res.json()
    return p && p.id ? p : null
  } catch {
    return null
  }
}

function absUrl(u: string) {
  return u.startsWith('http') ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`
}

function trim(text: string, max: number) {
  const t = text.replace(/\s+/g, ' ').trim()
  return t.length <= max ? t : t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getProduct(params.id)
  if (!p) return { title: 'Product Not Found', robots: { index: false, follow: false } }
  const title = `${p.name} - ${p.category}`
  const description = trim(
    `${p.name} (${p.category}) from Amoraga Creative. ${p.description || ''} Premium mirror and glass products in Indonesia. Contact us on WhatsApp for price.`,
    158
  )
  const images = (p.images || []).slice(0, 1).map((i: string) => ({ url: absUrl(i), alt: p.name }))
  const url = `/products/${p.id}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title: `${title} | Amoraga Creative`, description, images },
    twitter: { card: 'summary_large_image', title: `${title} | Amoraga Creative`, description, images: images.map((i: any) => i.url) },
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const p = await getProduct(params.id)
  if (!p) notFound()

  const images: string[] = Array.isArray(p.images) ? p.images : []
  const waUrl = `https://wa.me/6281234480282?text=${encodeURIComponent(`Halo Amoraga Creative, saya tertarik dengan ${p.name}`)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || `${p.name} from Amoraga Creative`,
    category: p.category,
    sku: String(p.id),
    url: `${SITE}/products/${p.id}`,
    image: images.map(absUrl),
    brand: { '@type': 'Brand', name: 'Amoraga Creative' },
    offers: {
      '@type': 'Offer',
      url: `${SITE}/products/${p.id}`,
      availability: p.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Amoraga Creative' },
    },
  }

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="max-w-6xl mx-auto px-6 py-12 w-full">
        <nav aria-label="Breadcrumb" className="text-sm text-warm-gray mb-8">
          <Link href="/" className="hover:text-olive">Home</Link> / <Link href="/catalog" className="hover:text-olive">Catalog</Link> / <span className="text-charcoal">{p.name}</span>
        </nav>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="relative aspect-square bg-surface rounded overflow-hidden">
              <Image
                src={images[0] || '/placeholder.jpg'}
                alt={p.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.slice(1, 5).map((src, i) => (
                  <div key={src} className="relative aspect-square bg-surface rounded overflow-hidden">
                    <Image src={src} alt={`${p.name} view ${i + 2}`} fill sizes="12vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-olive uppercase tracking-widest mb-2">{p.category}</p>
            <h1 className="font-display text-3xl md:text-4xl mb-4">{p.name}</h1>
            {p.description && <p className="text-warm-gray leading-relaxed mb-6">{p.description}</p>}
            <p className="text-charcoal mb-1">Contact for price</p>
            <p className="text-sm text-warm-gray mb-6">{p.isAvailable ? 'Available' : 'Currently unavailable'}</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 bg-olive text-cream rounded hover:bg-charcoal transition-colors mb-3"
            >
              Inquire via WhatsApp
            </a>
            {(p.tokopediaUrl || p.shopeeUrl) && (
              <div className="flex gap-3">
                {p.tokopediaUrl && (
                  <a href={p.tokopediaUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 text-center text-sm py-2 px-3 border border-border-light rounded hover:border-olive hover:text-olive transition-colors">
                    Buy on Tokopedia
                  </a>
                )}
                {p.shopeeUrl && (
                  <a href={p.shopeeUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 text-center text-sm py-2 px-3 border border-border-light rounded hover:border-olive hover:text-olive transition-colors">
                    Buy on Shopee
                  </a>
                )}
              </div>
            )}
            <Link href="/catalog" className="inline-block mt-8 text-sm text-olive hover:underline">← Back to catalog</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
