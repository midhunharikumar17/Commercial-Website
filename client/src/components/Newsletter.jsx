import { useState } from 'react'
import { newsletterAPI } from '../services/api'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      await newsletterAPI.subscribe({ email })
      setMessage('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2>Join Our Newsletter</h2>
        <p>Subscribe to get special offers, new product announcements, and exclusive deals</p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
            disabled={loading}
          />
          <button type="submit" className="newsletter-button" disabled={loading}>
            {loading ? 'Joining...' : 'Join the Club'}
          </button>
        </form>
        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </section>
  )
}

