import {
    Search,
    LayoutDashboard,
    History,
    Users,
    Settings,
    UserCircle,
    Menu,
    X,
    Droplet,
    MapPin,
    Phone,
    Mail,
    Heart,
    Clock,
    Award,
    ChevronRight,
    Filter,
    TrendingUp
} from 'lucide-react';

// Sidebar Component
export const Sidebar = ({ isOpen, toggleSidebar, activeSection, setActiveSection }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'quick-search', icon: Search, label: 'Quick Search' },
        { id: 'advanced-search', icon: Filter, label: 'Advanced Search' },
        { id: 'history', icon: History, label: 'History' },
        { id: 'donors', icon: Users, label: 'Donor List' },
        { id: 'profile', icon: UserCircle, label: 'Profile' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-50 transition-all duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:sticky lg:top-0`}
                style={{ width: '280px' }}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                            <Droplet className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-gray-900">LifeLink</h1>
                            <p className="text-xs text-gray-500">Blood Donor Finder</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                if (window.innerWidth < 1024) toggleSidebar();
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeSection === item.id
                                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-200'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {activeSection === item.id && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Profile Card */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gradient-to-t from-gray-50">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                            <UserCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-gray-900 truncate">Guest User</p>
                            <p className="text-xs text-gray-500">View Profile</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};