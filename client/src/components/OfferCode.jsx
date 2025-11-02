import { useState } from 'react'
import './OfferCode.css'

export default function OfferCode() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleApply = () => {
    // In a real app, this would validate with the backend
    if (code.toUpperCase() === 'SAVE20') {
      setMessage('Coupon applied! 20% discount will be applied at checkout.')
    } else if (code) {
      setMessage('Invalid coupon code. Please try again.')
    } else {
      setMessage('Please enter a coupon code.')
    }
  }

  return (
    <section className="offer-code-section">
      <div className="offer-code-container">
        <h3>Have a Coupon Code?</h3>
        <div className="offer-code-input-group">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="offer-code-input"
          />
          <button onClick={handleApply} className="offer-code-button">
            Apply
          </button>
        </div>
        {message && <p className="offer-code-message">{message}</p>}
      </div>
    </section>
  )
}

