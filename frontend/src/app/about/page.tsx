import Layout from '@/components/Layout'
import { fetchContent } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Amoraga Creative - Your trusted partner for premium mirror and glass products. Custom mirrors, decorative glass, and professional installation in Surabaya, Tulungagung, and across Indonesia.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  let content = null
  try {
    content = await fetchContent('about')
    content = content?.value
  } catch (e) {}

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl lg:text-5xl mb-8">
            {content?.title || 'About Amoraga Creative'}
          </h1>
          
          <div className="prose prose-lg max-w-none text-warm-gray">
            {content?.body ? (
              <div dangerouslySetInnerHTML={{ __html: content.body }} />
            ) : (
              <>
                <p className="text-xl mb-6">
                  Amoraga Creative has been crafting premium mirror and glass products 
                  for homes and businesses across Indonesia. Based in Tulungagung, East Java, 
                  we combine traditional craftsmanship with modern design aesthetics to create 
                  pieces that transform spaces.
                </p>

                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Our Story</h2>
                <p>
                  What started as a small workshop specializing in custom mirrors has grown 
                  into a trusted name for premium glass solutions. Our journey is built on 
                  a simple belief: every space deserves a reflection that feels like home. 
                  Today, we serve clients across East Java and beyond, from individual homeowners 
                  to major corporate institutions.
                </p>
                
                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">What We Create</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
                  <div className="bg-surface p-6 rounded-lg border border-border-light">
                    <h3 className="font-display text-lg text-charcoal mb-2">Standing Mirrors</h3>
                    <p className="text-warm-gray text-sm">Full-length floor mirrors with wooden frames, 
                    available with LED lighting. Perfect for bedrooms, dressing rooms, and boutiques.</p>
                  </div>
                  <div className="bg-surface p-6 rounded-lg border border-border-light">
                    <h3 className="font-display text-lg text-charcoal mb-2">Wall Mirrors</h3>
                    <p className="text-warm-gray text-sm">Decorative wall pieces in various shapes 
                    and frame styles. From minimalist circles to ornate wooden frames.</p>
                  </div>
                  <div className="bg-surface p-6 rounded-lg border border-border-light">
                    <h3 className="font-display text-lg text-charcoal mb-2">Wood Creations</h3>
                    <p className="text-warm-gray text-sm">Handcrafted wooden frames using quality 
                    timber. Each piece showcases natural grain patterns and expert joinery.</p>
                  </div>
                  <div className="bg-surface p-6 rounded-lg border border-border-light">
                    <h3 className="font-display text-lg text-charcoal mb-2">Glass Panels</h3>
                    <p className="text-warm-gray text-sm">Architectural glass for partitions, 
                    facades, and interior features. Custom sizes and finishes available.</p>
                  </div>
                </div>
                
                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Trusted Partners</h2>
                <p>
                  We are proud to serve prestigious clients including JW Marriott Surabaya, 
                  Bea Cukai, Telkom, Bank Jatim, and BRI. Our commitment to quality, precision, 
                  and timely delivery has earned us the trust of leading institutions across 
                  hospitality, government, and banking sectors.
                </p>

                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Our Process</h2>
                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong>Consultation</strong> - Share your vision via WhatsApp or our contact form. We discuss dimensions, style, and budget.</li>
                  <li><strong>Design</strong> - We provide design options and material recommendations tailored to your space.</li>
                  <li><strong>Production</strong> - Your piece is handcrafted in our Tulungagung workshop with attention to every detail.</li>
                  <li><strong>Delivery</strong> - We safely package and ship across Indonesia. Professional installation available in East Java.</li>
                </ol>

                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Service Areas</h2>
                <p>
                  Our workshop is based in Tulungagung, East Java. We ship nationwide across Indonesia 
                  and provide on-site installation services in:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Surabaya and Greater Surabaya</li>
                  <li>Tulungagung, Blitar, Kediri, and surrounding areas</li>
                  <li>Malang and Batu</li>
                  <li>Jakarta (shipping only, no installation)</li>
                  <li>Other cities by arrangement</li>
                </ul>
                
                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Our Promise</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Premium quality materials sourced from trusted suppliers</li>
                  <li>Custom designs tailored to your exact specifications</li>
                  <li>Professional installation by experienced technicians</li>
                  <li>Competitive pricing with transparent quotes</li>
                  <li>After-sales support and warranty on craftsmanship</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
