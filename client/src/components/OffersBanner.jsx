import { useState, useEffect } from 'react'
import './OffersBanner.css'

export default function OffersBanner() {
  const offers = [
    { id: 1, text: 'Free Shipping on Orders Over $50', discount: '20% OFF' },
    { id: 2, text: 'New Season Collection - Up to 40% Off', discount: '40% OFF' },
    { id: 3, text: 'Buy 2 Get 1 Free on Selected Items', discount: 'BOGO' },
  ]

  const [currentOffer, setCurrentOffer] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="offers-banner">
      <div className="offers-container">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`offer-item ${index === currentOffer ? 'active' : ''}`}
          >
            <span className="offer-discount">{offer.discount}</span>
            <span className="offer-text">{offer.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

