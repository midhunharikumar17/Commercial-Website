import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <HomePage />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

