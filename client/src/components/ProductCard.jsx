import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './ProductCard.css'

export default function ProductCard({ product, onCardClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    const result = await addToCart(product._id, 1)
    if (result.success) {
      // Show success feedback with a visual indicator
      const button = e.target
      const originalText = button.textContent
      button.textContent = '✓ ADDED!'
      button.style.background = '#10b981'
      setTimeout(() => {
        button.textContent = originalText
        button.style.background = ''
      }, 2000)
    } else {
      alert(result.message || 'Failed to add to cart. Please try again.')
    }
  }

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="product-image-container"
        onClick={() => onCardClick(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onCardClick(product)
          }
        }}
      >
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.name}
          className={`product-image ${isHovered ? 'hovered' : ''}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found'
          }}
        />
      </div>
      <div className="product-info">
        <h3 
          className="product-name" 
          onClick={() => onCardClick(product)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onCardClick(product)
            }
          }}
        >
          {product.name}
        </h3>
        <p className="product-price">${product.price?.toFixed(2) || '0.00'}</p>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

