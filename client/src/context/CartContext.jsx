import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { cartAPI } from '../services/api'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    } else {
      // Load local cart for non-authenticated users
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]')
      if (localCart.length > 0) {
        setCart({ items: localCart.map(item => ({ 
          product: { _id: item.productId }, 
          quantity: item.quantity 
        })) })
      }
    }
  }, [isAuthenticated])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.get()
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (!isAuthenticated) {
        // Store in localStorage for non-authenticated users
        const localCart = JSON.parse(localStorage.getItem('localCart') || '[]')
        const existingItemIndex = localCart.findIndex(item => item.productId === productId)
        
        if (existingItemIndex > -1) {
          localCart[existingItemIndex].quantity += quantity
        } else {
          localCart.push({ productId, quantity })
        }
        
        localStorage.setItem('localCart', JSON.stringify(localCart))
        
        // Update cart state with local items
        const updatedCart = { items: localCart.map(item => ({ 
          product: { _id: item.productId }, 
          quantity: item.quantity 
        })) }
        setCart(updatedCart)
        
        return { success: true, message: 'Added to cart! Please login to sync with your account.' }
      }

      const response = await cartAPI.add({ productId, quantity })
      setCart(response.data)
      return { success: true, message: 'Added to cart!' }
    } catch (error) {
      console.error('Cart error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add to cart'
      return {
        success: false,
        message: errorMessage,
      }
    }
  }

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await cartAPI.update({ productId, quantity })
      setCart(response.data)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update cart',
      }
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await cartAPI.remove({ productId })
      setCart(response.data)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove from cart',
      }
    }
  }

  const getCartItemCount = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      // Check localStorage for non-authenticated users
      if (!isAuthenticated) {
        const localCart = JSON.parse(localStorage.getItem('localCart') || '[]')
        return localCart.reduce((total, item) => total + (item.quantity || 1), 0)
      }
      return 0
    }
    return cart.items.reduce((total, item) => total + (item.quantity || 1), 0)
  }

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity
      }
      return total
    }, 0)
  }

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartItemCount,
    getCartTotal,
    fetchCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

