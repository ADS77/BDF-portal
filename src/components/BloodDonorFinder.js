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
import {SearchSwitcher} from "./search/SearchSwitcher";
import {Sidebar } from "./SideBar";

export default function BloodDonorFinder() {
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
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-pink-50/30 font-['Poppins',sans-serif]">
            <Header onLogin={handleLogin} onSignup={handleSignup} />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <EmergencyBanner />

                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                    <HeroSection />
                    <SearchSwitcher onSearch={handleSearch} isLoading={loading} />
                    {!searched && (
                        <>
                            <ActionButtons onRegister={handleRegister} onPostRequest={handlePostRequest} />
                            <Statistics stats={stats} />
                        </>
                    )}
                </div>

                {loading && (
                    <div className="text-center py-16">
                        <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-xl text-white font-semibold">Searching for donors...</p>
                    </div>
                )}

                {searched && !loading && (
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <DonorsList donors={donors} onRequestBlood={handleRequestBlood} />
                        <ActionButtons onRegister={handleRegister} onPostRequest={handlePostRequest} />
                        <Statistics stats={stats} />
                    </div>
                )}
            </main>





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