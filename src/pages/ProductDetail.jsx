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
                <p style={{ color: 'var(--text-muted)' }}>Product not found</p>
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
                    className="p-2 -ml-2 rounded-xl transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <ArrowLeft size={22} strokeWidth={1.8} />
                </button>
                <span className="font-semibold text-[15px]" style={{ color: 'var(--text-primary)' }}>Detail</span>
                <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2 -mr-2 rounded-xl transition-colors"
                    style={{ color: isFavorite(product.id) ? '#ff3b30' : 'var(--text-muted)' }}
                >
                    <Heart
                        size={22}
                        strokeWidth={1.8}
                        fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                    />
                </button>
            </div>

            {/* Product Image */}
            <div
                className="mx-4 rounded-3xl p-6 flex items-center justify-center aspect-square relative overflow-hidden"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}
            >
                <div className="absolute inset-0 mesh-bg" />
                {/* Floating decorative orbs */}
                <div
                    className="floating-orb w-40 h-40 -top-10 -right-10"
                    style={{ background: 'rgba(var(--color-primary-rgb), 0.12)' }}
                />
                <div
                    className="floating-orb w-28 h-28 bottom-5 -left-5"
                    style={{ background: 'rgba(var(--color-accent-rgb), 0.1)', animationDelay: '3s' }}
                />
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
                    <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
                        {product.brand}
                    </p>
                    <h1 className="text-xl font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>{product.name}</h1>
                    <div className="flex items-center gap-1.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.round(product.rating || 4) ? '#FFB800' : 'none'}
                                stroke={i < Math.round(product.rating || 4) ? '#FFB800' : 'var(--text-muted)'}
                                strokeWidth={1.5}
                            />
                        ))}
                        <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                            {product.rating || '4.0'} ({product.reviews ? (product.reviews / 1000).toFixed(1) + 'k' : '2.3k'} reviews)
                        </span>
                    </div>
                </div>

                {/* Price */}
                <p className="text-2xl font-extrabold gradient-text">
                    ${product.price.toLocaleString()}
                </p>

                {/* Storage Selector */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                        Storage
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {product.storageOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setSelectedStorage(opt)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedStorage === opt
                                    ? 'btn-gradient text-white'
                                    : ''
                                    }`}
                                style={selectedStorage !== opt ? {
                                    background: 'var(--bg-surface)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)',
                                } : undefined}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selector */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                        Color —{' '}
                        <span className="normal-case font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {product.colorNames[selectedColor]}
                        </span>
                    </p>
                    <div className="flex gap-3">
                        {product.colors.map((color, i) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(i)}
                                className="w-9 h-9 rounded-full transition-all"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: selectedColor === i
                                        ? `0 0 0 2px var(--bg-base), 0 0 0 4px var(--nav-active)`
                                        : `0 0 0 1px var(--border-color)`,
                                    transform: selectedColor === i ? 'scale(1.1)' : 'scale(1)',
                                }}
                                aria-label={product.colorNames[i]}
                            />
                        ))}
                    </div>
                </div>

                {/* Specs */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
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
                                className="rounded-2xl p-3 text-center space-y-1 dark-card"
                            >
                                <p className="text-[10px] font-medium uppercase" style={{ color: 'var(--text-muted)' }}>
                                    {spec.label}
                                </p>
                                <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div
                className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] glass-dark border-t px-4 py-3 z-50"
                style={{ borderColor: 'var(--nav-border)' }}
            >
                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl font-semibold text-sm active:scale-[0.97] transition-all dark-card"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        <ShoppingCart size={18} strokeWidth={2} />
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl text-white font-semibold text-sm active:scale-[0.97] transition-all btn-gradient animate-pulse-glow"
                    >
                        <Zap size={18} strokeWidth={2} />
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
