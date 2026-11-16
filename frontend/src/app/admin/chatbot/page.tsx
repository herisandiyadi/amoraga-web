'use client'
import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/api'

export default function AdminChatbot() {
  const [config, setConfig] = useState({ baseUrl: '', apiKey: '', model: 'gpt-4o-mini' })
  const [status, setStatus] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState('')

  useEffect(() => {
    adminFetch('/api/content/chatbot_config').then(res => {
      if (res?.value) {
        setConfig({
          baseUrl: res.value.baseUrl || '',
          apiKey: res.value.apiKey || '',
          model: res.value.model || 'gpt-4o-mini'
        })
      }
    }).catch(() => {})
  }, [])

  const save = async () => {
    try {
      await adminFetch('/api/admin/content/chatbot_config', {
        method: 'PUT',
        body: JSON.stringify({ value: config })
      })
      setStatus('Saved')
      setTimeout(() => setStatus(''), 2000)
    } catch {
      setStatus('Failed to save')
    }
  }

  const testConnection = async () => {
    setTesting(true)
    setTestResult('')
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello, this is a test message.' })
      })
      const data = await res.json()
      setTestResult(data.reply || data.error || 'No response')
    } catch (e) {
      setTestResult('Connection failed')
    }
    setTesting(false)
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Chatbot Settings</h1>
      
      <div className="card max-w-lg">
        <h2 className="font-display text-lg mb-4">AI Configuration</h2>
        <p className="text-sm text-warm-gray mb-6">
          Configure the AI provider for the chatbot. Leave API Key empty to use FAQ-only mode.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="label">Base URL</label>
            <input
              value={config.baseUrl}
              onChange={e => setConfig({...config, baseUrl: e.target.value})}
              placeholder="https://api.openai.com/v1"
              className="input"
            />
            <p className="text-xs text-warm-gray mt-1">Default: https://api.openai.com/v1</p>
          </div>
          
          <div>
            <label className="label">API Key</label>
            <input
              type="password"
              value={config.apiKey}
              onChange={e => setConfig({...config, apiKey: e.target.value})}
              placeholder="sk-..."
              className="input"
            />
          </div>
          
          <div>
            <label className="label">Model</label>
            <input
              value={config.model}
              onChange={e => setConfig({...config, model: e.target.value})}
              placeholder="gpt-4o-mini"
              className="input"
            />
            <p className="text-xs text-warm-gray mt-1">Examples: gpt-4o-mini, gpt-4o, gpt-3.5-turbo</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={save} className="btn-primary flex-1">
            {status === 'Saved' ? 'Saved' : 'Save Configuration'}
          </button>
          <button onClick={testConnection} className="btn-secondary flex-1" disabled={testing}>
            {testing ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        {testResult && (
          <div className="mt-4 p-3 bg-cream rounded text-sm">
            <p className="font-medium mb-1">Test Result:</p>
            <p className="text-warm-gray">{testResult}</p>
          </div>
        )}
      </div>
    </div>
  )
}
