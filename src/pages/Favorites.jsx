import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import phones from '../data'
import { useFavorites } from '../FavoritesContext'
import { useCart } from '../CartContext'
import Navbar from '../components/Navbar'

export default function Favorites() {
    const { favorites, toggleFavorite } = useFavorites()
    const { addToCart } = useCart()

    const favoritePhones = phones.filter((p) => favorites.includes(p.id))

    return (
        <div className="pb-24 animate-fade-in min-h-screen">
            <Navbar />
            <div className="h-14" />

            <div className="px-4 pt-4 pb-3">
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Favorites</h1>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {favoritePhones.length} item{favoritePhones.length !== 1 ? 's' : ''} saved
                </p>
            </div>

            {favoritePhones.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 pt-20 animate-scale-in">
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                    >
                        <Heart size={40} strokeWidth={1.3} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>No favorites yet</h2>
                    <p className="text-sm text-center mb-6" style={{ color: 'var(--text-muted)' }}>
                        Tap the heart icon on any product<br />to save it here.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-2.5 rounded-full text-white text-sm font-semibold active:scale-95 transition-all btn-gradient"
                    >
                        Browse Phones
                    </Link>
                </div>
            ) : (
                <div className="px-4 space-y-3">
                    {favoritePhones.map((phone, i) => (
                        <div
                            key={phone.id}
                            className="flex gap-3 rounded-2xl p-3 animate-slide-up dark-card"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <Link
                                to={`/product/${phone.id}`}
                                className="w-24 h-24 flex-shrink-0 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--bg-surface)' }}
                            >
                                <img
                                    src={phone.image}
                                    alt={phone.name}
                                    className="w-20 h-20 object-contain"
                                />
                            </Link>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                                    {phone.brand}
                                </p>
                                <Link to={`/product/${phone.id}`}>
                                    <h3 className="text-sm font-semibold leading-snug truncate" style={{ color: 'var(--text-primary)' }}>
                                        {phone.name}
                                    </h3>
                                </Link>
                                <p className="text-[15px] font-bold mt-1 gradient-text">
                                    ${phone.price.toLocaleString()}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() =>
                                            addToCart(phone, phone.storageOptions[0], phone.colors[0])
                                        }
                                        className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold active:scale-95 transition-all btn-gradient"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => toggleFavorite(phone.id)}
                                        className="p-1.5 rounded-lg transition-colors"
                                        style={{ color: '#ff3b30' }}
                                    >
                                        <Heart size={16} strokeWidth={2} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
