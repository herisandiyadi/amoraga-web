'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { submitInquiry } from '@/lib/api'

export default function ContactPage() {
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
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-xl mb-4">Get In Touch</h2>
              <p className="text-warm-gray mb-6">
                Have questions about our products or need a custom quote? 
                We'd love to hear from you.
              </p>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">WhatsApp</h3>
                  <a href="https://wa.me/6281234480282" className="text-olive hover:underline">
                    0812-3448-0282
                  </a>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a href="mailto:info@amoragacreative.com" className="text-olive hover:underline">
                    info@amoragacreative.com
                  </a>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-warm-gray">Tulungagung, East Java, Indonesia</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="label">Name</label>
                <input
                  id="name"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="contact" className="label">Email or Phone</label>
                <input
                  id="contact"
                  value={form.contact}
                  onChange={e => setForm({...form, contact: e.target.value})}
                  required
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="message" className="label">Message</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  required
                  rows={5}
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
                <p className="text-red-600 text-sm">Failed to send. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}
