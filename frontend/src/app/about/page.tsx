import Layout from '@/components/Layout'
import { fetchContent } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Amoraga Creative - Your trusted partner for premium mirror and glass products. Custom mirrors, decorative glass, and professional installation in Surabaya, Tulungagung, and across Indonesia.',
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
                  for homes and businesses across Indonesia.
                </p>
                
                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Our Expertise</h2>
                <p>
                  We specialize in custom mirror solutions, decorative glass panels, 
                  and architectural glass installations. From elegant bathroom mirrors 
                  to stunning commercial facades, we deliver quality craftsmanship 
                  backed by years of experience.
                </p>
                
                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Trusted Partners</h2>
                <p>
                  We're proud to serve prestigious clients including JW Marriott Surabaya, 
                  Bea Cukai, Telkom, Bank Jatim, and BRI. Our commitment to quality and 
                  timely delivery has earned us the trust of leading institutions.
                </p>
                
                <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Our Promise</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Premium quality materials</li>
                  <li>Custom designs tailored to your needs</li>
                  <li>Professional installation services</li>
                  <li>Competitive pricing</li>
                  <li>After-sales support</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
