'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin, setToken } from '@/lib/api'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminLogin(form.username, form.password)
      if (res.token) {
        setToken(res.token)
        router.push('/admin')
      } else {
        setError(res.error || 'Invalid credentials')
      }
    } catch {
      setError('Login failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-surface border border-border-light rounded-lg p-8 w-full max-w-sm">
        <h1 className="font-display text-2xl text-center mb-2">Admin Login</h1>
        <p className="text-sm text-warm-gray text-center mb-6">Amoraga Creative</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="input"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
