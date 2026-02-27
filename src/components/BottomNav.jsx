import { useLocation, Link } from 'react-router-dom'
import { Home, LayoutGrid, Heart, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../CartContext'
import { useFavorites } from '../FavoritesContext'

const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/categories', icon: LayoutGrid, label: 'Categories' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
    const location = useLocation()
    const { cartCount } = useCart()
    const { favCount } = useFavorites()

    // Hide bottom nav on product detail and checkout
    const hiddenPaths = ['/checkout']
    const isProductPage = location.pathname.startsWith('/product/')
    if (hiddenPaths.includes(location.pathname) || isProductPage) return null

    return (
        <nav
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 glass-dark border-t pb-[env(safe-area-inset-bottom)]"
            style={{ borderColor: 'var(--nav-border)' }}
        >
            <div className="flex items-center justify-around h-16">
                {tabs.map(({ path, icon: Icon, label }) => {
                    const isActive =
                        path === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(path)

                    const badge =
                        label === 'Cart' ? cartCount : label === 'Favorites' ? favCount : 0

                    return (
                        <Link
                            key={path}
                            to={path}
                            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all relative"
                            style={{
                                color: isActive ? 'var(--nav-active)' : 'var(--text-muted)',
                            }}
                        >
                            <div className="relative">
                                <Icon
                                    size={22}
                                    strokeWidth={isActive ? 2.2 : 1.6}
                                    fill={isActive && label === 'Favorites' ? 'currentColor' : 'none'}
                                />
                                {badge > 0 && (
                                    <span
                                        className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-[16px] rounded-full text-white text-[9px] font-bold leading-none px-1 animate-scale-in"
                                        style={{ background: 'var(--gradient-primary)' }}
                                    >
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <span
                                className={`text-[10px] leading-tight ${isActive ? 'font-semibold' : 'font-medium'}`}
                            >
                                {label}
                            </span>
                            {isActive && (
                                <div
                                    className="absolute -bottom-0 w-5 h-0.5 rounded-full active-dot"
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
