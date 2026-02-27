import { Link } from 'react-router-dom'
import { Smartphone, ChevronRight, Crown, Zap, Camera, Battery, Monitor } from 'lucide-react'
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
    Nothing: { gradient: 'from-slate-800 to-slate-600', emoji: '⚪' },
    Motorola: { gradient: 'from-cyan-800 to-cyan-600', emoji: '🛡️' },
    ASUS: { gradient: 'from-rose-900 to-rose-700', emoji: '🎯' },
}

const priceRanges = [
    { label: 'Under $500', min: 0, max: 499 },
    { label: '$500 – $800', min: 500, max: 800 },
    { label: '$800 – $1,100', min: 801, max: 1100 },
    { label: 'Above $1,100', min: 1101, max: Infinity },
]

const topSpecs = [
    { label: 'Best Camera', value: 'Pixel 9 Pro', icon: Camera, color: 'text-emerald-500' },
    { label: 'Best Battery', value: 'OnePlus 12', icon: Battery, color: 'text-amber-500' },
    { label: 'Best Display', value: 'Galaxy S24', icon: Monitor, color: 'text-blue-500' },
    { label: 'Best Gaming', value: 'ROG Phone 8', icon: Zap, color: 'text-red-500' },
    { label: 'Best Value', value: 'Pixel 8a', icon: Crown, color: 'text-purple-500' },
]

export default function Categories() {
    return (
        <div className="pb-24 animate-fade-in min-h-screen">
            <Navbar />
            <div className="h-14" />

            <div className="px-4 pt-4 pb-3">
                <h1 className="text-xl font-bold">Categories</h1>
                <p className="text-sm text-muted mt-0.5">
                    {brands.length} brands • {phones.length} devices
                </p>
            </div>

            {/* Brands */}
            <div className="px-4 mb-6">
                <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                    Brands
                </h2>
                <div className="grid grid-cols-3 gap-2">
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
                                className={`relative bg-gradient-to-br ${meta.gradient} rounded-2xl p-3 text-white overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all animate-slide-up`}
                                style={{ animationDelay: `${i * 40}ms` }}
                            >
                                <div className="absolute top-1.5 right-1.5 text-lg opacity-30 group-hover:opacity-50 transition-opacity">
                                    {meta.emoji}
                                </div>
                                <p className="text-sm font-bold">{brand}</p>
                                <p className="text-[10px] text-white/50 mt-0.5">
                                    {count} device{count !== 1 ? 's' : ''}
                                </p>
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
                                className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer animate-slide-up"
                                style={{ animationDelay: `${i * 50 + 300}ms` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                        <Smartphone size={16} strokeWidth={1.8} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{range.label}</p>
                                        <p className="text-[11px] text-muted">
                                            {count} phone{count !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-muted" />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Top Specs */}
            <div className="px-4">
                <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                    Awards
                </h2>
                <div className="space-y-2">
                    {topSpecs.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-3 animate-slide-up"
                                style={{ animationDelay: `${i * 50 + 500}ms` }}
                            >
                                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                    <Icon size={16} strokeWidth={1.8} className={item.color} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{item.value}</p>
                                    <p className="text-[11px] text-muted">{item.label}</p>
                                </div>
                                <ChevronRight size={16} className="text-muted" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
