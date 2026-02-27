import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../CartContext'

export default function Cart() {
    const navigate = useNavigate()
    const { cartItems, updateQuantity, removeFromCart } = useCart()

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )
    const shipping = cartItems.length > 0 ? 10 : 0
    const total = subtotal + shipping

    return (
        <div className="pb-24 animate-fade-in min-h-screen">
            {/* Header */}
            <div className="flex items-center px-4 h-14">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-xl transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <ArrowLeft size={22} strokeWidth={1.8} />
                </button>
                <h1 className="flex-1 text-center font-bold text-[17px] pr-8" style={{ color: 'var(--text-primary)' }}>Your Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center px-6 pt-24 animate-scale-in">
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                    >
                        <ShoppingBag size={40} strokeWidth={1.3} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Your cart is empty</h2>
                    <p className="text-sm text-center mb-6" style={{ color: 'var(--text-muted)' }}>
                        Looks like you haven't added<br />any phones yet.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-2.5 rounded-full text-white text-sm font-semibold active:scale-95 transition-all btn-gradient"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="px-4 space-y-3">
                        {cartItems.map((item, i) => (
                            <div
                                key={item.key}
                                className="flex gap-3 rounded-2xl p-3 animate-slide-up dark-card"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                {/* Image */}
                                <div
                                    className="w-20 h-20 flex-shrink-0 rounded-xl flex items-center justify-center"
                                    style={{ background: 'var(--bg-surface)' }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold leading-snug truncate" style={{ color: 'var(--text-primary)' }}>
                                        {item.name}
                                    </h3>
                                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                        {item.storage} •{' '}
                                        <span
                                            className="inline-block w-2.5 h-2.5 rounded-full align-middle"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-sm font-bold gradient-text">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.key, -1)}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-90 transition-all"
                                                style={{
                                                    background: 'var(--bg-surface-hover)',
                                                    color: 'var(--text-secondary)',
                                                    border: '1px solid var(--border-color)',
                                                }}
                                            >
                                                <Minus size={14} strokeWidth={2.5} />
                                            </button>
                                            <span className="text-sm font-bold w-5 text-center" style={{ color: 'var(--text-primary)' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.key, 1)}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-90 transition-all"
                                                style={{
                                                    background: 'var(--bg-surface-hover)',
                                                    color: 'var(--text-secondary)',
                                                    border: '1px solid var(--border-color)',
                                                }}
                                            >
                                                <Plus size={14} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => removeFromCart(item.key)}
                                    className="self-start p-1.5 rounded-lg transition-colors"
                                    style={{ color: 'rgba(255,59,48,0.6)' }}
                                >
                                    <Trash2 size={16} strokeWidth={2} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="mx-4 mt-6 rounded-2xl p-4 space-y-3 dark-card">
                        <div className="flex justify-between text-sm">
                            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="h-px" style={{ background: 'var(--border-color)' }} />
                        <div className="flex justify-between text-base">
                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                            <span className="font-extrabold gradient-text">
                                ${total.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <div className="px-4 mt-5">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center w-full h-13 rounded-2xl text-white font-semibold text-[15px] active:scale-[0.97] transition-all btn-gradient animate-pulse-glow"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
