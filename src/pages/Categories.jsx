import { Link } from 'react-router-dom'
import { Smartphone, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import phones from '../data'

const brands = [...new Set(phones.map((p) => p.brand))]

const brandMeta = {
    Apple: { gradient: 'from-gray-900 to-gray-700', emoji: '🍎' },
    Samsung: { gradient: 'from-blue-900 to-blue-700', emoji: '📱' },
    Google: { gradient: 'from-green-800 to-green-600', emoji: '🔍' },
    OnePlus: { gradient: 'from-red-900 to-red-700', emoji: '⚡' },
    Xiaomi: { gradient: 'from-orange-800 to-orange-600', emoji: '🔥' },
    Sony: { gradient: 'from-indigo-900 to-indigo-700', emoji: '🎮' },
}

const priceRanges = [
    { label: 'Under $800', min: 0, max: 799 },
    { label: '$800 – $1,100', min: 800, max: 1100 },
    { label: 'Above $1,100', min: 1101, max: Infinity },
]

export default function Categories() {
    return (
        <div className="pb-24 animate-fade-in min-h-screen">
            <Navbar />
            <div className="h-14" />

            <div className="px-4 pt-4 pb-3">
                <h1 className="text-xl font-bold">Categories</h1>
                <p className="text-sm text-muted mt-0.5">Browse by brand or price</p>
            </div>

            {/* Brands */}
            <div className="px-4 mb-6">
                <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                    Brands
                </h2>
                <div className="grid grid-cols-2 gap-2.5">
                    {brands.map((brand, i) => {
                        const meta = brandMeta[brand] || {
                            gradient: 'from-gray-800 to-gray-600',
                            emoji: '📱',
                        }
                        const count = phones.filter((p) => p.brand === brand).length
                        return (
                            <Link
                                key={brand}
                                to={`/?brand=${brand}`}
                                className={`relative bg-gradient-to-br ${meta.gradient} rounded-2xl p-4 text-white overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all animate-slide-up`}
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">
                                    {meta.emoji}
                                </div>
                                <p className="text-base font-bold">{brand}</p>
                                <p className="text-xs text-white/60 mt-0.5">
                                    {count} device{count !== 1 ? 's' : ''}
                                </p>
                                <ChevronRight
                                    size={16}
                                    className="absolute bottom-3 right-3 text-white/40 group-hover:text-white/70 transition-colors"
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Price Ranges */}
            <div className="px-4 mb-6">
                <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                    By Price
                </h2>
                <div className="space-y-2">
                    {priceRanges.map((range, i) => {
                        const count = phones.filter(
                            (p) => p.price >= range.min && p.price <= range.max,
                        ).length
                        return (
                            <div
                                key={range.label}
                                className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3.5 hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer animate-slide-up"
                                style={{ animationDelay: `${i * 60 + 300}ms` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                                        <Smartphone
                                            size={18}
                                            strokeWidth={1.8}
                                            className="text-primary"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{range.label}</p>
                                        <p className="text-xs text-muted">
                                            {count} phone{count !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-muted" />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Featured Specs */}
            <div className="px-4">
                <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                    Top Specs
                </h2>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: 'Best Camera', value: 'Pixel 9 Pro', icon: '📸' },
                        { label: 'Best Battery', value: 'OnePlus 12', icon: '🔋' },
                        { label: 'Best Display', value: 'Galaxy S24', icon: '✨' },
                    ].map((item, i) => (
                        <div
                            key={item.label}
                            className="bg-surface rounded-2xl p-3 text-center animate-slide-up"
                            style={{ animationDelay: `${i * 60 + 500}ms` }}
                        >
                            <p className="text-xl mb-1">{item.icon}</p>
                            <p className="text-[10px] font-medium text-muted uppercase">
                                {item.label}
                            </p>
                            <p className="text-xs font-bold mt-0.5 leading-tight">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
