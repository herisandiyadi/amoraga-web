import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wall Mirror Custom & Dekoratif',
  description: 'Cermin dinding custom dan dekoratif dengan berbagai bentuk: bulat, oval, arch, irregular. Dibuat di Tulungagung dengan frame kayu premium. Kirim ke seluruh Indonesia.',
  keywords: ['wall mirror', 'wall mirror Tulungagung', 'wall mirror Surabaya', 'wall mirror custom', 'wall mirror Indonesia', 'cermin kayu', 'kaca cermin', 'cermin estetik'],
  alternates: { canonical: '/catalog/wall-mirror' },
  openGraph: {
    title: 'Wall Mirror Custom & Dekoratif | Amoraga Creative',
    description: 'Cermin dinding custom dan dekoratif dengan berbagai bentuk: bulat, oval, arch, irregular. Dibuat di Tulungagung dengan frame kayu premium. Kirim ke seluruh Indonesia.',
    type: 'website',
  },
}

export default async function WallMirrorPage() {
  let products: any[] = []
  try {
    products = await fetchProducts({ search: 'wall mirror' })
  } catch (e) {}

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-sm text-warm-gray mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-olive">Home</Link>
            {" / "}
            <Link href="/catalog" className="hover:text-olive">Catalog</Link>
            {" / "}
            <span className="text-charcoal">Wall Mirror</span>
          </nav>

          <header className="mb-10">
            <h1 className="font-display text-4xl mb-4">Wall Mirror</h1>
            <p className="text-warm-gray max-w-2xl">Cermin dinding (wall mirror) memberi kedalaman visual pada ruangan sekaligus menjadi elemen dekoratif. Kami memproduksi berbagai bentuk: bulat, oval, arch, hingga bentuk organik custom.</p>
          </header>

          <section className="mb-12 bg-surface p-6 rounded-lg border border-border-light">
            <h2 className="font-display text-xl mb-4">Specifications & Options</h2>
            <ul className="text-warm-gray space-y-2 text-sm list-disc pl-5">
              <li>Bentuk: bulat, oval, arch, square, irregular</li>
              <li>Diameter atau ukuran custom (30cm hingga 150cm)</li>
              <li>Frame kayu, rotan, atau frameless</li>
              <li>Mounting system belakang untuk pemasangan aman</li>
              <li>Cocok untuk kamar mandi, ruang tamu, kafe</li>
            </ul>
          </section>

          <h2 className="font-display text-2xl mb-6">Available Wall Mirror Products</h2>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-lg border border-border-light">
              <p className="text-warm-gray mb-4">We make most wall mirror custom to order.</p>
              <a
                href="https://wa.me/6281234480282?text=Halo%20Amoraga%20Creative%2C%20saya%20tertarik%20dengan%20wall%20mirror"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-olive text-cream rounded hover:bg-charcoal transition-colors"
              >
                Request Quote via WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
