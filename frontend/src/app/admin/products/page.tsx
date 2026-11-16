'use client'
import { useState, useEffect } from 'react'
import { adminFetch, adminUpload } from '@/lib/api'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  tokopediaUrl?: string
  shopeeUrl?: string
  isFeatured: boolean
  isAvailable: boolean
}

const emptyProduct = {
  name: '', description: '', price: 0, category: 'Mirrors',
  images: [], tokopediaUrl: '', shopeeUrl: '', isFeatured: false, isAvailable: true
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [editing, setEditing] = useState<Partial<Product> | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminFetch('/api/admin/products')
      setProducts(data || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleSave = async () => {
    if (!editing?.name) return
    try {
      if (editing.id) {
        await adminFetch(`/api/admin/products/${editing.id}`, {
          method: 'PUT', body: JSON.stringify(editing)
        })
      } else {
        await adminFetch('/api/admin/products', {
          method: 'POST', body: JSON.stringify(editing)
        })
      }
      setEditing(null)
      load()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      await adminFetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      load()
    } catch (e) { console.error(e) }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await adminUpload(file)
      if (res.url && editing) {
        setEditing({ ...editing, images: [...(editing.images || []), res.url] })
      }
    } catch (e) { console.error(e) }
    setUploading(false)
  }

  const removeImage = (idx: number) => {
    if (!editing) return
    const newImages = [...(editing.images || [])]
    newImages.splice(idx, 1)
    setEditing({ ...editing, images: newImages })
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Products</h1>
        <button onClick={() => setEditing(emptyProduct)} className="btn-primary">Add Product</button>
      </div>

      {/* Product List */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-sm font-medium">Category</th>
              <th className="px-4 py-3 text-sm font-medium">Price</th>
              <th className="px-4 py-3 text-sm font-medium">Featured</th>
              <th className="px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {products.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 text-sm text-warm-gray">{p.category}</td>
                <td className="px-4 py-3 text-sm">Rp {p.price?.toLocaleString('id-ID')}</td>
                <td className="px-4 py-3">{p.isFeatured ? '★' : ''}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setEditing(p)} className="text-olive text-sm mr-3">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-warm-gray">No products yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-xl mb-4">{editing.id ? 'Edit' : 'Add'} Product</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} className="input min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price (Rp)</label>
                  <input type="number" value={editing.price || 0} onChange={e => setEditing({...editing, price: +e.target.value})} className="input" />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select value={editing.category || 'Mirrors'} onChange={e => setEditing({...editing, category: e.target.value})} className="input">
                    <option>Mirrors</option>
                    <option>Glass Panels</option>
                    <option>Decorative</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editing.images || []).map((img, i) => (
                    <div key={i} className="relative w-16 h-16 border rounded overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5">×</button>
                    </div>
                  ))}
                </div>
                <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="text-sm" />
                {uploading && <p className="text-sm text-warm-gray">Uploading...</p>}
              </div>
              <div>
                <label className="label">Tokopedia URL</label>
                <input value={editing.tokopediaUrl || ''} onChange={e => setEditing({...editing, tokopediaUrl: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Shopee URL</label>
                <input value={editing.shopeeUrl || ''} onChange={e => setEditing({...editing, shopeeUrl: e.target.value})} className="input" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.isFeatured || false} onChange={e => setEditing({...editing, isFeatured: e.target.checked})} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.isAvailable !== false} onChange={e => setEditing({...editing, isAvailable: e.target.checked})} />
                  Available
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} className="btn-primary flex-1">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
