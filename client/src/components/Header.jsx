import { useState } from 'react'
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import CartModal from './CartModal'
import FavoritesModal from './FavoritesModal'
import './Header.css'

export default function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showFavoritesModal, setShowFavoritesModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemCount } = useCart()
  const { favorites } = useFavorites()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery)
      }
    }
  }

  const handleLogout = () => {
    logout()
    setShowCartModal(false)
    setShowFavoritesModal(false)
  }

  // Close mobile menu when clicking outside
  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="modern-header">
        <div className="header-wrapper">
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="header-logo">
            <a href="/">LOOKSGOOD</a>
          </div>

          {/* Navigation */}
          <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} onClick={handleNavClick}>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#shop">Shop</a>
            <a href="#pages">Pages</a>
            <a href="#contact">Contact Us</a>
          </nav>
          
          {/* Mobile menu overlay */}
          {mobileMenuOpen && (
            <div 
              className="mobile-menu-overlay"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Right side actions */}
          <div className="header-actions">
            {/* Search */}
            <div className="search-container">
              {showSearch ? (
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                  <button type="submit" className="search-submit">
                    <Search size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false)
                      setSearchQuery('')
                    }}
                    className="search-close"
                  >
                    ×
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="action-icon"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Favorites */}
            <button
              onClick={() => setShowFavoritesModal(true)}
              className="action-icon favorites-icon"
              aria-label="Favorites"
            >
              <Heart size={20} fill={favorites.length > 0 ? '#ef4444' : 'none'} />
              {favorites.length > 0 && (
                <span className="action-badge">{favorites.length}</span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setShowCartModal(true)}
              className="action-icon cart-icon"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {getCartItemCount() > 0 && (
                <span className="action-badge">{getCartItemCount()}</span>
              )}
            </button>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button className="action-icon user-icon" aria-label="User">
                  <User size={20} />
                </button>
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user?.name || 'User'}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="btn-signup"
                >
                  SIGN UP
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-login"
                >
                  LOGIN
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false)
            setShowSignupModal(true)
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false)
            setShowLoginModal(true)
          }}
        />
      )}

      {showCartModal && (
        <CartModal onClose={() => setShowCartModal(false)} />
      )}

      {showFavoritesModal && (
        <FavoritesModal onClose={() => setShowFavoritesModal(false)} />
      )}
    </>
  )
}
