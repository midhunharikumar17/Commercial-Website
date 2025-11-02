# MERN Clothing E-commerce Website

A full-stack e-commerce clothing website built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Responsive Design**: Works seamlessly on both mobile and desktop devices
- **Sticky Header**: Navigation header that stays fixed at the top
- **Product Catalog**: Browse clothing items with pricing and details
- **Product Details Modal**: View full product details with images
- **Shopping Cart**: Add items to cart and manage quantities
- **Favorites**: Save favorite products
- **Payment Integration**: Stripe payment processing (configure your keys)
- **Best Sellers**: Featured products section
- **Customer Reviews**: Reviews and ratings display
- **Newsletter Signup**: Email subscription functionality
- **Offer Codes**: Discount coupon code system

## Tech Stack

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe
- **Icons**: Lucide React

## Installation

1. **Clone the repository**
   ```bash
   cd clothing
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clothing-store
   JWT_SECRET=your-secret-key-change-in-production
   STRIPE_SECRET_KEY=your-stripe-secret-key
   NODE_ENV=development
   ```

   Create a `.env` file in the `client` directory (optional):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**

   To run both server and client concurrently:
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
clothing/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context providers
│   │   └── services/    # API service functions
│   └── package.json
├── server/              # Node.js backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   └── package.json
└── package.json         # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with pagination, filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/bestsellers` - Get best selling products

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update` - Update cart item (protected)
- `DELETE /api/cart/remove` - Remove item from cart (protected)

### Orders
- `GET /api/orders` - Get user's orders (protected)
- `POST /api/orders/create` - Create new order (protected)

### Favorites
- `GET /api/favorites` - Get user's favorites (protected)
- `POST /api/favorites/add` - Add to favorites (protected)
- `DELETE /api/favorites/remove` - Remove from favorites (protected)

### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Create review (protected)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Payments
- `POST /api/payments/create-intent` - Create payment intent (protected)
- `POST /api/payments/confirm` - Confirm payment (protected)

## Development

### Adding Products

Products can be added to the database using MongoDB or through the API (admin route can be added).

Example product structure:
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "images": ["image-url-1", "image-url-2"],
  "category": "Tops",
  "stock": 50,
  "bestSeller": false
}
```

## Notes

- Make sure MongoDB is installed and running
- Update Stripe keys in environment variables for payment functionality
- The app uses mock data as fallback if the API is unavailable
- All authentication-protected routes require a valid JWT token in the Authorization header

## License

ISC

