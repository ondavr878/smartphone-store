import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
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
            className="group block rounded-2xl bg-surface overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.97] animate-fade-in"
        >
            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 p-4 flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[80%] h-[80%] object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/80 text-[11px] font-medium text-muted backdrop-blur">
                    {product.brand}
                </span>
                <button
                    onClick={handleFav}
                    className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${liked
                            ? 'bg-danger/10 text-danger'
                            : 'bg-white/80 text-muted hover:text-danger backdrop-blur'
                        }`}
                    aria-label="Toggle favorite"
                >
                    <Heart size={14} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Info */}
            <div className="p-3 space-y-2">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-[15px] font-bold text-primary">
                        ${product.price.toLocaleString()}
                    </p>
                    <button
                        onClick={handleAdd}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-dark active:scale-90 transition-all"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={14} strokeWidth={2.2} />
                    </button>
                </div>
            </div>
        </Link>
    )
}
