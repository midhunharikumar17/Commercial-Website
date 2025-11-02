import { useState, useEffect } from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import AboutSection from '../components/AboutSection'
import BestSellers from '../components/BestSellers'
import AboutUs from '../components/AboutUs'
import OfferCode from '../components/OfferCode'
import PromoBanner from '../components/PromoBanner'
import Reviews from '../components/Reviews'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import ProductModal from '../components/ProductModal'
import CheckoutModal from '../components/CheckoutModal'
import { productsAPI } from '../services/api'
import './HomePage.css'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [checkoutProduct, setCheckoutProduct] = useState(null)
  const [checkoutQuantity, setCheckoutQuantity] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchQuery, products])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getAll({ limit: 20 })
      const fetchedProducts = response.data.products || []
      // If API returns products, use them; otherwise use mock data
      if (fetchedProducts.length > 0) {
        setProducts(fetchedProducts)
        setFilteredProducts(fetchedProducts)
      } else {
        // Use mock data if API returns empty or fails
        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Use mock data if API fails
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleBuyNow = (product, quantity) => {
    setCheckoutProduct(product)
    setCheckoutQuantity(quantity)
    setIsProductModalOpen(false)
    setIsCheckoutModalOpen(true)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Scroll to products section
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleShopClick = () => {
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="homepage">
      <Header onSearch={handleSearch} />
      <HeroSection onShopClick={handleShopClick} />
      
      <div id="products-section">
        <FeaturedProducts
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      </div>

      <BestSellers onProductClick={handleProductClick} />

      <AboutSection />

      <AboutUs />

      <OfferCode />

      <PromoBanner />

      <Reviews />

      <Newsletter />

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false)
            setSelectedProduct(null)
          }}
          onBuyNow={handleBuyNow}
        />
      )}

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          quantity={checkoutQuantity}
          isOpen={isCheckoutModalOpen}
          onClose={() => {
            setIsCheckoutModalOpen(false)
            setCheckoutProduct(null)
          }}
        />
      )}
    </div>
  )
}

// Mock data fallback with real clothing images
const mockProducts = [
  {
    _id: '1',
    name: 'Modern Twist',
    description: 'Stylish t-shirt with modern design. Made from premium cotton blend for ultimate comfort and style.',
    price: 25,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 50,
    bestSeller: true,
  },
  {
    _id: '2',
    name: 'Urban Jungle',
    description: 'Comfortable urban style t-shirt perfect for everyday wear. Features a relaxed fit and soft fabric.',
    price: 25,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 30,
    bestSeller: true,
  },
  {
    _id: '3',
    name: 'Endless Summer',
    description: 'Vibrant summer collection t-shirt with colorful patterns. Lightweight and breathable material.',
    price: 25,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 25,
    bestSeller: false,
  },
  {
    _id: '4',
    name: 'Ocean Dream',
    description: 'Cool ocean-themed design t-shirt. Perfect for beach days or casual outings. Soft cotton blend.',
    price: 25,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 40,
    bestSeller: true,
  },
  {
    _id: '5',
    name: 'Classic White',
    description: 'Timeless white t-shirt that goes with everything. Essential wardrobe piece made from premium cotton.',
    price: 20,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 60,
    bestSeller: false,
  },
  {
    _id: '6',
    name: 'Bold Black',
    description: 'Essential black t-shirt for any occasion. Versatile and stylish with a comfortable fit.',
    price: 20,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 55,
    bestSeller: false,
  },
  {
    _id: '7',
    name: 'Athletic Tee',
    description: 'Performance t-shirt designed for active lifestyles. Moisture-wicking fabric keeps you cool and dry.',
    price: 30,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop'
    ],
    category: 'Athletic',
    stock: 35,
    bestSeller: true,
  },
  {
    _id: '8',
    name: 'Oversized Comfort',
    description: 'Relaxed fit oversized t-shirt for maximum comfort. Perfect for lounging or casual days.',
    price: 28,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 45,
    bestSeller: false,
  },
  {
    _id: '9',
    name: 'Street Style',
    description: 'Edgy street style t-shirt with unique graphics. Stand out from the crowd with this bold design.',
    price: 32,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
    ],
    category: 'Streetwear',
    stock: 28,
    bestSeller: true,
  },
  {
    _id: '10',
    name: 'Minimalist Grey',
    description: 'Clean and simple grey t-shirt with minimalist aesthetic. Perfect for those who prefer understated style.',
    price: 22,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop'
    ],
    category: 'Tops',
    stock: 50,
    bestSeller: false,
  },
]
