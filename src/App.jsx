import { HashRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './CartContext'
import { FavoritesProvider } from './FavoritesContext'
import { ThemeProvider } from './ThemeContext'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import Categories from './pages/Categories'
import Profile from './pages/Profile'

export default function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <FavoritesProvider>
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                        <BottomNav />
                    </HashRouter>
                </FavoritesProvider>
            </CartProvider>
        </ThemeProvider>
    )
}
