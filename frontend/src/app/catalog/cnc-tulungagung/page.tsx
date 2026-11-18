import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CNC Kayu Tulungagung — Cutting & Ukir',
  description: 'Jasa CNC kayu di Tulungagung untuk cutting, ukiran, dan pembuatan frame cermin. Melayani project custom skala kecil hingga besar dengan presisi mesin CNC.',
  keywords: ['CNC Tulungagung', 'CNC Tulungagung Tulungagung', 'CNC Tulungagung Surabaya', 'CNC Tulungagung custom', 'CNC Tulungagung Indonesia', 'cermin kayu', 'kaca cermin', 'cermin estetik'],
  alternates: { canonical: '/catalog/cnc-tulungagung' },
  openGraph: {
    title: 'CNC Kayu Tulungagung — Cutting & Ukir | Amoraga Creative',
    description: 'Jasa CNC kayu di Tulungagung untuk cutting, ukiran, dan pembuatan frame cermin. Melayani project custom skala kecil hingga besar dengan presisi mesin CNC.',
    type: 'website',
  },
}

export default async function CncTulungagungPage() {
  let products: any[] = []
  try {
    products = await fetchProducts({ search: 'CNC Tulungagung' })
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
            <span className="text-charcoal">CNC Kayu Tulungagung</span>
          </nav>

          <header className="mb-10">
            <h1 className="font-display text-4xl mb-4">CNC Kayu Tulungagung</h1>
            <p className="text-warm-gray max-w-2xl">Workshop kami di Tulungagung dilengkapi mesin CNC untuk cutting kayu presisi dan ukiran detail. Melayani project cermin custom, frame dekoratif, panel kayu, dan kerajinan kayu lainnya.</p>
          </header>

          <section className="mb-12 bg-surface p-6 rounded-lg border border-border-light">
            <h2 className="font-display text-xl mb-4">Specifications & Options</h2>
            <ul className="text-warm-gray space-y-2 text-sm list-disc pl-5">
              <li>CNC router untuk cutting dan engraving kayu</li>
              <li>Presisi tinggi untuk detail ukiran halus</li>
              <li>Material: kayu solid, plywood, MDF</li>
              <li>Terima file desain (DXF, SVG, AI)</li>
              <li>Produksi batch kecil hingga menengah</li>
            </ul>
          </section>

          <h2 className="font-display text-2xl mb-6">Available CNC Kayu Tulungagung Products</h2>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-lg border border-border-light">
              <p className="text-warm-gray mb-4">We make most cnc kayu tulungagung custom to order.</p>
              <a
                href="https://wa.me/6281234480282?text=Halo%20Amoraga%20Creative%2C%20saya%20tertarik%20dengan%20CNC%20Tulungagung"
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
