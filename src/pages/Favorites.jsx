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
                <h1 className="text-xl font-bold">Favorites</h1>
                <p className="text-sm text-muted mt-0.5">
                    {favoritePhones.length} item{favoritePhones.length !== 1 ? 's' : ''} saved
                </p>
            </div>

            {favoritePhones.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 pt-20 animate-scale-in">
                    <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-5">
                        <Heart size={40} strokeWidth={1.3} className="text-muted" />
                    </div>
                    <h2 className="text-lg font-bold mb-1">No favorites yet</h2>
                    <p className="text-sm text-muted text-center mb-6">
                        Tap the heart icon on any product<br />to save it here.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all shadow-lg shadow-primary/25"
                    >
                        Browse Phones
                    </Link>
                </div>
            ) : (
                <div className="px-4 space-y-3">
                    {favoritePhones.map((phone, i) => (
                        <div
                            key={phone.id}
                            className="flex gap-3 bg-surface rounded-2xl p-3 animate-slide-up"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <Link
                                to={`/product/${phone.id}`}
                                className="w-24 h-24 flex-shrink-0 rounded-xl bg-white flex items-center justify-center"
                            >
                                <img
                                    src={phone.image}
                                    alt={phone.name}
                                    className="w-20 h-20 object-contain"
                                />
                            </Link>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-muted uppercase tracking-wide">
                                    {phone.brand}
                                </p>
                                <Link to={`/product/${phone.id}`}>
                                    <h3 className="text-sm font-semibold leading-snug truncate">
                                        {phone.name}
                                    </h3>
                                </Link>
                                <p className="text-[15px] font-bold text-primary mt-1">
                                    ${phone.price.toLocaleString()}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() =>
                                            addToCart(phone, phone.storageOptions[0], phone.colors[0])
                                        }
                                        className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark active:scale-95 transition-all"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => toggleFavorite(phone.id)}
                                        className="p-1.5 rounded-lg hover:bg-danger/10 text-danger transition-colors"
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
