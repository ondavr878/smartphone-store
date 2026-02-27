import { Link } from 'react-router-dom'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { useCart } from '../CartContext'
import { useState } from 'react'

export default function Navbar() {
    const { cartCount } = useCart()
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 glass border-b border-border/60">
            <div className="flex items-center justify-between px-4 h-14">
                {/* Left — hamburger */}
                <button className="p-2 -ml-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors">
                    <Menu size={22} strokeWidth={1.8} />
                </button>

                {/* Center — brand or search */}
                {searchOpen ? (
                    <div className="flex-1 mx-2 animate-fade-in">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search phones…"
                            className="w-full h-9 rounded-lg bg-surface px-3 text-sm outline-none placeholder:text-muted"
                            onBlur={() => setSearchOpen(false)}
                        />
                    </div>
                ) : (
                    <Link to="/" className="font-bold text-[17px] tracking-tight select-none">
                        PhoneVault
                    </Link>
                )}

                {/* Right — search + cart */}
                <div className="flex items-center gap-1">
                    {!searchOpen && (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors"
                        >
                            <Search size={20} strokeWidth={1.8} />
                        </button>
                    )}
                    <Link
                        to="/cart"
                        className="relative p-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors"
                    >
                        <ShoppingCart size={20} strokeWidth={1.8} />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-primary text-white text-[10px] font-bold leading-none px-1 animate-scale-in">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    )
}
