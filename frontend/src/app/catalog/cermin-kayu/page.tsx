import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cermin Kayu Estetik & Handcrafted',
  description: 'Cermin dengan bingkai kayu natural, handcrafted di Tulungagung. Cermin kayu estetik untuk interior aesthetic, kamar tidur, kafe, dan bisnis. Pengiriman seluruh Indonesia.',
  keywords: ['cermin kayu', 'cermin kayu Tulungagung', 'cermin kayu Surabaya', 'cermin kayu custom', 'cermin kayu Indonesia', 'cermin kayu', 'kaca cermin', 'cermin estetik'],
  alternates: { canonical: '/catalog/cermin-kayu' },
  openGraph: {
    title: 'Cermin Kayu Estetik & Handcrafted | Amoraga Creative',
    description: 'Cermin dengan bingkai kayu natural, handcrafted di Tulungagung. Cermin kayu estetik untuk interior aesthetic, kamar tidur, kafe, dan bisnis. Pengiriman seluruh Indonesia.',
    type: 'website',
  },
}

export default async function CerminKayuPage() {
  let products: any[] = []
  try {
    products = await fetchProducts({ search: 'cermin kayu' })
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
            <span className="text-charcoal">Cermin Kayu</span>
          </nav>

          <header className="mb-10">
            <h1 className="font-display text-4xl mb-4">Cermin Kayu</h1>
            <p className="text-warm-gray max-w-2xl">Cermin kayu estetik menggabungkan keindahan material alami dengan fungsi reflektif. Setiap frame kami kerjakan tangan di workshop Tulungagung dengan material kayu pilihan dan finishing yang tahan lama.</p>
          </header>

          <section className="mb-12 bg-surface p-6 rounded-lg border border-border-light">
            <h2 className="font-display text-xl mb-4">Specifications & Options</h2>
            <ul className="text-warm-gray space-y-2 text-sm list-disc pl-5">
              <li>Material kayu: jati, mahoni, pinus, atau request khusus</li>
              <li>Finishing natural, stain, atau cat sesuai preferensi</li>
              <li>Ukiran CNC tersedia untuk desain detail</li>
              <li>Cocok untuk interior aesthetic, boho, Japandi, rustic</li>
              <li>Produksi handcrafted dengan quality control ketat</li>
            </ul>
          </section>

          <h2 className="font-display text-2xl mb-6">Available Cermin Kayu Products</h2>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-lg border border-border-light">
              <p className="text-warm-gray mb-4">We make most cermin kayu custom to order.</p>
              <a
                href="https://wa.me/6281234480282?text=Halo%20Amoraga%20Creative%2C%20saya%20tertarik%20dengan%20cermin%20kayu"
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
