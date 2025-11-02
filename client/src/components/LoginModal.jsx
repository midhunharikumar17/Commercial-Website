import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './LoginModal.css'

export default function LoginModal({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      onClose()
    } else {
      setError(result.message || 'Login failed')
    }
    
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="modal-title">Login</h2>
        <p className="modal-subtitle">Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="link-button">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

