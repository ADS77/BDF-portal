import React, { useState, useEffect } from 'react';
import { Search, Heart, Users, Award, Phone, MapPin, Clock, User, UserPlus, HelpCircle } from 'lucide-react';

const BloodDonorHomePage = () => {
    const [searchData, setSearchData] = useState({
        bloodType: '',
        location: '',
        urgency: ''
    });

    const [stats, setStats] = useState({
        totalDonors: 2547,
        successfulDonations: 1892,
        livesSaved: 5676
    });

    const [isLoading, setIsLoading] = useState(false);

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        header: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        },
        nav: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: 'white'
        },
        navLinks: {
            display: 'flex',
            gap: '1rem'
        },
        navButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white',
            background: 'transparent',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'background 0.3s',
            fontSize: '1rem'
        },
        main: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        },
        emergencyBanner: {
            background: 'linear-gradient(45deg, #ff4757, #ff3838)',
            color: 'white',
            padding: '1rem',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
        },
        mainContent: {
            background: 'white',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        },
        heroSection: {
            textAlign: 'center',
            marginBottom: '3rem'
        },
        heroTitle: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem'
        },
        heroSubtitle: {
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
        },
        searchSection: {
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            marginBottom: '3rem'
        },
        searchGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        },
        label: {
            fontWeight: '600',
            color: '#555',
            fontSize: '0.9rem'
        },
        input: {
            padding: '0.8rem',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s'
        },
        inputWithIcon: {
            position: 'relative'
        },
        icon: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
        },
        inputPadded: {
            paddingLeft: '2.5rem'
        },
        searchButton: {
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            margin: '0 auto'
        },
        bloodTypesSection: {
            marginBottom: '3rem'
        },
        sectionTitle: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333',
            marginBottom: '2rem'
        },
        bloodGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: '400px',
            margin: '0 auto'
        },
        bloodType: {
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s',
            border: 'none'
        },
        actionButtons: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap'
        },
        primaryButton: {
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        secondaryButton: {
            background: 'linear-gradient(45deg, #26d0ce, #1a2a6c)',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        statsSection: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
        },
        statCard: {
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center'
        },
        statIcon: {
            margin: '0 auto 1rem',
            color: '#667eea'
        },
        statTitle: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
        },
        statNumber: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#667eea'
        },
        footer: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            textAlign: 'center',
            padding: '2rem 0'
        },
        footerContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
        },
        spinner: {
            width: '20px',
            height: '20px',
            border: '2px solid transparent',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    };

    // Add hover effects
    const [hoveredElement, setHoveredElement] = useState(null);

    // Simulate stats update
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

    // Add CSS animation keyframes
    useEffect(() => {
        const styleSheet = document.styleSheets[0];
        const keyframes = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
        try {
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        } catch (e) {
            // Ignore if already exists
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        if (!searchData.bloodType || !searchData.location || !searchData.urgency) {
            alert('Please fill in all required fields');
            return;
        }

        setIsLoading(true);

        try {
            // Replace this with your actual API call
            console.log('Searching for donors:', searchData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert(`Found donors for ${searchData.bloodType} in ${searchData.location}`);

            // Example API integration:
            // const response = await fetch('/api/search-donors', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(searchData)
            // });
            // const donors = await response.json();

        } catch (error) {
            console.error('Search failed:', error);
            alert('Search failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickSearch = (bloodType) => {
        setSearchData(prev => ({
            ...prev,
            bloodType
        }));

        if (searchData.location) {
            console.log(`Quick searching for ${bloodType} in ${searchData.location}`);
        }
    };

    const handleRegisterDonor = () => {
        console.log('Navigate to donor registration');
        alert('Redirecting to donor registration...');
    };

    const handlePostRequest = () => {
        console.log('Navigate to post blood request');
        alert('Redirecting to blood request form...');
    };

    const handleLogin = () => {
        console.log('Navigate to login');
        alert('Opening login modal...');
    };

    const handleSignup = () => {
        console.log('Navigate to signup');
        alert('Opening signup modal...');
    };

    const getHoverStyle = (elementName, baseStyle) => {
        if (hoveredElement === elementName) {
            return {
                ...baseStyle,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            };
        }
        return baseStyle;
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <nav style={styles.nav}>
                    <div style={styles.logo}>
                        <Heart size={32} color="#ff6b6b" />
                        <span>BloodConnect</span>
                    </div>
                    <div style={styles.navLinks}>
                        <button
                            style={styles.navButton}
                            onClick={handleLogin}
                            onMouseEnter={() => setHoveredElement('login')}
                            onMouseLeave={() => setHoveredElement(null)}
                        >
                            <User size={16} />
                            <span>Login</span>
                        </button>
                        <button
                            style={styles.navButton}
                            onClick={handleSignup}
                            onMouseEnter={() => setHoveredElement('signup')}
                            onMouseLeave={() => setHoveredElement(null)}
                        >
                            <UserPlus size={16} />
                            <span>Sign Up</span>
                        </button>
                        <button
                            style={styles.navButton}
                            onMouseEnter={() => setHoveredElement('help')}
                            onMouseLeave={() => setHoveredElement(null)}
                        >
                            <HelpCircle size={16} />
                            <span>Help</span>
                        </button>
                    </div>
                </nav>
            </header>

            <main style={styles.main}>
                {/* Emergency Banner */}
                <div style={styles.emergencyBanner}>
                    <Phone size={20} />
                    <span style={{ fontWeight: '600' }}>URGENT: O- blood needed at City Hospital!</span>
                    <span>Contact: +1234567890</span>
                </div>

                {/* Main Content */}
                <div style={styles.mainContent}>
                    {/* Hero Section */}
                    <div style={styles.heroSection}>
                        <h1 style={styles.heroTitle}>Find Blood Donors Instantly</h1>
                        <p style={styles.heroSubtitle}>
                            Connect with registered blood donors in your area and save lives
                        </p>
                    </div>

                    {/* Search Section */}
                    <div style={styles.searchSection}>
                        <div style={styles.searchGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Blood Type Needed</label>
                                <select
                                    name="bloodType"
                                    value={searchData.bloodType}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                >
                                    <option value="">Select Blood Type</option>
                                    {bloodTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Location</label>
                                <div style={styles.inputWithIcon}>
                                    <MapPin size={20} style={styles.icon} />
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Enter city or area"
                                        value={searchData.location}
                                        onChange={handleInputChange}
                                        style={{...styles.input, ...styles.inputPadded}}
                                    />
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Urgency Level</label>
                                <div style={styles.inputWithIcon}>
                                    <Clock size={20} style={styles.icon} />
                                    <select
                                        name="urgency"
                                        value={searchData.urgency}
                                        onChange={handleInputChange}
                                        style={{...styles.input, ...styles.inputPadded}}
                                    >
                                        <option value="">Select Urgency</option>
                                        <option value="emergency">Emergency (Within hours)</option>
                                        <option value="urgent">Urgent (Within 24 hours)</option>
                                        <option value="normal">Normal (Within 7 days)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            style={getHoverStyle('searchBtn', styles.searchButton)}
                            onMouseEnter={() => setHoveredElement('searchBtn')}
                            onMouseLeave={() => setHoveredElement(null)}
                        >
                            {isLoading ? (
                                <div style={styles.spinner}></div>
                            ) : (
                                <>
                                    <Search size={20} />
                                    <span>Find Donors</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Quick Blood Type Selection */}
                    <div style={styles.bloodTypesSection}>
                        <h2 style={styles.sectionTitle}>Quick Search by Blood Type</h2>
                        <div style={styles.bloodGrid}>
                            {bloodTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => handleQuickSearch(type)}
                                    style={getHoverStyle(`blood-${type}`, styles.bloodType)}
                                    onMouseEnter={() => setHoveredElement(`blood-${type}`)}
                                    onMouseLeave={() => setHoveredElement(null)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={styles.actionButtons}>
                        <button
                            onClick={handleRegisterDonor}
                            style={getHoverStyle('register', styles.primaryButton)}
                            onMouseEnter={() => setHoveredElement('register')}
                            onMouseLeave={() => setHoveredElement(null)}
                        >
                            <Users size={20} />
                            <span>Register as Donor</span>
                        </button>
                        <button
                            onClick={handlePostRequest}
                            style={getHoverStyle('postRequest', styles.secondaryButton)}
                            onMouseEnter={() => setHoveredElement('postRequest')}
                            onMouseLeave={() => setHoveredElement(null)}
                        >
                            <Heart size={20} />
                            <span>Post Blood Request</span>
                        </button>
                    </div>

                    {/* Statistics */}
                    <div style={styles.statsSection}>
                        <div style={styles.statCard}>
                            <Users size={48} style={styles.statIcon} />
                            <h3 style={styles.statTitle}>Total Registered Donors</h3>
                            <span style={styles.statNumber}>{stats.totalDonors.toLocaleString()}</span>
                        </div>
                        <div style={styles.statCard}>
                            <Award size={48} style={{...styles.statIcon, color: '#22c55e'}} />
                            <h3 style={styles.statTitle}>Successful Donations</h3>
                            <span style={{...styles.statNumber, color: '#22c55e'}}>{stats.successfulDonations.toLocaleString()}</span>
                        </div>
                        <div style={styles.statCard}>
                            <Heart size={48} style={{...styles.statIcon, color: '#ef4444'}} />
                            <h3 style={styles.statTitle}>Lives Saved</h3>
                            <span style={{...styles.statNumber, color: '#ef4444'}}>{stats.livesSaved.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <p style={{ marginBottom: '0.5rem' }}>&copy; 2024 BloodConnect. Saving lives, one donation at a time.</p>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Phone size={16} />
                        <span>Emergency Helpline: +1-800-BLOOD-HELP</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default BloodDonorHomePage;