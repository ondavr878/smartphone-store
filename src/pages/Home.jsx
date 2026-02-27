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
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-blue-300 mb-2">
                    Just Released
                </p>
                <h1 className="text-[26px] font-extrabold leading-tight mb-1">
                    New iPhone 15<br />Pro Max
                </h1>
                <p className="text-sm text-white/50 mb-5 max-w-[220px]">
                    Titanium design. A17 Pro chip. The most powerful iPhone ever.
                </p>
                <Link
                    to="/product/1"
                    className="inline-flex items-center gap-1.5 bg-white text-surface-dark text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-lg shadow-black/20"
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
                            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${i === 0
                                    ? 'bg-surface-dark text-white'
                                    : 'bg-surface text-muted hover:bg-gray-200'
                                }`}
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
                        <Sparkles size={16} className="text-amber-500" />
                        <h2 className="text-base font-bold">New Arrivals</h2>
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
                        <TrendingUp size={16} className="text-primary" />
                        <h2 className="text-base font-bold">Best Sellers</h2>
                    </div>
                    <Link to="/categories" className="text-xs font-semibold text-primary">
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
                        <Flame size={16} className="text-orange-500" />
                        <h2 className="text-base font-bold">Budget Picks</h2>
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
                    <h2 className="text-base font-bold">All Phones</h2>
                    <span className="text-xs text-muted font-medium">{phones.length} devices</span>
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
