import { useState } from "react";
import { Droplet, MapPin, Clock, Search, Building2, Map, Hash, Phone, Mail, AlertCircle, Navigation, Hospital } from "lucide-react";
import "../styles/search-form.css";

const BLOOD_GROUPS = [
    { value: 'A_POSITIVE', display: 'A+' },
    { value: 'A_NEGATIVE', display: 'A-' },
    { value: 'B_POSITIVE', display: 'B+' },
    { value: 'B_NEGATIVE', display: 'B-' },
    { value: 'AB_POSITIVE', display: 'AB+' },
    { value: 'AB_NEGATIVE', display: 'AB-' },
    { value: 'O_POSITIVE', display: 'O+' },
    { value: 'O_NEGATIVE', display: 'O-' }
];

const EMERGENCY_LEVELS = [
    { value: 'EMERGENCY', label: 'Emergency (Within hours)', color: 'red' },
    { value: 'URGENT', label: 'Urgent (Within 24 hours)', color: 'orange' },
    { value: 'NORMAL', label: 'Normal (Within 7 days)', color: 'green' }
];

const SEARCH_RADIUS = [
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' },
    { value: 100, label: '100 km' }
];

export const DonorSearchForm = ({ onSearch, isLoading }) => {
    const [searchRequest, setSearchRequest] = useState({
        bloodGroup: '',
        geoLocation: {
            address: '',
            city: '',
            district: '',
            latitude: null,
            longitude: null,
            zipcode: ''
        },
        radius: 10,
        receiverEmail: '',
        receiverPhone: '',
        emergencyLevel: '',
        requestDescription: '',
        hospitalName: ''
    });

    const [errors, setErrors] = useState({});
    const [showAdvanced, setShowAdvanced] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!searchRequest.bloodGroup) {
            newErrors.bloodGroup = 'Blood group is required';
        }

        if (!searchRequest.geoLocation.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!searchRequest.geoLocation.district.trim()) {
            newErrors.district = 'District is required';
        }

        if (!searchRequest.emergencyLevel) {
            newErrors.emergencyLevel = 'Emergency level is required';
        }

        if (searchRequest.receiverEmail && !validateEmail(searchRequest.receiverEmail)) {
            newErrors.receiverEmail = 'Invalid email format';
        }

        if (searchRequest.receiverPhone && !validatePhone(searchRequest.receiverPhone)) {
            newErrors.receiverPhone = 'Invalid phone format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\d\s\-+()]{10,15}$/;
        return phoneRegex.test(phone);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchRequest(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setSearchRequest(prev => ({
            ...prev,
            geoLocation: {
                ...prev.geoLocation,
                [name]: value
            }
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleQuickSearch = (bloodGroup) => {
        setSearchRequest(prev => ({ ...prev, bloodGroup }));
        if (errors.bloodGroup) {
            setErrors(prev => ({ ...prev, bloodGroup: '' }));
        }
    };

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setSearchRequest(prev => ({
                        ...prev,
                        geoLocation: {
                            ...prev.geoLocation,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to get location. Please enter manually.");
                }
            );
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }
        onSearch(searchRequest);
    };

    return (
        <div className="enhanced-search-form">
            {/* Basic Search Section */}
            <div className="search-section basic-section">
                <h3 className="section-heading">Basic Information</h3>

                <div className="form-grid-3">
                    {/* Blood Group */}
                    <div className="form-field">
                        <label className="field-label">
                            Blood Type Needed *
                        </label>
                        <div className="input-container">
                            <Droplet className="field-icon text-red-500" />
                            <select
                                name="bloodGroup"
                                value={searchRequest.bloodGroup}
                                onChange={handleInputChange}
                                className={`field-input ${errors.bloodGroup ? 'error' : ''}`}
                            >
                                <option value="">Select Blood Type</option>
                                {BLOOD_GROUPS.map(group => (
                                    <option key={group.value} value={group.value}>
                                        {group.display}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.bloodGroup && <span className="field-error">{errors.bloodGroup}</span>}
                    </div>

                    {/* Emergency Level */}
                    <div className="form-field">
                        <label className="field-label">
                            Urgency Level *
                        </label>
                        <div className="input-container">
                            <Clock className="field-icon" />
                            <select
                                name="emergencyLevel"
                                value={searchRequest.emergencyLevel}
                                onChange={handleInputChange}
                                className={`field-input ${errors.emergencyLevel ? 'error' : ''}`}
                            >
                                <option value="">Select Urgency</option>
                                {EMERGENCY_LEVELS.map(level => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.emergencyLevel && <span className="field-error">{errors.emergencyLevel}</span>}
                    </div>

                    {/* Search Radius */}
                    <div className="form-field">
                        <label className="field-label">
                            Search Radius
                        </label>
                        <div className="input-container">
                            <Navigation className="field-icon" />
                            <select
                                name="radius"
                                value={searchRequest.radius}
                                onChange={handleInputChange}
                                className="field-input"
                            >
                                {SEARCH_RADIUS.map(r => (
                                    <option key={r.value} value={r.value}>
                                        {r.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Quick Blood Type Selection */}
                <div className="quick-select-section">
                    <p className="quick-select-label">Quick Select:</p>
                    <div className="blood-types-grid-compact">
                        {BLOOD_GROUPS.map(group => (
                            <button
                                key={group.value}
                                type="button"
                                onClick={() => handleQuickSearch(group.value)}
                                className={`blood-type-chip ${searchRequest.bloodGroup === group.value ? 'active' : ''}`}
                            >
                                {group.display}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location Section */}
            <div className="search-section location-section">
                <div className="section-header-with-action">
                    <h3 className="section-heading">Location Details</h3>
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="location-btn"
                    >
                        <MapPin className="w-4 h-4" />
                        Use My Location
                    </button>
                </div>

                <div className="form-grid-2">
                    <div className="form-field">
                        <label className="field-label">City *</label>
                        <div className="input-container">
                            <Building2 className="field-icon" />
                            <input
                                type="text"
                                name="city"
                                value={searchRequest.geoLocation.city}
                                onChange={handleLocationChange}
                                placeholder="e.g., Dhaka"
                                className={`field-input ${errors.city ? 'error' : ''}`}
                            />
                        </div>
                        {errors.city && <span className="field-error">{errors.city}</span>}
                    </div>

                    <div className="form-field">
                        <label className="field-label">District *</label>
                        <div className="input-container">
                            <Map className="field-icon" />
                            <input
                                type="text"
                                name="district"
                                value={searchRequest.geoLocation.district}
                                onChange={handleLocationChange}
                                placeholder="e.g., Dhaka"
                                className={`field-input ${errors.district ? 'error' : ''}`}
                            />
                        </div>
                        {errors.district && <span className="field-error">{errors.district}</span>}
                    </div>

                    <div className="form-field full-width">
                        <label className="field-label">Address</label>
                        <div className="input-container">
                            <MapPin className="field-icon" />
                            <input
                                type="text"
                                name="address"
                                value={searchRequest.geoLocation.address}
                                onChange={handleLocationChange}
                                placeholder="Street address or area"
                                className="field-input"
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label className="field-label">Zip Code</label>
                        <div className="input-container">
                            <Hash className="field-icon" />
                            <input
                                type="text"
                                name="zipcode"
                                value={searchRequest.geoLocation.zipcode}
                                onChange={handleLocationChange}
                                placeholder="e.g., 1205"
                                className="field-input"
                            />
                        </div>
                    </div>
                </div>

                {(searchRequest.geoLocation.latitude && searchRequest.geoLocation.longitude) && (
                    <div className="location-coordinates">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>
                            Coordinates: {searchRequest.geoLocation.latitude.toFixed(6)},
                            {searchRequest.geoLocation.longitude.toFixed(6)}
                        </span>
                    </div>
                )}
            </div>

            {/* Advanced Options Toggle */}
            <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="advanced-toggle"
            >
                {showAdvanced ? '▼' : '▶'} Advanced Options (Optional)
            </button>

            {/* Advanced Section */}
            {showAdvanced && (
                <div className="search-section advanced-section">
                    <h3 className="section-heading">Additional Information</h3>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label className="field-label">Receiver Email</label>
                            <div className="input-container">
                                <Mail className="field-icon" />
                                <input
                                    type="email"
                                    name="receiverEmail"
                                    value={searchRequest.receiverEmail}
                                    onChange={handleInputChange}
                                    placeholder="receiver@example.com"
                                    className={`field-input ${errors.receiverEmail ? 'error' : ''}`}
                                />
                            </div>
                            {errors.receiverEmail && <span className="field-error">{errors.receiverEmail}</span>}
                        </div>

                        <div className="form-field">
                            <label className="field-label">Receiver Phone</label>
                            <div className="input-container">
                                <Phone className="field-icon" />
                                <input
                                    type="tel"
                                    name="receiverPhone"
                                    value={searchRequest.receiverPhone}
                                    onChange={handleInputChange}
                                    placeholder="+880 1234-567890"
                                    className={`field-input ${errors.receiverPhone ? 'error' : ''}`}
                                />
                            </div>
                            {errors.receiverPhone && <span className="field-error">{errors.receiverPhone}</span>}
                        </div>

                        <div className="form-field">
                            <label className="field-label">Hospital Name</label>
                            <div className="input-container">
                                <Hospital className="field-icon" />
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={searchRequest.hospitalName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., City General Hospital"
                                    className="field-input"
                                />
                            </div>
                        </div>

                        <div className="form-field full-width">
                            <label className="field-label">Request Description</label>
                            <div className="input-container">
                                <AlertCircle className="field-icon" />
                                <textarea
                                    name="requestDescription"
                                    value={searchRequest.requestDescription}
                                    onChange={handleInputChange}
                                    placeholder="Describe the patient condition, reason for blood requirement, etc."
                                    className="field-textarea"
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Button */}
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="search-submit-btn"
            >
                {isLoading ? (
                    <>
                        <div className="btn-spinner"></div>
                        <span>Searching...</span>
                    </>
                ) : (
                    <>
                        <Search className="w-5 h-5" />
                        <span>Search Donors</span>
                    </>
                )}
            </button>
        </div>
    );
};