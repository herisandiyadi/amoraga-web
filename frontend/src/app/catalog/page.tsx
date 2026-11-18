import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Browse our collection of premium mirrors and glass products. Bathroom mirrors, decorative mirrors, glass panels, and custom solutions. Shop now or request a quote.',
  keywords: ['mirror catalog', 'glass products', 'cermin', 'kaca', 'bathroom mirror', 'decorative mirror', 'glass panel', 'standing mirror', 'wall mirror', 'mirror creation', 'wood creation', 'kaca cermin', 'cermin kayu estetik'],
  alternates: { canonical: '/catalog' },
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

  const searchKeywords = ['standing mirror', 'wall mirror', 'mirror creation', 'wood creation', 'kaca cermin', 'cermin kayu estetik']
  const activeSearch = (searchParams.search || '').trim()
  const categories = ['All', 'Mirrors', 'Glass Panels', 'Decorative', 'Custom']

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-10">
            <h1 className="font-display text-4xl mb-4">Product Catalog</h1>
            <p className="text-warm-gray">Explore our collection of premium mirrors and glass products</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <a href="/catalog/standing-mirror" className="block p-4 bg-surface rounded-lg border border-border-light hover:border-olive transition-colors">
              <h2 className="font-display text-lg mb-1">Standing Mirror</h2>
              <p className="text-warm-gray text-sm">Cermin berdiri custom dengan frame kayu</p>
            </a>
            <a href="/catalog/wall-mirror" className="block p-4 bg-surface rounded-lg border border-border-light hover:border-olive transition-colors">
              <h2 className="font-display text-lg mb-1">Wall Mirror</h2>
              <p className="text-warm-gray text-sm">Cermin dinding dekoratif berbagai bentuk</p>
            </a>
            <a href="/catalog/cermin-kayu" className="block p-4 bg-surface rounded-lg border border-border-light hover:border-olive transition-colors">
              <h2 className="font-display text-lg mb-1">Cermin Kayu</h2>
              <p className="text-warm-gray text-sm">Cermin dengan bingkai kayu estetik</p>
            </a>
            <a href="/catalog/cnc-tulungagung" className="block p-4 bg-surface rounded-lg border border-border-light hover:border-olive transition-colors">
              <h2 className="font-display text-lg mb-1">CNC Kayu</h2>
              <p className="text-warm-gray text-sm">Jasa cutting dan ukiran CNC Tulungagung</p>
            </a>
          </div>

          <form action="/catalog" method="get" role="search" className="flex gap-2 mb-4">
            {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
            <label htmlFor="catalog-search" className="sr-only">Search products</label>
            <input
              id="catalog-search"
              type="search"
              name="search"
              defaultValue={activeSearch}
              placeholder="Search mirrors, e.g. standing mirror"
              className="flex-1 px-4 py-2 rounded-full border border-taupe bg-cream text-charcoal focus:outline-none focus:border-charcoal"
            />
            <button type="submit" className="px-6 py-2 rounded-full bg-charcoal text-cream text-sm">Search</button>
          </form>

          <nav className="flex flex-wrap gap-2 mb-4" aria-label="Search keywords">
            {searchKeywords.map(kw => (
              <a
                key={kw}
                href={`/catalog?search=${encodeURIComponent(kw)}${searchParams.category ? `&category=${encodeURIComponent(searchParams.category)}` : ''}`}
                className={`px-3 py-1 rounded-full text-xs border border-taupe transition-colors ${
                  activeSearch.toLowerCase() === kw ? 'bg-charcoal text-cream' : 'bg-cream text-charcoal hover:bg-taupe/30'
                }`}
              >
                {kw}
              </a>
            ))}
          </nav>

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

          <h2 className="font-display text-2xl mb-6">
            {activeSearch ? `Results for "${activeSearch}"` : 'All Products'}
          </h2>

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
