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
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-primary/20">
                        <User size={28} strokeWidth={1.5} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold">Guest User</h1>
                        <p className="text-sm text-muted">guest@phonevault.com</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-surface text-xs font-semibold hover:bg-gray-200 active:scale-95 transition-all">
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
                            className="bg-surface rounded-2xl py-3 text-center"
                        >
                            <p className="text-lg font-bold">{stat.value}</p>
                            <p className="text-[10px] font-medium text-muted uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Sections */}
            {menuSections.map((section, si) => (
                <div key={section.title} className="px-4 mb-5">
                    <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                        {section.title}
                    </h2>
                    <div className="bg-surface rounded-2xl overflow-hidden">
                        {section.items.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.label}
                                    className={`flex items-center gap-3 w-full px-4 py-3.5 hover:bg-gray-100 active:bg-gray-200 transition-colors text-left ${i < section.items.length - 1 ? 'border-b border-border/50' : ''
                                        } animate-slide-up`}
                                    style={{ animationDelay: `${(si * 3 + i) * 40}ms` }}
                                >
                                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                        <Icon size={18} strokeWidth={1.8} className="text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold">{item.label}</p>
                                        <p className="text-xs text-muted truncate">{item.desc}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-muted flex-shrink-0" />
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}

            {/* Sign Out */}
            <div className="px-4 mt-2">
                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-danger/5 text-danger text-sm font-semibold hover:bg-danger/10 active:scale-[0.97] transition-all">
                    <LogOut size={18} strokeWidth={2} />
                    Sign Out
                </button>
            </div>

            {/* Version */}
            <p className="text-center text-[11px] text-muted mt-5">
                PhoneVault v1.0.0
            </p>
        </div>
    )
}
