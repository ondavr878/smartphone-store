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
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-5">
                    <CheckCircle size={44} strokeWidth={1.5} className="text-success" />
                </div>
                <h1 className="text-xl font-bold mb-1">Order Placed Successfully!</h1>
                <p className="text-sm text-muted text-center mb-8">
                    Thank you for your purchase. We'll send<br />you a confirmation shortly.
                </p>
                <button
                    onClick={handleReturnHome}
                    className="px-8 py-3 rounded-2xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary-dark active:scale-95 transition-all"
                >
                    Return to Home
                </button>
            </div>
        )
    }

    return (
        <div className="pb-6 animate-fade-in min-h-screen">
            {/* Header */}
            <div className="flex items-center px-4 h-14">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                    <ArrowLeft size={22} strokeWidth={1.8} />
                </button>
                <h1 className="flex-1 text-center font-bold text-[17px] pr-8">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="px-4 space-y-6">
                {/* Delivery Information */}
                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
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
                            className="w-full h-12 rounded-2xl bg-surface px-4 text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                        <input
                            required
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl bg-surface px-4 text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                        <textarea
                            required
                            name="address"
                            placeholder="Delivery Address"
                            rows={3}
                            value={form.address}
                            onChange={handleChange}
                            className="w-full rounded-2xl bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted resize-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                        Payment Method
                    </p>
                    <div className="space-y-2">
                        <label
                            className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all ${form.payment === 'card'
                                    ? 'bg-primary/5 ring-2 ring-primary/30'
                                    : 'bg-surface hover:bg-gray-100'
                                }`}
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
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.payment === 'card'
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-muted'
                                    }`}
                            >
                                <CreditCard size={20} strokeWidth={1.8} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">Credit Card</p>
                                <p className="text-xs text-muted">Visa, Mastercard, Amex</p>
                            </div>
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.payment === 'card'
                                        ? 'border-primary'
                                        : 'border-gray-300'
                                    }`}
                            >
                                {form.payment === 'card' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                )}
                            </div>
                        </label>

                        <label
                            className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all ${form.payment === 'cash'
                                    ? 'bg-primary/5 ring-2 ring-primary/30'
                                    : 'bg-surface hover:bg-gray-100'
                                }`}
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
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.payment === 'cash'
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-muted'
                                    }`}
                            >
                                <Banknote size={20} strokeWidth={1.8} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">Cash on Delivery</p>
                                <p className="text-xs text-muted">Pay when you receive</p>
                            </div>
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.payment === 'cash'
                                        ? 'border-primary'
                                        : 'border-gray-300'
                                    }`}
                            >
                                {form.payment === 'cash' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                )}
                            </div>
                        </label>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-surface rounded-2xl p-4 space-y-2.5">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                        Order Summary
                    </p>
                    {cartItems.map((item) => (
                        <div key={item.key} className="flex justify-between text-sm">
                            <span className="truncate pr-4 text-muted">
                                {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold shrink-0">
                                ${(item.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Shipping</span>
                        <span className="font-semibold">$10.00</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span className="font-bold">Total</span>
                        <span className="font-extrabold text-primary">
                            ${total.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full h-13 rounded-2xl bg-primary text-white font-semibold text-[15px] shadow-lg shadow-primary/25 hover:bg-primary-dark active:scale-[0.97] transition-all"
                >
                    Place Order
                </button>
            </form>
        </div>
    )
}
