'use client'
import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/api'

export default function AdminFaq() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)

  const load = async () => {
    try {
      const data = await adminFetch('/api/admin/faq')
      setItems(data || [])
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing?.question || !editing?.answer) return
    if (editing.id) {
      await adminFetch(`/api/admin/faq/${editing.id}`, { method: 'PUT', body: JSON.stringify(editing) })
    } else {
      await adminFetch('/api/admin/faq', { method: 'POST', body: JSON.stringify(editing) })
    }
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    await adminFetch(`/api/admin/faq/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Chatbot FAQ</h1>
        <button onClick={() => setEditing({ question: '', answer: '', priority: 0 })} className="btn-primary">Add FAQ</button>
      </div>
      <p className="text-warm-gray mb-6 text-sm">The chatbot matches customer questions against these entries before using AI.</p>
      <div className="space-y-3">
        {items.map(f => (
          <div key={f.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{f.question}</p>
                <p className="text-sm text-warm-gray mt-1">{f.answer}</p>
              </div>
              <div className="flex gap-3 items-center ml-4">
                <span className="text-xs text-warm-gray">Priority {f.priority}</span>
                <button onClick={() => setEditing(f)} className="text-olive text-sm">Edit</button>
                <button onClick={() => remove(f.id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-warm-gray py-12">No FAQ entries yet</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-lg">
            <h2 className="font-display text-xl mb-4">{editing.id ? 'Edit' : 'Add'} FAQ</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Question</label>
                <input value={editing.question} onChange={e => setEditing({...editing, question: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Answer</label>
                <textarea value={editing.answer} onChange={e => setEditing({...editing, answer: e.target.value})} className="input min-h-[100px]" />
              </div>
              <div>
                <label className="label">Priority (higher matches first)</label>
                <input type="number" value={editing.priority} onChange={e => setEditing({...editing, priority: +e.target.value})} className="input" />
              </div>
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
