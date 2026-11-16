'use client'
import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/api'

const sections = [
  { key: 'hero_banners', label: 'Hero Banner', fields: ['title', 'subtitle', 'image', 'ctaText', 'ctaLink'] },
  { key: 'about_content', label: 'About Page', fields: ['title', 'body'] },
  { key: 'contact_info', label: 'Contact Info', fields: ['address', 'phone', 'whatsapp', 'email'] },
  { key: 'social_links', label: 'Social Links', fields: ['instagram', 'facebook', 'tiktok'] },
]

export default function AdminContent() {
  const [data, setData] = useState<Record<string, any>>({})
  const [saved, setSaved] = useState('')

  useEffect(() => {
    sections.forEach(async (s) => {
      try {
        const res = await adminFetch(`/api/content/${s.key}`)
        setData(prev => ({ ...prev, [s.key]: res?.value || (s.key === 'hero_banners' ? [{}] : {}) }))
      } catch {
        setData(prev => ({ ...prev, [s.key]: s.key === 'hero_banners' ? [{}] : {} }))
      }
    })
  }, [])

  const save = async (key: string) => {
    try {
      await adminFetch(`/api/admin/content/${key}`, {
        method: 'PUT', body: JSON.stringify({ value: data[key] })
      })
      setSaved(key)
      setTimeout(() => setSaved(''), 2000)
    } catch (e) { console.error(e) }
  }

  const updateField = (key: string, field: string, value: any, idx = 0) => {
    setData(prev => {
      if (key === 'hero_banners') {
        const arr = [...(prev[key] || [{}])]
        arr[idx] = { ...arr[idx], [field]: value }
        return { ...prev, [key]: arr }
      }
      return { ...prev, [key]: { ...(prev[key] || {}), [field]: value } }
    })
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Content Management</h1>
      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.key} className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg">{section.label}</h2>
              <button onClick={() => save(section.key)} className="btn-primary text-sm">
                {saved === section.key ? 'Saved' : 'Save'}
              </button>
            </div>
            {section.key === 'hero_banners' ? (
              (data[section.key] || [{}]).map((banner: any, i: number) => (
                <div key={i} className="space-y-3">
                  {section.fields.map(field => (
                    <div key={field}>
                      <label className="label capitalize">{field}</label>
                      <input
                        value={banner[field] || ''}
                        onChange={e => updateField(section.key, field, e.target.value, i)}
                        className="input"
                      />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="space-y-3">
                {section.fields.map(field => (
                  <div key={field}>
                    <label className="label capitalize">{field}</label>
                    {field === 'body' ? (
                      <textarea
                        value={(data[section.key] || {})[field] || ''}
                        onChange={e => updateField(section.key, field, e.target.value)}
                        className="input min-h-[120px]"
                      />
                    ) : (
                      <input
                        value={(data[section.key] || {})[field] || ''}
                        onChange={e => updateField(section.key, field, e.target.value)}
                        className="input"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
