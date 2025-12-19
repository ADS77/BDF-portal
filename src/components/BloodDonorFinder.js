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
import {Menu, X, Search, FileText, LayoutDashboard} from "lucide-react";

export default function BloodDonorFinder() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const renderContent = () => {
        switch(activeSection) {
            case 'dashboard':
                return (
                    <>
                        <EmergencyBanner />
                        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                            <HeroSection />
                            {!searched && (
                                <>
                                    <ActionButtons onRegister={handleRegister} onPostRequest={handlePostRequest} />
                                    <Statistics stats={stats} />
                                </>
                            )}
                        </div>
                    </>
                );

            case 'quick-search':
                return (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
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
                                <DonorsList donors={donors} onRequestBlood={handleRequestBlood} />
                                <ActionButtons onRegister={handleRegister} onPostRequest={handlePostRequest} />
                                <Statistics stats={stats} />
                            </div>
                        )}
                    </div>
                );

            case 'advanced-search':
                return (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
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
                                <DonorsList donors={donors} onRequestBlood={handleRequestBlood} />
                                <ActionButtons onRegister={handleRegister} onPostRequest={handlePostRequest} />
                                <Statistics stats={stats} />
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            <Header onLogin={handleLogin} onSignup={handleSignup} />

            <div className="flex pt-20">
                {/* Sidebar */}
                <div className={`fixed lg:static inset-y-0 left-0 top-20 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-gray-200 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                    <div className="flex flex-col h-full">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                                Navigation
                            </h3>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <nav className="space-y-3">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeSection === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveSection(item.id);
                                                setSidebarOpen(false);
                                                if (item.id === 'dashboard') {
                                                    setSearched(false);
                                                    setDonors([]);
                                                }
                                            }}
                                            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-200 transform ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:scale-102'
                                            }`}
                                        >
                                            <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                                            <span className="font-semibold text-base">{item.label}</span>
                                            {isActive && (
                                                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-red-50 to-pink-50">
                            <p className="text-xs text-gray-600 text-center">
                                💉 Saving lives together
                            </p>
                        </div>
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <div className="flex-1 min-h-screen lg:ml-0">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden fixed top-24 left-4 z-50 bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <main className="w-full px-6 lg:px-8 py-8">
                        {renderContent()}
                    </main>
                </div>
            </div>

            <Footer />

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