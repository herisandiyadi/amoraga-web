'use client'
import { useState, useRef, useEffect } from 'react'
import { chatbotMessage, submitInquiry } from '@/lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you with our mirror and glass products today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [quoteData, setQuoteData] = useState({ name: '', contact: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await chatbotMessage({ message: userMessage, history })
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply || res.message || 'Sorry, I could not process that.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setIsLoading(false)
  }

  const handleQuoteSubmit = async () => {
    if (!quoteData.name || !quoteData.contact) return
    setIsLoading(true)
    try {
      const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n')
      await submitInquiry({
        source: 'chatbot',
        name: quoteData.name,
        contact: quoteData.contact,
        message: conversationText
      })
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Thank you, ${quoteData.name}! We have received your inquiry and will contact you at ${quoteData.contact} shortly.` 
      }])
      setShowQuoteForm(false)
      setQuoteData({ name: '', contact: '' })
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, could not submit your request. Please try again.' }])
    }
    setIsLoading(false)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-olive text-white rounded-full shadow-lg hover:bg-olive-dark transition-colors flex items-center justify-center z-50"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-surface border border-border-light rounded-lg shadow-xl z-50 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-olive text-white px-4 py-3 rounded-t-lg">
            <h3 className="font-medium">Chat with Us</h3>
            <p className="text-xs opacity-80">We typically reply within minutes</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-olive text-white' 
                    : 'bg-cream text-charcoal'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-cream px-3 py-2 rounded-lg text-sm text-warm-gray">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quote Form */}
          {showQuoteForm ? (
            <div className="border-t border-border-light p-4 space-y-3">
              <p className="text-sm text-warm-gray">Enter your details for a quote:</p>
              <input
                type="text"
                placeholder="Your name"
                value={quoteData.name}
                onChange={e => setQuoteData(p => ({ ...p, name: e.target.value }))}
                className="input text-sm"
              />
              <input
                type="text"
                placeholder="Phone or WhatsApp"
                value={quoteData.contact}
                onChange={e => setQuoteData(p => ({ ...p, contact: e.target.value }))}
                className="input text-sm"
              />
              <div className="flex gap-2">
                <button onClick={() => setShowQuoteForm(false)} className="btn-secondary text-sm flex-1">
                  Cancel
                </button>
                <button onClick={handleQuoteSubmit} className="btn-primary text-sm flex-1" disabled={isLoading}>
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Input */}
              <div className="border-t border-border-light p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="input text-sm"
                    disabled={isLoading}
                  />
                  <button onClick={sendMessage} className="btn-primary px-4" disabled={isLoading}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={() => setShowQuoteForm(true)} 
                  className="w-full mt-2 text-sm text-olive hover:underline"
                >
                  Request a Quote
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
