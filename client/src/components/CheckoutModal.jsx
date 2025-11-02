import { useState } from 'react'
import { X } from 'lucide-react'
import { paymentsAPI, ordersAPI } from '../services/api'
import './CheckoutModal.css'

export default function CheckoutModal({ isOpen, onClose, product, quantity = 1 }) {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || !product) return null

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Create payment intent
      const total = product.price * quantity
      const paymentResponse = await paymentsAPI.createIntent({ amount: total })
      
      // For demo purposes, we'll create the order directly
      // In production, you would integrate with Stripe Elements for card payment
      const orderResponse = await ordersAPI.create({
        items: [{ productId: product._id, quantity }],
        shippingInfo,
        paymentIntentId: paymentResponse.data.paymentIntentId,
      })

      onClose()
      alert('Order placed successfully! Payment will be processed.')
      // In production, redirect to payment page or show payment form
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment failed. Please try again.')
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-item">
            <span>{product.name} x {quantity}</span>
            <span>${(product.price * quantity).toFixed(2)}</span>
          </div>
          <div className="checkout-total">
            <span>Total:</span>
            <span>${(product.price * quantity).toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Information</h3>
          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            required
          />
          
          <div className="checkout-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingInfo.state}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="checkout-row">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={shippingInfo.zipCode}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleInputChange}
            required
          />

          {error && <div className="checkout-error">{error}</div>}

          <button type="submit" className="checkout-submit" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  )
}

