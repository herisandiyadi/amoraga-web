'use client'
import { useState, useEffect } from 'react'
import { adminFetch, adminUpload } from '@/lib/api'

interface Partner {
  name: string
  logo: string
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [status, setStatus] = useState('')
  const [uploading, setUploading] = useState<number | null>(null)

  useEffect(() => {
    adminFetch('/api/content/partners').then(res => {
      if (res?.value) setPartners(res.value)
    }).catch(() => {})
  }, [])

  const save = async () => {
    try {
      await adminFetch('/api/admin/content/partners', {
        method: 'PUT',
        body: JSON.stringify({ value: partners })
      })
      setStatus('Saved')
      setTimeout(() => setStatus(''), 2000)
    } catch {
      setStatus('Failed')
    }
  }

  const addPartner = () => {
    setPartners([...partners, { name: '', logo: '' }])
  }

  const removePartner = (idx: number) => {
    setPartners(partners.filter((_, i) => i !== idx))
  }

  const updatePartner = (idx: number, field: keyof Partner, value: string) => {
    const copy = [...partners]
    copy[idx] = { ...copy[idx], [field]: value }
    setPartners(copy)
  }

  const handleLogoUpload = async (idx: number, file: File) => {
    setUploading(idx)
    try {
      const res = await adminUpload(file)
      if (res.url) updatePartner(idx, 'logo', res.url)
    } catch (e) { console.error(e) }
    setUploading(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Our Partners</h1>
        <button onClick={save} className="btn-primary">
          {status === 'Saved' ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {partners.map((partner, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className="w-20 h-16 bg-cream rounded flex items-center justify-center overflow-hidden flex-shrink-0">
              {partner.logo ? (
                <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-xs text-warm-gray">No logo</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                value={partner.name}
                onChange={e => updatePartner(i, 'name', e.target.value)}
                placeholder="Partner name"
                className="input text-sm"
              />
              <div className="flex gap-2">
                <input
                  value={partner.logo}
                  onChange={e => updatePartner(i, 'logo', e.target.value)}
                  placeholder="Logo URL or /partners/filename.png"
                  className="input text-sm flex-1"
                />
                <label className="btn-secondary text-sm cursor-pointer whitespace-nowrap">
                  {uploading === i ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && handleLogoUpload(i, e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <button onClick={() => removePartner(i)} className="text-red-600 text-sm">Remove</button>
          </div>
        ))}
      </div>

      <button onClick={addPartner} className="btn-secondary">Add Partner</button>
    </div>
  )
}
