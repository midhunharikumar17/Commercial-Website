import { useState, useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './CartModal.css'

export default function CartModal({ onClose }) {
  const { cart, removeFromCart, updateCartItem, getCartTotal } = useCart()
  const { isAuthenticated } = useAuth()
  const [localCartItems, setLocalCartItems] = useState([])

  // For non-authenticated users, get products from localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]')
      // You'd need to fetch product details here if you want to show them
      // For now, we'll just show a message to login
      setLocalCartItems(localCart)
    }
  }, [isAuthenticated, cart])

  if (!isAuthenticated && localCartItems.length === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
          <div className="cart-empty">
            <p>Please login to view your cart</p>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#94a3b8' }}>
              Or add items and they'll be saved locally
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      await updateCartItem(productId, newQuantity)
    } else {
      await removeFromCart(productId)
    }
  }

  const total = getCartTotal()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cart.items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <button onClick={onClose} className="btn-continue-shopping">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="cart-item">
                    <img
                      src={item.product.images[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h4>{item.product.name}</h4>
                      <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.product._id, item.quantity, -1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.product._id, item.quantity, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="btn-remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${total.toFixed(2)}</span>
                </div>
                <button 
                  className="btn-checkout"
                  onClick={() => {
                    // TODO: Navigate to checkout page or open checkout modal
                    alert('Checkout functionality will be implemented')
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

