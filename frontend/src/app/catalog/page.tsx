import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Browse our collection of premium mirrors and glass products. Bathroom mirrors, decorative mirrors, glass panels, and custom solutions. Shop now or request a quote.',
  keywords: ['mirror catalog', 'glass products', 'cermin', 'kaca', 'bathroom mirror', 'decorative mirror', 'glass panel'],
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  let products = []
  try {
    products = await fetchProducts({
      category: searchParams.category,
      search: searchParams.search,
    })
  } catch (e) {}

  const categories = ['All', 'Mirrors', 'Glass Panels', 'Decorative', 'Custom']

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-10">
            <h1 className="font-display text-4xl mb-4">Product Catalog</h1>
            <p className="text-warm-gray">Explore our collection of premium mirrors and glass products</p>
          </header>

          <nav className="flex flex-wrap gap-2 mb-8" aria-label="Product categories">
            {categories.map(cat => (
              <a
                key={cat}
                href={cat === 'All' ? '/catalog' : `/catalog?category=${cat}`}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  (cat === 'All' && !searchParams.category) || searchParams.category === cat
                    ? 'bg-charcoal text-cream'
                    : 'bg-surface text-charcoal hover:bg-taupe/30'
                }`}
              >
                {cat}
              </a>
            ))}
          </nav>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-warm-gray">
              <p className="mb-4">No products found</p>
              <a href="/catalog" className="text-olive underline">View all products</a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
