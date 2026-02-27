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
                    className="p-2 -ml-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                    <ArrowLeft size={22} strokeWidth={1.8} />
                </button>
                <h1 className="flex-1 text-center font-bold text-[17px] pr-8">Your Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center px-6 pt-24 animate-scale-in">
                    <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-5">
                        <ShoppingBag size={40} strokeWidth={1.3} className="text-muted" />
                    </div>
                    <h2 className="text-lg font-bold mb-1">Your cart is empty</h2>
                    <p className="text-sm text-muted text-center mb-6">
                        Looks like you haven't added<br />any phones yet.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all shadow-lg shadow-primary/25"
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
                                className="flex gap-3 bg-surface rounded-2xl p-3 animate-slide-up"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                {/* Image */}
                                <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-white flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold leading-snug truncate">
                                        {item.name}
                                    </h3>
                                    <p className="text-[11px] text-muted mt-0.5">
                                        {item.storage} •{' '}
                                        <span
                                            className="inline-block w-2.5 h-2.5 rounded-full align-middle"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-sm font-bold text-primary">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.key, -1)}
                                                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all"
                                            >
                                                <Minus size={14} strokeWidth={2.5} />
                                            </button>
                                            <span className="text-sm font-bold w-5 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.key, 1)}
                                                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all"
                                            >
                                                <Plus size={14} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => removeFromCart(item.key)}
                                    className="self-start p-1.5 rounded-lg hover:bg-danger/10 text-danger/60 hover:text-danger transition-colors"
                                >
                                    <Trash2 size={16} strokeWidth={2} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Subtotal</span>
                            <span className="font-semibold">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Shipping</span>
                            <span className="font-semibold">${shipping.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between text-base">
                            <span className="font-bold">Total</span>
                            <span className="font-extrabold text-primary">
                                ${total.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <div className="px-4 mt-5">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center w-full h-13 rounded-2xl bg-primary text-white font-semibold text-[15px] shadow-lg shadow-primary/25 hover:bg-primary-dark active:scale-[0.97] transition-all"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
