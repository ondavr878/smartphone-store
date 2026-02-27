import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import phones from '../data'

export default function Home() {
    return (
        <div className="pb-24">
            <Navbar />
            {/* spacer for fixed navbar */}
            <div className="h-14" />

            {/* Hero Banner */}
            <section className="hero-gradient mx-3 mt-3 rounded-3xl p-6 text-white relative overflow-hidden animate-fade-in">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

                <p className="text-xs font-medium uppercase tracking-widest text-blue-300 mb-2">
                    Just Released
                </p>
                <h1 className="text-[26px] font-extrabold leading-tight mb-1">
                    New iPhone 15<br />Pro Max
                </h1>
                <p className="text-sm text-white/60 mb-5 max-w-[220px]">
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

            {/* Section Title */}
            <div className="px-4 mt-7 mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Popular Phones</h2>
                <button className="text-xs font-semibold text-primary">See All</button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-3 px-3">
                {phones.map((phone, i) => (
                    <div key={phone.id} style={{ animationDelay: `${i * 60}ms` }}>
                        <ProductCard product={phone} />
                    </div>
                ))}
            </div>
        </div>
    )
}
