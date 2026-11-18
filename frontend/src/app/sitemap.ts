import { MetadataRoute } from 'next'

async function getProducts() {
  try {
    const res = await fetch('http://backend:4000/api/products', { next: { revalidate: 3600 } })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://amoraga.co.id'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/catalog/standing-mirror`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/catalog/wall-mirror`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/catalog/cermin-kayu`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/catalog/cnc-tulungagung`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const products = await getProducts()
  const productPages: MetadataRoute.Sitemap = (Array.isArray(products) ? products : []).map((p: any) => ({
    url: `${base}/products/${p.slug || p.id}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
