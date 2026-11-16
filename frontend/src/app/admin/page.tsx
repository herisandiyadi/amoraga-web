'use client'
import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, unread: 0 })

  useEffect(() => {
    async function load() {
      try {
        const products = await adminFetch('/api/admin/products')
        const inquiries = await adminFetch('/api/admin/inquiries')
        setStats({
          products: products?.length || 0,
          inquiries: inquiries?.length || 0,
          unread: inquiries?.filter((i: any) => !i.isRead)?.length || 0
        })
      } catch (e) {
        console.error('Failed to load stats:', e)
      }
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>
      
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-warm-gray mb-1">Total Products</p>
          <p className="font-display text-3xl">{stats.products}</p>
        </div>
        <div className="card">
          <p className="text-sm text-warm-gray mb-1">Total Inquiries</p>
          <p className="font-display text-3xl">{stats.inquiries}</p>
        </div>
        <div className="card">
          <p className="text-sm text-warm-gray mb-1">Unread Inquiries</p>
          <p className="font-display text-3xl text-olive">{stats.unread}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/admin/products" className="btn-primary">Manage Products</a>
          <a href="/admin/inquiries" className="btn-secondary">View Inquiries</a>
        </div>
      </div>
    </div>
  )
}
