import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, CreditCard, Banknote } from 'lucide-react'
import { useCart } from '../CartContext'

export default function Checkout() {
    const navigate = useNavigate()
    const { cartItems, clearCart } = useCart()
    const [placed, setPlaced] = useState(false)

    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        payment: 'card',
    })

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )
    const total = subtotal + 10

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlaced(true)
    }

    const handleReturnHome = () => {
        clearCart()
        navigate('/')
    }

    if (placed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-scale-in">
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 animate-pulse-glow"
                    style={{ background: 'rgba(48, 209, 88, 0.1)' }}
                >
                    <CheckCircle size={44} strokeWidth={1.5} className="text-success" />
                </div>
                <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Order Placed Successfully!</h1>
                <p className="text-sm text-center mb-8" style={{ color: 'var(--text-muted)' }}>
                    Thank you for your purchase. We'll send<br />you a confirmation shortly.
                </p>
                <button
                    onClick={handleReturnHome}
                    className="px-8 py-3 rounded-2xl text-white font-semibold text-sm active:scale-95 transition-all btn-gradient"
                >
                    Return to Home
                </button>
            </div>
        )
    }

    const inputStyle = {
        background: 'var(--bg-input)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
    }

    return (
        <div className="pb-6 animate-fade-in min-h-screen">
            {/* Header */}
            <div className="flex items-center px-4 h-14">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-xl transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <ArrowLeft size={22} strokeWidth={1.8} />
                </button>
                <h1 className="flex-1 text-center font-bold text-[17px] pr-8" style={{ color: 'var(--text-primary)' }}>Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="px-4 space-y-6">
                {/* Delivery Information */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
                        Delivery Information
                    </p>
                    <div className="space-y-3">
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl px-4 text-sm outline-none transition-all focus:ring-2"
                            style={{
                                ...inputStyle,
                                '--tw-ring-color': 'var(--glow-color)',
                            }}
                        />
                        <input
                            required
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl px-4 text-sm outline-none transition-all focus:ring-2"
                            style={{
                                ...inputStyle,
                                '--tw-ring-color': 'var(--glow-color)',
                            }}
                        />
                        <textarea
                            required
                            name="address"
                            placeholder="Delivery Address"
                            rows={3}
                            value={form.address}
                            onChange={handleChange}
                            className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none transition-all focus:ring-2"
                            style={{
                                ...inputStyle,
                                '--tw-ring-color': 'var(--glow-color)',
                            }}
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
                        Payment Method
                    </p>
                    <div className="space-y-2">
                        <label
                            className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all"
                            style={{
                                background: form.payment === 'card' ? 'rgba(var(--color-primary-rgb), 0.08)' : 'var(--bg-card)',
                                border: form.payment === 'card' ? '1px solid var(--border-glow)' : '1px solid var(--border-color)',
                            }}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={form.payment === 'card'}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: form.payment === 'card' ? 'var(--gradient-btn)' : 'var(--bg-surface)',
                                    color: form.payment === 'card' ? 'white' : 'var(--text-muted)',
                                }}
                            >
                                <CreditCard size={20} strokeWidth={1.8} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Credit Card</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Visa, Mastercard, Amex</p>
                            </div>
                            <div
                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                style={{ borderColor: form.payment === 'card' ? 'var(--nav-active)' : 'var(--border-color)' }}
                            >
                                {form.payment === 'card' && (
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
                                )}
                            </div>
                        </label>

                        <label
                            className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all"
                            style={{
                                background: form.payment === 'cash' ? 'rgba(var(--color-primary-rgb), 0.08)' : 'var(--bg-card)',
                                border: form.payment === 'cash' ? '1px solid var(--border-glow)' : '1px solid var(--border-color)',
                            }}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={form.payment === 'cash'}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: form.payment === 'cash' ? 'var(--gradient-btn)' : 'var(--bg-surface)',
                                    color: form.payment === 'cash' ? 'white' : 'var(--text-muted)',
                                }}
                            >
                                <Banknote size={20} strokeWidth={1.8} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Cash on Delivery</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Pay when you receive</p>
                            </div>
                            <div
                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                style={{ borderColor: form.payment === 'cash' ? 'var(--nav-active)' : 'var(--border-color)' }}
                            >
                                {form.payment === 'cash' && (
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
                                )}
                            </div>
                        </label>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="rounded-2xl p-4 space-y-2.5 dark-card">
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
                        Order Summary
                    </p>
                    {cartItems.map((item) => (
                        <div key={item.key} className="flex justify-between text-sm">
                            <span className="truncate pr-4" style={{ color: 'var(--text-muted)' }}>
                                {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold shrink-0" style={{ color: 'var(--text-primary)' }}>
                                ${(item.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div className="h-px" style={{ background: 'var(--border-color)' }} />
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>$10.00</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                        <span className="font-extrabold gradient-text">
                            ${total.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full h-13 rounded-2xl text-white font-semibold text-[15px] active:scale-[0.97] transition-all btn-gradient animate-pulse-glow"
                >
                    Place Order
                </button>
            </form>
        </div>
    )
}
