
                            import { Search, Heart, Users, Award, Phone, MapPin, Clock, User, UserPlus, HelpCircle } from 'lucide-react';
                            import './Home.css';

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
                            const [statsUpdated, setStatsUpdated] = useState(false);

                            const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

                            // Simulate stats update
                            useEffect(() => {
                            const interval = setInterval(() => {
                            setStats(prev => ({
                            totalDonors: prev.totalDonors + Math.floor(Math.random() * 3),
                            successfulDonations: prev.successfulDonations + Math.floor(Math.random() * 2),
                            livesSaved: prev.livesSaved + Math.floor(Math.random() * 5)
                        }));

                            // Trigger animation
                            setStatsUpdated(true);
                            setTimeout(() => setStatsUpdated(false), 600);
                        }, 30000);

                            return () => clearInterval(interval);
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