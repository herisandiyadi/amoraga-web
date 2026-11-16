'use client'
import { useState } from 'react'
import { adminFetch } from '@/lib/api'

export default function AdminSettings() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [status, setStatus] = useState('')

  const changePassword = async () => {
    if (form.newPassword !== form.confirm) {
      setStatus('Passwords do not match')
      return
    }
    if (form.newPassword.length < 6) {
      setStatus('Password must be at least 6 characters')
      return
    }
    try {
      const res = await adminFetch('/api/admin/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword })
      })
      if (res.error) {
        setStatus(res.error)
      } else {
        setStatus('Password changed successfully')
        setForm({ currentPassword: '', newPassword: '', confirm: '' })
      }
    } catch {
      setStatus('Failed to change password')
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Settings</h1>
      <div className="card max-w-md">
        <h2 className="font-display text-lg mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Current Password</label>
            <input type="password" value={form.currentPassword} onChange={e => setForm({...form, currentPassword: e.target.value})} className="input" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" value={form.newPassword} onChange={e => setForm({...form, newPassword: e.target.value})} className="input" />
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} className="input" />
          </div>
          {status && <p className={`text-sm ${status.includes('success') ? 'text-olive' : 'text-red-600'}`}>{status}</p>}
          <button onClick={changePassword} className="btn-primary w-full">Update Password</button>
        </div>
      </div>
    </div>
  )
}
