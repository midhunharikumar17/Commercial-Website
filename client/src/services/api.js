import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
}

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBestSellers: () => api.get('/products/bestsellers'),
}

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (data) => api.put('/cart/update', data),
  remove: (data) => api.delete('/cart/remove', { data }),
}

// Favorites API
export const favoritesAPI = {
  get: () => api.get('/favorites'),
  add: (data) => api.post('/favorites/add', data),
  remove: (data) => api.delete('/favorites/remove', { data }),
}

// Orders API
export const ordersAPI = {
  get: () => api.get('/orders'),
  create: (data) => api.post('/orders/create', data),
}

// Reviews API
export const reviewsAPI = {
  get: (productId) => api.get(`/reviews/${productId}`),
  create: (data) => api.post('/reviews', data),
}

// Newsletter API
export const newsletterAPI = {
  subscribe: (data) => api.post('/newsletter/subscribe', data),
}

// Payments API
export const paymentsAPI = {
  createIntent: (data) => api.post('/payments/create-intent', data),
  confirm: (data) => api.post('/payments/confirm', data),
}

export default api

