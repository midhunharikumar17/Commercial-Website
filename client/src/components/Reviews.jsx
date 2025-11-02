import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import './Reviews.css'

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([])

  // Mock reviews for now - in production, fetch from API
  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        user: { name: 'John Doe' },
        rating: 5,
        comment: 'Great quality and fast shipping! Very satisfied with my purchase.',
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 2,
        user: { name: 'Jane Smith' },
        rating: 4,
        comment: 'Nice product, fits perfectly. Would recommend!',
        createdAt: new Date('2024-01-10'),
      },
      {
        id: 3,
        user: { name: 'Mike Johnson' },
        rating: 5,
        comment: 'Excellent quality and great customer service.',
        createdAt: new Date('2024-01-05'),
      },
    ]
    setReviews(mockReviews)
  }, [productId])

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-user">{review.user.name}</div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? '#fbbf24' : '#e5e7eb'}
                      color={i < review.rating ? '#fbbf24' : '#e5e7eb'}
                    />
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

