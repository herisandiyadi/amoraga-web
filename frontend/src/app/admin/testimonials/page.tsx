'use client'
import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/api'

export default function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)

  const load = async () => {
    try {
      const data = await adminFetch('/api/testimonials')
      setItems(data || [])
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing?.name || !editing?.content) return
    if (editing.id) {
      await adminFetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', body: JSON.stringify(editing) })
    } else {
      await adminFetch('/api/admin/testimonials', { method: 'POST', body: JSON.stringify(editing) })
    }
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await adminFetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Testimonials</h1>
        <button onClick={() => setEditing({ name: '', content: '', isVisible: true })} className="btn-primary">Add</button>
      </div>
      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-warm-gray mt-1">{t.content}</p>
              </div>
              <div className="flex gap-3 items-center ml-4">
                <span className={`text-xs ${t.isVisible ? 'text-olive' : 'text-warm-gray'}`}>
                  {t.isVisible ? 'Visible' : 'Hidden'}
                </span>
                <button onClick={() => setEditing(t)} className="text-olive text-sm">Edit</button>
                <button onClick={() => remove(t.id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-warm-gray py-12">No testimonials yet</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-lg">
            <h2 className="font-display text-xl mb-4">{editing.id ? 'Edit' : 'Add'} Testimonial</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Customer Name</label>
                <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Testimonial</label>
                <textarea value={editing.content} onChange={e => setEditing({...editing, content: e.target.value})} className="input min-h-[100px]" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.isVisible} onChange={e => setEditing({...editing, isVisible: e.target.checked})} />
                Visible on website
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={save} className="btn-primary flex-1">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
