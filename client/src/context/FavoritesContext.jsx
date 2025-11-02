import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { favoritesAPI } from '../services/api'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites()
    }
  }, [isAuthenticated])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const response = await favoritesAPI.get()
      setFavorites(response.data)
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToFavorites = async (productId) => {
    try {
      const response = await favoritesAPI.add({ productId })
      setFavorites([...favorites, response.data])
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to favorites',
      }
    }
  }

  const removeFromFavorites = async (productId) => {
    try {
      await favoritesAPI.remove({ productId })
      setFavorites(favorites.filter((fav) => fav.product._id !== productId))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove from favorites',
      }
    }
  }

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.product._id === productId)
  }

  const toggleFavorite = async (productId) => {
    if (isFavorite(productId)) {
      return await removeFromFavorites(productId)
    } else {
      return await addToFavorites(productId)
    }
  }

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    fetchFavorites,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

