

import { useEffect, useState } from "react";
import { Menu, X, Search, FileText, LayoutDashboard } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./SideBar";
import { QuickSearch } from "./search/QuickSearch";
import { AdvancedSearch } from "./search/AdvancedSearch";
import { RequestModal } from "./BloodRequestModal";
import { DonorRegistration } from "./DonorRegistration";
import { DonorSearchService } from "../service/DonorSearchService";
import "../styles/main.css";
import "../styles/sidebar.css";
import "../styles/pages.css";

export default function BDFV2() {
    // UI State
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');

    // Data State
    const [donors, setDonors] = useState([]);
    const [stats, setStats] = useState({
        totalDonors: 2547,
        successfulDonations: 1892,
        livesSaved: 5676
    });

    // Search State
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);

    // Modal State
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showRegForm, setShowRegForm] = useState(false);

    // Stats Animation
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

    // Handlers
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

    const handleNavigation = (sectionId) => {
        setActiveSection(sectionId);
        setSidebarOpen(false);

        if (sectionId === 'dashboard') {
            setSearched(false);
            setDonors([]);
            setError(null);
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

    const handlePostRequest = () => {
        alert('Redirecting to blood request form...');
    };

    // Menu Configuration
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'quick-search', label: 'Quick Search', icon: Search },
        { id: 'advanced-search', label: 'Advanced Search', icon: FileText }
    ];

    // Page Props
    const commonPageProps = {
        donors,
        loading,
        searched,
        error,
        stats,
        onSearch: handleSearch,
        onRequestBlood: handleRequestBlood,
        onRegister: handleRegister,
        onPostRequest: handlePostRequest
    };

    // Render Active Page
    const renderPage = () => {
        switch(activeSection) {
          /*  case 'dashboard':
                return <Dashboard {...commonPageProps} />;
*/
            case 'quick-search':
                return (
                    <QuickSearch
                        {...commonPageProps}
                        onAdvancedClick={() => handleNavigation('advanced-search')}
                    />
                );

            case 'advanced-search':
                return (
                    <AdvancedSearch
                        {...commonPageProps}
                        onClose={() => handleNavigation('quick-search')}
                    />
                );

            default:
                return ;
                //return <Dashboard {...commonPageProps} />;
        }
    };

    return (
        <div className="app-container">
            <Header onLogin={handleLogin} onSignup={handleSignup} />

            <div className="app-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    activeSection={activeSection}
                    menuItems={menuItems}
                    onNavigate={handleNavigation}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="main-content">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="mobile-menu-btn"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <main className="page-content">
                        {renderPage()}
                    </main>
                </div>
            </div>

            <Footer />

            {/* Modals */}
            {selectedDonor && (
                <RequestModal
                    donor={selectedDonor}
                    onClose={() => setSelectedDonor(null)}
                />
            )}

            {showRegForm && (
                <DonorRegistration onClose={() => setShowRegForm(false)} />
            )}
        </div>
    );
}

