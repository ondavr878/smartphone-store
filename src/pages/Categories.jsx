import { Link } from 'react-router-dom'
import { Smartphone, ChevronRight, Crown, Zap, Camera, Battery, Monitor } from 'lucide-react'
import Navbar from '../components/Navbar'
import phones from '../data'

const brands = [...new Set(phones.map((p) => p.brand))]

const brandMeta = {
    Apple: { gradient: 'linear-gradient(135deg, #374151, #1f2937)', emoji: '🍎' },
    Samsung: { gradient: 'linear-gradient(135deg, #1e3a5f, #1e40af)', emoji: '📱' },
    Google: { gradient: 'linear-gradient(135deg, #14532d, #166534)', emoji: '🔍' },
    OnePlus: { gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', emoji: '⚡' },
    Xiaomi: { gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)', emoji: '🔥' },
    Sony: { gradient: 'linear-gradient(135deg, #312e81, #4338ca)', emoji: '🎮' },
    Nothing: { gradient: 'linear-gradient(135deg, #334155, #475569)', emoji: '⚪' },
    Motorola: { gradient: 'linear-gradient(135deg, #164e63, #0891b2)', emoji: '🛡️' },
    ASUS: { gradient: 'linear-gradient(135deg, #881337, #e11d48)', emoji: '🎯' },
}

const priceRanges = [
    { label: 'Under $500', min: 0, max: 499 },
    { label: '$500 – $800', min: 500, max: 800 },
    { label: '$800 – $1,100', min: 801, max: 1100 },
    { label: 'Above $1,100', min: 1101, max: Infinity },
]

const topSpecs = [
    { label: 'Best Camera', value: 'Pixel 9 Pro', icon: Camera, color: '#34d399' },
    { label: 'Best Battery', value: 'OnePlus 12', icon: Battery, color: '#fbbf24' },
    { label: 'Best Display', value: 'Galaxy S24', icon: Monitor, color: '#60a5fa' },
    { label: 'Best Gaming', value: 'ROG Phone 8', icon: Zap, color: '#f87171' },
    { label: 'Best Value', value: 'Pixel 8a', icon: Crown, color: '#a78bfa' },
]

export default function Categories() {
    return (
        <div className="pb-24 animate-fade-in min-h-screen">
            <Navbar />
            <div className="h-14" />

            <div className="px-4 pt-4 pb-3">
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Categories</h1>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {brands.length} brands • {phones.length} devices
                </p>
            </div>

            {/* Brands */}
            <div className="px-4 mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
                    Brands
                </h2>
                <div className="grid grid-cols-3 gap-2">
                    {brands.map((brand, i) => {
                        const meta = brandMeta[brand] || {
                            gradient: 'linear-gradient(135deg, #374151, #1f2937)',
                            emoji: '📱',
                        }
                        const count = phones.filter((p) => p.brand === brand).length
                        return (
                            <Link
                                key={brand}
                                to={`/?brand=${brand}`}
                                className="relative rounded-2xl p-3 text-white overflow-hidden group active:scale-[0.97] transition-all animate-slide-up neon-glow"
                                style={{
                                    background: meta.gradient,
                                    animationDelay: `${i * 40}ms`,
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}
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
                <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
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
                                className="flex items-center justify-between rounded-2xl px-4 py-3 cursor-pointer animate-slide-up dark-card"
                                style={{ animationDelay: `${i * 50 + 300}ms` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ background: 'var(--gradient-primary)' }}
                                    >
                                        <Smartphone size={16} strokeWidth={1.8} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{range.label}</p>
                                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                            {count} phone{count !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Top Specs */}
            <div className="px-4">
                <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
                    Awards
                </h2>
                <div className="space-y-2">
                    {topSpecs.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 animate-slide-up dark-card"
                                style={{ animationDelay: `${i * 50 + 500}ms` }}
                            >
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: 'var(--bg-surface-hover)' }}
                                >
                                    <Icon size={16} strokeWidth={1.8} style={{ color: item.color }} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                                </div>
                                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
