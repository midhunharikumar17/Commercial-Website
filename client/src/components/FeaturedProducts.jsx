import { useState } from 'react'
import ProductCard from './ProductCard'
import './FeaturedProducts.css'

export default function FeaturedProducts({ products, onProductClick }) {
  if (!products || products.length === 0) {
    return (
      <section className="featured-products-section">
        <div className="featured-products-container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <a href="#shop" className="view-all-link">ALL PRODUCTS →</a>
          </div>
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            No products available at the moment.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="featured-products-section">
      <div className="featured-products-container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <a href="#shop" className="view-all-link">ALL PRODUCTS →</a>
        </div>
        
        <div className="products-grid">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onCardClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

