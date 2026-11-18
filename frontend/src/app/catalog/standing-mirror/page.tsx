import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Standing Mirror Custom Indonesia',
  description: 'Standing mirror custom dengan frame kayu natural. Produksi handcrafted di Tulungagung, Jawa Timur. Pengiriman ke Surabaya, Malang, Jakarta, dan seluruh Indonesia.',
  keywords: ['standing mirror', 'standing mirror Tulungagung', 'standing mirror Surabaya', 'standing mirror custom', 'standing mirror Indonesia', 'cermin kayu', 'kaca cermin', 'cermin estetik'],
  alternates: { canonical: '/catalog/standing-mirror' },
  openGraph: {
    title: 'Standing Mirror Custom Indonesia | Amoraga Creative',
    description: 'Standing mirror custom dengan frame kayu natural. Produksi handcrafted di Tulungagung, Jawa Timur. Pengiriman ke Surabaya, Malang, Jakarta, dan seluruh Indonesia.',
    type: 'website',
  },
}

export default async function StandingMirrorPage() {
  let products: any[] = []
  try {
    products = await fetchProducts({ search: 'standing mirror' })
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
            <span className="text-charcoal">Standing Mirror</span>
          </nav>

          <header className="mb-10">
            <h1 className="font-display text-4xl mb-4">Standing Mirror</h1>
            <p className="text-warm-gray max-w-2xl">Cermin berdiri (standing mirror) adalah statement piece untuk kamar tidur, ruang ganti, atau boutique. Setiap unit kami kerjakan handcrafted dengan frame kayu solid, finishing natural, dan bisa custom tinggi sesuai kebutuhan.</p>
          </header>

          <section className="mb-12 bg-surface p-6 rounded-lg border border-border-light">
            <h2 className="font-display text-xl mb-4">Specifications & Options</h2>
            <ul className="text-warm-gray space-y-2 text-sm list-disc pl-5">
              <li>Frame kayu solid (jati, mahoni, atau sesuai permintaan)</li>
              <li>Tinggi 150cm hingga 200cm (custom tersedia)</li>
              <li>Base kayu tebal untuk stabilitas</li>
              <li>Opsi LED backlight (tambahan)</li>
              <li>Pengiriman seluruh Indonesia dengan packing kayu</li>
            </ul>
          </section>

          <h2 className="font-display text-2xl mb-6">Available Standing Mirror Products</h2>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-lg border border-border-light">
              <p className="text-warm-gray mb-4">We make most standing mirror custom to order.</p>
              <a
                href="https://wa.me/6281234480282?text=Halo%20Amoraga%20Creative%2C%20saya%20tertarik%20dengan%20standing%20mirror"
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
