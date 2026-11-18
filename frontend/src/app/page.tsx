import Layout from "@/components/Layout"
import ProductCard from "@/components/ProductCard"
import Partners from "@/components/Partners"
import { fetchProducts, fetchContent } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  let products: any[] = []
  let hero = null
  let partners: any[] = []
  
  try {
    products = await fetchProducts({ featured: true })
    const heroData = await fetchContent("hero_banners")
    hero = heroData?.value?.[0] || null
    const partnersData = await fetchContent("partners")
    partners = partnersData?.value || []
  } catch (e) {
    console.error("Failed to fetch data:", e)
  }

  const categories = [
    { name: "Standing Mirror", slug: "standing-mirror", description: "Floor-length reflections for every room", image: "/uploads/product-000.png" },
    { name: "Standing Mirror LED", slug: "standing-mirror-led", description: "Ambient light meets modern form", image: "/uploads/product-005.png" },
    { name: "Wall Mirror", slug: "wall-mirror", description: "Sculpted surfaces for refined walls", image: "/uploads/product-003.png" },
  ]

  return (
    <Layout>
      
      {/* Hero Section - Full-bleed background */}
      <section className="relative overflow-hidden min-h-[80vh] lg:min-h-[90vh] flex items-center">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/hero-bg-mobile.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/hero-bg-tablet.webp"
            type="image/webp"
          />
          <img
            src="/hero-bg.webp"
            alt="Bedroom interior with sculptural mirror"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top -z-10"
          />
        </picture>
        <div className="absolute inset-0 bg-charcoal/40 -z-10" />
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 w-full">
          <div className="max-w-2xl text-cream">
            <p className="text-sm uppercase tracking-[0.2em] text-cream/80 mb-6">
              Amoraga Creative
            </p>
            <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] mb-8">
              {hero?.title || "Reflections that feel like home"}
            </h1>
            <p className="text-lg text-cream/90 mb-10 max-w-lg leading-relaxed">
              {hero?.subtitle || "Sculptural mirrors and premium glass crafted for modern living. Each piece is made to order in Indonesia."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalog" className="btn-primary">
                Explore Collection
              </Link>
              <Link href="/contact" className="inline-block border border-cream text-cream px-6 py-3 rounded hover:bg-cream hover:text-charcoal transition-colors">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Collection */}
      <section className="py-20 lg:py-28 bg-cream/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">01 — Collection</p>
              <h2 className="font-display text-4xl lg:text-5xl max-w-lg">The Collection</h2>
            </div>
            <Link href="/catalog" className="text-sm uppercase tracking-widest text-charcoal border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors">
              View All →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {categories.map((cat, i) => (
              <Link 
                key={cat.slug} 
                href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="group block"
              >
                <div className="aspect-[3/4] bg-taupe/20 mb-5 overflow-hidden relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-display text-5xl text-white/80">0{i + 1}</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl mb-2 group-hover:text-olive transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-warm-gray">{cat.description}</p>
              </Link>
            ))}
          </div>

          {products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 3).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-6 text-center">
            02 — Philosophy
          </p>
          <h2 className="font-display text-4xl lg:text-6xl text-center leading-tight mb-10">
            Shape the atmosphere
          </h2>
          <p className="text-lg text-warm-gray text-center max-w-2xl mx-auto leading-relaxed">
            A mirror is not only a surface. It opens a room, bends the light, 
            and becomes part of how a space feels. We make each piece to last, 
            with frames you can live with for years.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 mt-20 pt-20 border-t border-border-light">
            <div>
              <p className="font-display text-4xl text-olive mb-3">01</p>
              <h3 className="font-display text-xl mb-3">Made to order</h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                Each piece is cut, framed, and finished for your space. Custom sizes available.
              </p>
            </div>
            <div>
              <p className="font-display text-4xl text-olive mb-3">02</p>
              <h3 className="font-display text-xl mb-3">Premium materials</h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                High-clarity glass, hardwood frames, and durable finishes selected for longevity.
              </p>
            </div>
            <div>
              <p className="font-display text-4xl text-olive mb-3">03</p>
              <h3 className="font-display text-xl mb-3">Delivered safely</h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                Protective packaging and careful shipping across Indonesia, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Partners partners={partners} />
    </Layout>
  )
}
