'use client'
import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/api'

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  const load = async () => {
    try {
      const data = await adminFetch('/api/admin/inquiries')
      setInquiries(data || [])
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await adminFetch(`/api/admin/inquiries/${id}`, {
      method: 'PUT', body: JSON.stringify({ isRead: true })
    })
    load()
  }

  const markReplied = async (id: string) => {
    await adminFetch(`/api/admin/inquiries/${id}`, {
      method: 'PUT', body: JSON.stringify({ isReplied: true })
    })
    load()
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Inquiries</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {inquiries.map(inq => (
            <div
              key={inq.id}
              onClick={() => { setSelected(inq); if (!inq.isRead) markRead(inq.id) }}
              className={`card cursor-pointer ${selected?.id === inq.id ? 'border-olive' : ''} ${!inq.isRead ? 'bg-cream' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{inq.name}</p>
                  <p className="text-sm text-warm-gray">{inq.contact}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-warm-gray uppercase">{inq.source}</span>
                  {!inq.isRead && <span className="w-2 h-2 bg-olive rounded-full"></span>}
                  {inq.isReplied && <span className="text-xs text-olive">✓</span>}
                </div>
              </div>
              <p className="text-sm text-warm-gray truncate">{inq.message}</p>
              <p className="text-xs text-warm-gray mt-2">{new Date(inq.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {inquiries.length === 0 && <p className="text-center text-warm-gray py-12">No inquiries yet</p>}
        </div>

        {selected && (
          <div className="card sticky top-6">
            <h2 className="font-display text-xl mb-2">{selected.name}</h2>
            <p className="text-sm text-warm-gray mb-4">{selected.contact}</p>
            <div className="border-t border-border-light pt-4 mb-4">
              <pre className="whitespace-pre-wrap text-sm text-charcoal font-body">{selected.message}</pre>
            </div>
            <div className="flex gap-3">
              {!selected.isReplied && (
                <button onClick={() => markReplied(selected.id)} className="btn-primary flex-1 text-sm">
                  Mark as Replied
                </button>
              )}
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1 text-sm">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
