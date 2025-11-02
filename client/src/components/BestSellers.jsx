import { useEffect, useState } from 'react'
import ProductGrid from './ProductGrid'
import { productsAPI } from '../services/api'
import './BestSellers.css'

export default function BestSellers({ onProductClick }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBestSellers()
  }, [])

  const fetchBestSellers = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getBestSellers()
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching best sellers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="best-sellers-section">
        <h2 className="section-title">Best Sellers</h2>
        <div className="loading">Loading...</div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="best-sellers-section">
      <ProductGrid
        products={products}
        title="Best Sellers"
        onProductClick={onProductClick}
      />
    </section>
  )
}

