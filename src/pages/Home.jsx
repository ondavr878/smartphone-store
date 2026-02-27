import { Link } from 'react-router-dom'
import { ChevronRight, Flame, Sparkles, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import phones from '../data'

export default function Home() {
    const newArrivals = phones.filter((p) => p.badge === 'New' || p.badge === 'Foldable' || p.badge === 'AI Camera')
    const bestSellers = phones.filter((p) => p.rating >= 4.5).slice(0, 6)
    const budgetPicks = phones.filter((p) => p.price < 600)

    return (
        <div className="pb-24">
            <Navbar />
            <div className="h-14" />

            {/* Hero Banner */}
            <section className="hero-gradient mx-3 mt-3 rounded-3xl p-6 text-white relative overflow-hidden animate-fade-in">
                {/* Floating orbs */}
                <div
                    className="floating-orb w-32 h-32 -top-8 -right-8"
                    style={{ background: 'rgba(var(--color-primary-rgb), 0.2)' }}
                />
                <div
                    className="floating-orb w-24 h-24 bottom-0 left-0 translate-y-1/2 -translate-x-1/4"
                    style={{ background: 'rgba(var(--color-accent-rgb), 0.15)', animationDelay: '2s' }}
                />
                <div
                    className="floating-orb w-16 h-16 top-1/2 right-1/4"
                    style={{ background: 'rgba(var(--color-primary-rgb), 0.1)', animationDelay: '4s' }}
                />

                <p className="text-[10px] font-semibold uppercase tracking-[3px] mb-2" style={{ color: 'var(--color-accent)' }}>
                    Just Released
                </p>
                <h1 className="text-[26px] font-extrabold leading-tight mb-1 relative z-10">
                    New iPhone 15<br />Pro Max
                </h1>
                <p className="text-sm text-white/40 mb-5 max-w-[220px] relative z-10">
                    Titanium design. A17 Pro chip. The most powerful iPhone ever.
                </p>
                <Link
                    to="/product/1"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full active:scale-95 transition-all btn-gradient relative z-10"
                >
                    Shop Now
                    <ChevronRight size={16} strokeWidth={2.5} />
                </Link>
            </section>

            {/* Quick Categories */}
            <div className="flex gap-2 px-3 mt-5 overflow-x-auto no-scrollbar">
                {['All', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing', 'ASUS'].map(
                    (cat, i) => (
                        <Link
                            key={cat}
                            to={cat === 'All' ? '/' : `/categories?brand=${cat}`}
                            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${i === 0 ? 'chip-active' : 'chip-inactive'}`}
                        >
                            {cat}
                        </Link>
                    ),
                )}
            </div>

            {/* 🔥 New Arrivals — horizontal scroll */}
            {newArrivals.length > 0 && (
                <section className="mt-6">
                    <div className="px-4 mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
                            <Sparkles size={13} className="text-white" />
                        </div>
                        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>New Arrivals</h2>
                    </div>
                    <div className="flex gap-3 px-3 overflow-x-auto no-scrollbar pb-1">
                        {newArrivals.map((phone) => (
                            <div key={phone.id} className="min-w-[160px] max-w-[160px]">
                                <ProductCard product={phone} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ⭐ Best Sellers */}
            <section className="mt-7">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                            <TrendingUp size={13} className="text-white" />
                        </div>
                        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Best Sellers</h2>
                    </div>
                    <Link to="/categories" className="text-xs font-semibold gradient-text">
                        See All
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 px-3">
                    {bestSellers.map((phone, i) => (
                        <div key={phone.id} style={{ animationDelay: `${i * 50}ms` }}>
                            <ProductCard product={phone} />
                        </div>
                    ))}
                </div>
            </section>

            {/* 💰 Budget Picks */}
            {budgetPicks.length > 0 && (
                <section className="mt-7">
                    <div className="px-4 mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
                            <Flame size={13} className="text-white" />
                        </div>
                        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Budget Picks</h2>
                    </div>
                    <div className="flex gap-3 px-3 overflow-x-auto no-scrollbar pb-1">
                        {budgetPicks.map((phone) => (
                            <div key={phone.id} className="min-w-[160px] max-w-[160px]">
                                <ProductCard product={phone} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* All Phones */}
            <section className="mt-7">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>All Phones</h2>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{phones.length} devices</span>
                </div>
                <div className="grid grid-cols-2 gap-3 px-3">
                    {phones.map((phone, i) => (
                        <div key={phone.id} style={{ animationDelay: `${i * 40}ms` }}>
                            <ProductCard product={phone} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
