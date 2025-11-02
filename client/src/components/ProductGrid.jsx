import ProductCard from './ProductCard'
import './ProductGrid.css'

export default function ProductGrid({ products, title, onProductClick }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="product-grid-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onCardClick={onProductClick}
          />
        ))}
      </div>
    </section>
  )
}

