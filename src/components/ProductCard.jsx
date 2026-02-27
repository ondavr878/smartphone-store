import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../CartContext'
import { useFavorites } from '../FavoritesContext'

export default function ProductCard({ product }) {
    const { addToCart } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()
    const liked = isFavorite(product.id)

    const handleAdd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product, product.storageOptions[0], product.colors[0])
    }

    const handleFav = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(product.id)
    }

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block rounded-2xl overflow-hidden transition-all duration-300 neon-glow animate-fade-in gradient-border"
        >
            {/* Image */}
            <div
                className="relative aspect-square p-4 flex items-center justify-center overflow-hidden"
                style={{ background: 'var(--bg-surface)' }}
            >
                {/* Mesh bg decoration */}
                <div className="absolute inset-0 mesh-bg opacity-60" />
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[80%] h-[80%] object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                />
                {/* Brand tag */}
                <span
                    className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur"
                    style={{
                        background: 'rgba(255,255,255,0.08)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                    }}
                >
                    {product.brand}
                </span>
                {/* Badge */}
                {product.badge && (
                    <span
                        className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-wide"
                        style={{ background: 'var(--badge-bg)' }}
                    >
                        {product.badge}
                    </span>
                )}
                {/* Favorite */}
                <button
                    onClick={handleFav}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur"
                    style={{
                        background: liked ? 'rgba(255, 59, 48, 0.15)' : 'rgba(255,255,255,0.08)',
                        color: liked ? '#ff3b30' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                    }}
                    aria-label="Toggle favorite"
                >
                    <Heart size={13} strokeWidth={2.2} fill={liked ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Info */}
            <div className="p-3 space-y-1.5" style={{ borderTop: '1px solid var(--border-color)' }}>
                <h3 className="text-[13px] font-semibold leading-snug line-clamp-1" style={{ color: 'var(--text-primary)' }}>
                    {product.name}
                </h3>
                {/* Rating */}
                <div className="flex items-center gap-1">
                    <Star size={11} fill="#FFB800" stroke="#FFB800" strokeWidth={1} />
                    <span className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {product.rating || '4.5'}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        ({product.reviews ? (product.reviews / 1000).toFixed(1) + 'k' : '2.3k'})
                    </span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                    <p className="text-[15px] font-bold gradient-text">
                        ${product.price.toLocaleString()}
                    </p>
                    <button
                        onClick={handleAdd}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-white active:scale-90 transition-all btn-gradient"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={13} strokeWidth={2.2} />
                    </button>
                </div>
            </div>
        </Link>
    )
}
