import { ShoppingBag, ArrowDown } from 'lucide-react'
import './HeroSection.css'

export default function HeroSection({ onShopClick }) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left side - Text content */}
        <div className="hero-left">
          <div className="hero-badge">UNLEASH YOUR STYLE</div>
          <h1 className="hero-title">Find the Perfect Tee Today!</h1>
          <p className="hero-description">
            Discover our curated collection of premium t-shirts designed for comfort, style, and durability. 
            Whether you're looking for athletic wear or oversized comfort, we have something for everyone.
          </p>
          
          <div className="hero-categories">
            <div className="category-card">
              <div className="category-overlay"></div>
              <span className="category-hashtag">#Popular2024</span>
            </div>
            <div className="category-card">
              <div className="category-overlay"></div>
              <span className="category-hashtag">#BestForMen</span>
            </div>
          </div>
        </div>

        {/* Right side - Image with buttons */}
        <div className="hero-right">
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              {/* This would be an actual image in production */}
              <div className="hero-image-content">
                <div className="hero-buttons">
                  <button onClick={onShopClick} className="hero-btn shop-btn">
                    <ShoppingBag size={18} />
                    SHOP NOW!
                  </button>
                  <button className="hero-btn learn-btn">
                    LEARN MORE
                    <ArrowDown size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

