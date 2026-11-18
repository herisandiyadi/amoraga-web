'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { submitInquiry } from '@/lib/api'

export default function ContactPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does production take?',
        acceptedAnswer: { '@type': 'Answer', text: 'Standard items: 5-7 working days. Custom pieces: 10-14 working days depending on complexity.' }
      },
      {
        '@type': 'Question',
        name: 'Do you ship outside East Java?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, we ship nationwide. Shipping costs are calculated based on size, weight, and destination.' }
      },
      {
        '@type': 'Question',
        name: 'Can I request a custom size or design?',
        acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Most of our orders are custom-made. Share your specifications via WhatsApp for a quote.' }
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: { '@type': 'Answer', text: 'Bank transfer (BCA, Mandiri, BRI), and marketplace checkout via Tokopedia and Shopee.' }
      }
    ]
  }

  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitInquiry({ ...form, source: 'contact' })
      setStatus('sent')
      setForm({ name: '', contact: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-display text-4xl mb-4">Contact Us</h1>
          <p className="text-warm-gray text-lg mb-12 max-w-2xl">
            Have questions about our mirrors and glass products? Need a custom quote 
            for your project? We are here to help bring your vision to life.
          </p>
          
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl mb-4">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-olive" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">WhatsApp (Fastest Response)</h3>
                      <a href="https://wa.me/6281234480282" className="text-olive hover:underline">
                        0812-3448-0282
                      </a>
                      <p className="text-warm-gray text-sm mt-1">Response within 1-2 hours during business hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a href="mailto:info@amoragacreative.com" className="text-olive hover:underline">
                        info@amoragacreative.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Workshop Location</h3>
                      <p className="text-warm-gray">Dsn. Tanjung, Ds. Tanjung, Kromasan 11A</p>
                      <p className="text-warm-gray">Jenon, Kromasan, Kec. Ngunut</p>
                      <p className="text-warm-gray">Kabupaten Tulungagung, Jawa Timur 66292</p>
                      <a 
                        href="https://maps.app.goo.gl/eT6t1d5qiLpffzJJA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-olive hover:underline text-sm mt-1 inline-block"
                      >
                        View on Google Maps
                      </a>
                      <p className="text-warm-gray text-sm mt-1">Visits by appointment only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl mb-4">Business Hours</h2>
                <div className="text-warm-gray space-y-1">
                  <p>Monday - Friday: 08:00 - 17:00 WIB</p>
                  <p>Saturday: 08:00 - 14:00 WIB</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>


              <div>
                <h2 className="font-display text-xl mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden border border-taupe/30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.123!2d111.9024!3d-8.0654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78e54023d1403b%3A0x8538faa2f799f3af!2sAmoraga%20Creative%20Chain!5e0!3m2!1sen!2sid!4v1700000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Amoraga Creative Location"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl mb-4">Frequently Asked</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-charcoal">How long does production take?</h3>
                    <p className="text-warm-gray">Standard items: 5-7 working days. Custom pieces: 10-14 working days depending on complexity.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Do you ship outside East Java?</h3>
                    <p className="text-warm-gray">Yes, we ship nationwide. Shipping costs are calculated based on size, weight, and destination.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Can I request a custom size or design?</h3>
                    <p className="text-warm-gray">Absolutely. Most of our orders are custom-made. Share your specifications via WhatsApp for a quote.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">What payment methods do you accept?</h3>
                    <p className="text-warm-gray">Bank transfer (BCA, Mandiri, BRI), and marketplace checkout via Tokopedia and Shopee.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-surface p-8 rounded-lg border border-border-light">
                <h2 className="font-display text-xl mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">Your Name</label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      required
                      placeholder="e.g. Budi Santoso"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="label">Email or WhatsApp Number</label>
                    <input
                      id="contact"
                      value={form.contact}
                      onChange={e => setForm({...form, contact: e.target.value})}
                      required
                      placeholder="e.g. 081234567890 or email@example.com"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="label">Your Message</label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      required
                      rows={5}
                      placeholder="Tell us about your project. Include dimensions, style preferences, and any reference images you have."
                      className="input"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="btn-primary w-full"
                  >
                    {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-600 text-sm">Failed to send. Please try WhatsApp instead.</p>
                  )}
                  {status === 'sent' && (
                    <p className="text-olive text-sm">Thank you! We will respond within 24 hours.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
