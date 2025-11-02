import { X, Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import './FavoritesModal.css'

export default function FavoritesModal({ onClose }) {
  const { favorites, removeFromFavorites } = useFavorites()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content favorites-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
          <div className="favorites-empty">
            <p>Please login to view your favorites</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content favorites-modal" onClick={(e) => e.stopPropagation()}>
        <div className="favorites-header">
          <h2>
            <Heart size={24} fill="#ef4444" style={{ marginRight: '8px' }} />
            Favorites
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="favorites-body">
          {favorites.length === 0 ? (
            <div className="favorites-empty">
              <Heart size={48} color="#94a3b8" />
              <p>No favorites yet</p>
              <p className="empty-subtitle">Start adding items you love!</p>
              <button onClick={onClose} className="btn-continue-shopping">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map((fav) => (
                <div key={fav.product._id} className="favorite-item">
                  <img
                    src={fav.product.images[0] || '/placeholder.jpg'}
                    alt={fav.product.name}
                    className="favorite-image"
                  />
                  <div className="favorite-info">
                    <h4>{fav.product.name}</h4>
                    <p className="favorite-price">${fav.product.price.toFixed(2)}</p>
                    <button
                      onClick={() => removeFromFavorites(fav.product._id)}
                      className="btn-remove-favorite"
                    >
                      <Heart size={16} fill="#ef4444" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

