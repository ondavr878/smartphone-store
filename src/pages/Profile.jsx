import {
    User,
    MapPin,
    CreditCard,
    Bell,
    HelpCircle,
    Settings,
    LogOut,
    ChevronRight,
    Package,
    Shield,
} from 'lucide-react'
import Navbar from '../components/Navbar'

const menuSections = [
    {
        title: 'Account',
        items: [
            { icon: Package, label: 'My Orders', desc: 'Track & manage orders' },
            { icon: MapPin, label: 'Addresses', desc: 'Manage delivery addresses' },
            { icon: CreditCard, label: 'Payment Methods', desc: 'Cards & billing' },
        ],
    },
    {
        title: 'Preferences',
        items: [
            { icon: Bell, label: 'Notifications', desc: 'Alerts & reminders' },
            { icon: Shield, label: 'Privacy', desc: 'Data & permissions' },
            { icon: Settings, label: 'Settings', desc: 'App preferences' },
        ],
    },
    {
        title: 'Support',
        items: [
            { icon: HelpCircle, label: 'Help Center', desc: 'FAQs & contact us' },
        ],
    },
]

export default function Profile() {
    return (
        <div className="pb-24 animate-fade-in min-h-screen">
            <Navbar />
            <div className="h-14" />

            {/* Profile Header */}
            <div className="px-4 pt-4 pb-6">
                <div className="flex items-center gap-4">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-glow"
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        <User size={28} strokeWidth={1.5} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Guest User</h1>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>guest@phonevault.com</p>
                    </div>
                    <button
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold active:scale-95 transition-all"
                        style={{
                            background: 'var(--bg-surface)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        Edit
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-5">
                    {[
                        { label: 'Orders', value: '0' },
                        { label: 'Wishlist', value: '0' },
                        { label: 'Reviews', value: '0' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl py-3 text-center dark-card"
                        >
                            <p className="text-lg font-bold gradient-text">{stat.value}</p>
                            <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Sections */}
            {menuSections.map((section, si) => (
                <div key={section.title} className="px-4 mb-5">
                    <h2 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                        {section.title}
                    </h2>
                    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        {section.items.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.label}
                                    className="flex items-center gap-3 w-full px-4 py-3.5 transition-colors text-left animate-slide-up"
                                    style={{
                                        borderBottom: i < section.items.length - 1 ? '1px solid var(--border-color)' : 'none',
                                        animationDelay: `${(si * 3 + i) * 40}ms`,
                                    }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ background: 'var(--bg-surface-hover)' }}
                                    >
                                        <Icon size={18} strokeWidth={1.8} style={{ color: 'var(--nav-active)' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                                    </div>
                                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}

            {/* Sign Out */}
            <div className="px-4 mt-2">
                <button
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold active:scale-[0.97] transition-all"
                    style={{
                        background: 'rgba(255, 59, 48, 0.08)',
                        color: '#ff3b30',
                        border: '1px solid rgba(255, 59, 48, 0.15)',
                    }}
                >
                    <LogOut size={18} strokeWidth={2} />
                    Sign Out
                </button>
            </div>

            {/* Version */}
            <p className="text-center text-[11px] mt-5" style={{ color: 'var(--text-muted)' }}>
                PhoneVault v1.0.0
            </p>
        </div>
    )
}
