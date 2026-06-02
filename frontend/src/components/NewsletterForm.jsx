import { useState } from 'react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterForm({ idPrefix = 'newsletter' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Subscription failed. Please try again.')
        return
      }

      setMessage(data.message)
      setEmail('')
      setName('')
    } catch {
      setError('Unable to connect to the server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor={`${idPrefix}-name`}>Name (optional)</label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
      </div>
      <div className="form-group">
        <label htmlFor={`${idPrefix}-email`}>Email Address</label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <button type="submit" className="btn btn-gold" disabled={loading}>
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <p className="alert error">{error}</p>}
      {message && <p className="alert success">{message}</p>}
    </form>
  )
}
