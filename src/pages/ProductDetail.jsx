import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Star, ShoppingCart, Zap, Heart } from 'lucide-react'
import phones from '../data'
import { useCart } from '../CartContext'
import { useFavorites } from '../FavoritesContext'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()

    const product = phones.find((p) => p.id === Number(id))
    const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions[0])
    const [selectedColor, setSelectedColor] = useState(0)

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted">Product not found</p>
            </div>
        )
    }

    const handleAddToCart = () => {
        addToCart(product, selectedStorage, product.colors[selectedColor])
    }

    const handleBuyNow = () => {
        addToCart(product, selectedStorage, product.colors[selectedColor])
        navigate('/cart')
    }

    return (
        <div className="pb-28 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                    <ArrowLeft size={22} strokeWidth={1.8} />
                </button>
                <span className="font-semibold text-[15px]">Detail</span>
                <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 -mr-2 rounded-xl transition-colors ${isFavorite(product.id)
                            ? 'text-danger'
                            : 'text-muted hover:text-danger'
                        }`}
                >
                    <Heart
                        size={22}
                        strokeWidth={1.8}
                        fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                    />
                </button>
            </div>

            {/* Product Image */}
            <div className="bg-surface mx-4 rounded-3xl p-6 flex items-center justify-center aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 via-transparent to-gray-200/50" />
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[75%] h-[75%] object-contain relative z-10 animate-scale-in"
                />
            </div>

            {/* Info */}
            <div className="px-4 mt-5 space-y-5">
                {/* Title & Rating */}
                <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
                        {product.brand}
                    </p>
                    <h1 className="text-xl font-bold leading-snug">{product.name}</h1>
                    <div className="flex items-center gap-1.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < 4 ? '#FFB800' : 'none'}
                                stroke={i < 4 ? '#FFB800' : '#d1d5db'}
                                strokeWidth={1.5}
                            />
                        ))}
                        <span className="text-xs text-muted ml-1">4.0 (2.3k reviews)</span>
                    </div>
                </div>

                {/* Price */}
                <p className="text-2xl font-extrabold text-primary">
                    ${product.price.toLocaleString()}
                </p>

                {/* Storage Selector */}
                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                        Storage
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {product.storageOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setSelectedStorage(opt)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedStorage === opt
                                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                                    : 'bg-surface text-surface-dark hover:bg-gray-200'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selector */}
                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                        Color —{' '}
                        <span className="normal-case text-surface-dark font-medium">
                            {product.colorNames[selectedColor]}
                        </span>
                    </p>
                    <div className="flex gap-3">
                        {product.colors.map((color, i) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(i)}
                                className={`w-9 h-9 rounded-full transition-all ${selectedColor === i
                                    ? 'ring-2 ring-primary ring-offset-2 scale-110'
                                    : 'ring-1 ring-border hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={product.colorNames[i]}
                            />
                        ))}
                    </div>
                </div>

                {/* Specs */}
                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                        Specifications
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: 'Processor', value: product.specs.processor },
                            { label: 'RAM', value: product.specs.ram },
                            { label: 'Battery', value: product.specs.battery },
                        ].map((spec) => (
                            <div
                                key={spec.label}
                                className="bg-surface rounded-2xl p-3 text-center space-y-1"
                            >
                                <p className="text-[10px] font-medium text-muted uppercase">
                                    {spec.label}
                                </p>
                                <p className="text-xs font-bold leading-tight">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] glass border-t border-border/60 px-4 py-3 z-50">
                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-surface text-surface-dark font-semibold text-sm hover:bg-gray-200 active:scale-[0.97] transition-all"
                    >
                        <ShoppingCart size={18} strokeWidth={2} />
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary-dark active:scale-[0.97] transition-all"
                    >
                        <Zap size={18} strokeWidth={2} />
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
