import {useEffect, useState} from "react";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {EmergencyBanner} from "./EmergencyBanner";
import {HeroSection} from "./Tagline";
import {ActionButtons} from "./ActionButtons";
import {Statistics} from "./Statistics";
import {DonorsList} from "./DonorsList";
import {RequestModal} from "./BloodRequestModal";
import {DonorRegistration} from "./DonorRegistration";
import {DonorSearchService} from "../service/DonorSearchService";
import {QuickSearch} from "./search/QuickSearch";
import {AdvancedSearch} from "./search/AdvancedSearch";
import {Menu, X, Search, FileText, LayoutDashboard, ChevronLeft, ChevronRight, Heart} from "lucide-react";
import "../styles/home-common.css"
export default function BloodDonorFinder() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showRegForm, setShowRegForm] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalDonors: 2547,
        successfulDonations: 1892,
        livesSaved: 5676
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                totalDonors: prev.totalDonors + Math.floor(Math.random() * 3),
                successfulDonations: prev.successfulDonations + Math.floor(Math.random() * 2),
                livesSaved: prev.livesSaved + Math.floor(Math.random() * 5)
            }));
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = async (searchRequest) => {
        console.log("Search Request:", searchRequest);
        setLoading(true);
        setSearched(true);
        setError(null);
        try {
            const result = await DonorSearchService.searchDonors(searchRequest)
                .catch(err => {
                    throw new Error("Service unreachable");
                });
            const donors = Array.isArray(result?.data) ? result.data : [];
            setDonors(donors);
            if (donors.length === 0) {
                setError("No donors found matching your criteria.");
            }
        } catch (err) {
            console.error("Search failed:", err);
            setDonors([]);
            setError("Server is down, try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestBlood = (donor) => {
        setSelectedDonor(donor);
    };

    const handleLogin = () => {
        alert('Opening login modal...');
    };

    const handleSignup = () => {
        alert('Opening signup modal...');
    };

    const handleRegister = () => {
        setShowRegForm(true);
    };

    const handleCloseRegistration = () => {
        setShowRegForm(false);
    };

    const handlePostRequest = () => {
        alert('Redirecting to blood request form...');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'quick-search', label: 'Quick Search', icon: Search },
        { id: 'advanced-search', label: 'Advanced Search', icon: FileText }
    ];

    const handleMenuClick = (itemId) => {
        setActiveSection(itemId);
        if (itemId === 'dashboard') {
            setSearched(false);
            setDonors([]);
            setError(null);
        }
    };

    const renderContent = () => {
        switch(activeSection) {
            case 'dashboard':
                return (
                    <div className="dashboard-content">
                        <EmergencyBanner />
                        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                            <HeroSection />
                            <ActionButtons onRegister={handleRegister} onPostRequest={handlePostRequest} />
                            <Statistics stats={stats} />
                        </div>
                    </div>
                );

            case 'quick-search':
                return (
                    <div className="quick-search-content">
                        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <Search className="w-6 h-6 mr-3 text-red-500" />
                                Quick Search
                            </h2>
                            <QuickSearch
                                onSearch={handleSearch}
                                isLoading={loading}
                                onAdvancedClick={() => setActiveSection('advanced-search')}
                            />

                            {loading && (
                                <div className="text-center py-16">
                                    <div className="inline-block w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-xl text-gray-700 font-semibold">Searching for donors...</p>
                                </div>
                            )}

                            {searched && !loading && (
                                <div className="mt-8">
                                    {error && (
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                            <p className="text-yellow-800">{error}</p>
                                        </div>
                                    )}
                                    <DonorsList donors={donors} onRequestBlood={handleRequestBlood} />
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'advanced-search':
                return (
                    <div className="advanced-search-content">
                        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FileText className="w-6 h-6 mr-3 text-red-500" />
                                Advanced Search
                            </h2>
                            <AdvancedSearch
                                onSearch={handleSearch}
                                isLoading={loading}
                                onClose={() => setActiveSection('quick-search')}
                            />

                            {loading && (
                                <div className="text-center py-16">
                                    <div className="inline-block w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-xl text-gray-700 font-semibold">Searching for donors...</p>
                                </div>
                            )}

                            {searched && !loading && (
                                <div className="mt-8">
                                    {error && (
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                            <p className="text-yellow-800">{error}</p>
                                        </div>
                                    )}
                                    <DonorsList donors={donors} onRequestBlood={handleRequestBlood} />
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="wrapper">
            <Header onLogin={handleLogin} onSignup={handleSignup} />

            <div className="main-layout">
                {/* AdminLTE Style Sidebar */}
                <aside className={`main-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    {/* Sidebar Brand */}
                    <div className="brand-section">
                        {!sidebarCollapsed ? (
                            <div className="brand-content">
                                <Heart className="brand-icon" />
                                <span className="brand-text">Blood Finder</span>
                            </div>
                        ) : (
                            <Heart className="brand-icon-collapsed" />
                        )}
                    </div>

                    {/* Sidebar Menu */}
                    <nav className="sidebar-nav">
                        <ul className="nav-list">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <li key={item.id} className="nav-item">
                                        <button
                                            onClick={() => handleMenuClick(item.id)}
                                            className={`nav-link ${isActive ? 'active' : ''}`}
                                            title={sidebarCollapsed ? item.label : ''}
                                        >
                                            <Icon className="nav-icon" />
                                            {!sidebarCollapsed && <span className="nav-text">{item.label}</span>}
                                            {isActive && <span className="active-indicator"></span>}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="sidebar-footer">
                        {!sidebarCollapsed ? (
                            <p className="footer-text">Saving Lives Together</p>
                        ) : (
                            <span className="footer-icon">💉</span>
                        )}
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="sidebar-toggle"
                        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="toggle-icon" />
                        ) : (
                            <ChevronLeft className="toggle-icon" />
                        )}
                    </button>
                </aside>

                {/* Content Wrapper */}
                <div className={`content-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
                    <main className="main-content">
                        {renderContent()}
                    </main>

                    <Footer />
                </div>
            </div>

            {/* Modals */}
            {selectedDonor && (
                <RequestModal
                    donor={selectedDonor}
                    onClose={() => setSelectedDonor(null)}
                />
            )}

            {showRegForm && (
                <DonorRegistration onClose={handleCloseRegistration} />
            )}

        </div>
    );
}