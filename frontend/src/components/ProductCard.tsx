'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  images: string[]
  category: string
  tokopediaUrl?: string
  shopeeUrl?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [showLightbox, setShowLightbox] = useState(false)
  const imageUrl = product.images?.[0] || '/placeholder.jpg'
  
  return (
    <>
      <div className="card group">
        <div 
          className="aspect-[4/3] relative mb-4 overflow-hidden rounded cursor-pointer"
          onClick={() => setShowLightbox(true)}
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white bg-charcoal/70 px-3 py-1 rounded text-sm transition-opacity">
              Tap to view
            </span>
          </div>
        </div>
        <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-display text-lg mb-2">{product.name}</h3>
        <p className="text-warm-gray text-sm mb-4">Contact for price</p>
        <a
          href={`https://wa.me/6281234480282?text=Halo%20Amoraga%20Creative%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-sm py-2 px-3 bg-olive text-cream rounded hover:bg-charcoal transition-colors mb-2"
        >
          Inquire via WhatsApp
        </a>
        <div className="flex gap-2">
          {product.tokopediaUrl && (
            <a
              href={product.tokopediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs py-2 px-3 border border-border-light rounded hover:border-olive hover:text-olive transition-colors"
            >
              Tokopedia
            </a>
          )}
          {product.shopeeUrl && (
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs py-2 px-3 border border-border-light rounded hover:border-olive hover:text-olive transition-colors"
            >
              Shopee
            </a>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button 
            className="absolute top-4 right-4 text-cream text-3xl hover:text-taupe"
            onClick={() => setShowLightbox(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="max-w-3xl max-h-[85vh] w-full relative" onClick={e => e.stopPropagation()}>
            <Image
              src={imageUrl}
              alt={product.name}
              width={800}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
            <div className="mt-4 text-center text-cream">
              <h3 className="font-display text-xl">{product.name}</h3>
              {product.description && <p className="text-sm text-cream/70 mt-1">{product.description}</p>}
              <a
                href={`https://wa.me/6281234480282?text=Halo%20Amoraga%20Creative%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-olive text-cream rounded hover:bg-cream hover:text-charcoal transition-colors"
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
