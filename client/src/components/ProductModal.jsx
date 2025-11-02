import { useState } from 'react'
import { X, Heart, ShoppingCart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { paymentsAPI, ordersAPI } from '../services/api'
import './ProductModal.css'

export default function ProductModal({ product, isOpen, onClose, onBuyNow }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!isOpen || !product) return null

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity)
    if (result.success) {
      // Show success feedback
      const message = result.message || 'Added to cart!'
      alert(message)
    } else {
      alert(result.message || 'Failed to add to cart. Please try again.')
    }
  }

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      alert('Please login to purchase')
      return
    }

    if (onBuyNow) {
      onBuyNow(product, quantity)
    }
  }

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return
    }

    await toggleFavorite(product._id)
  }

  const isFav = isFavorite(product._id)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-images">
            <div className="main-image">
              <img
                src={product.images?.[selectedImage] || 'https://via.placeholder.com/800?text=No+Image'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800?text=Image+Not+Found'
                }}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200?text=Image+Not+Found'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-price">${product.price?.toFixed(2) || '0.00'}</p>
            <p className="modal-description">{product.description}</p>
            <p className="modal-category">Category: {product.category}</p>
            <p className="modal-stock">
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-favorite"
                onClick={handleToggleFavorite}
                aria-label="Add to favorites"
              >
                <Heart size={20} fill={isFav ? '#ff0000' : 'none'} />
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button
                className="btn-add-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                className="btn-buy-now"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

