import './AboutSection.css'

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-left">
          <div className="about-image-placeholder">
            {/* Placeholder for image */}
          </div>
        </div>

        <div className="about-right">
          <div className="about-badge">ABOUT LOOKSGOOD</div>
          <h2 className="about-title">Where Fashion Meets Passion</h2>
          <p className="about-description">
            We are dedicated to providing high-quality clothing that combines style, comfort, and sustainability. 
            Our mission is to help you express your unique personality through fashion.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Shirts Sold</div>
            </div>
          </div>

          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">⚙️</div>
              <h4>Quality Focused</h4>
              <p>Elementum venenatis ornare. Sollicitudin mauris.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h4>Creative Designs</h4>
              <p>Elementum venenatis ornare. Sollicitudin mauris.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌍</div>
              <h4>Global Reach</h4>
              <p>Elementum venenatis ornare. Sollicitudin mauris.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

