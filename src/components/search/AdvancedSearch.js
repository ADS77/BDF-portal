import {getCurrentLocation} from "../../Utils";
import {useState} from "react";
import {BLOOD_GROUPS, EMERGENCY_LEVELS, SEARCH_RADIUS} from "../../Constants";
import {LocationButton} from "../SharedComponents";
import {Building2, Map, MapPin, Hash, Clock, Navigation, Search, X} from "lucide-react";
import "../../styles/advanced-search.css"

export const AdvancedSearch = ({ onSearch, isLoading, onClose }) => {
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
        radius: 30,
        emergencyLevel: '',
        receiverEmail: '',
        receiverPhone: '',
        requestDescription: '',
        hospitalName: ''
    });
    const [errors, setErrors] = useState({});
    const [locationLoading, setLocationLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!searchRequest.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        if (!searchRequest.geoLocation.city.trim()) newErrors.city = 'City is required';
        if (!searchRequest.geoLocation.district.trim()) newErrors.district = 'District is required';
        if (!searchRequest.emergencyLevel) newErrors.emergencyLevel = 'Emergency level is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchRequest(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setSearchRequest(prev => ({
            ...prev,
            geoLocation: { ...prev.geoLocation, [name]: value }
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleBloodGroupChange = (bloodGroup) => {
        setSearchRequest(prev => ({ ...prev, bloodGroup }));
        if (errors.bloodGroup) setErrors(prev => ({ ...prev, bloodGroup: '' }));
    };

    const handleGetLocation = async () => {
        setLocationLoading(true);
        try {
            const location = await getCurrentLocation();
            setSearchRequest(prev => ({
                ...prev,
                geoLocation: {
                    ...prev.geoLocation,
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            }));
        } catch (error) {
            alert("Unable to get location. Please enable location services.");
        } finally {
            setLocationLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        onSearch(searchRequest);
    };

    return (
        <div className="advanced-search-container">
            <div className="advanced-search-header">
                <div>
                    <h3 className="advanced-search-title">Advanced Blood Search</h3>
                    <p className="advanced-search-subtitle">Detailed search with more options</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="advanced-close-btn">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="advanced-section">
                <h4 className="advanced-section-title">Essential Information</h4>

                <div className="advanced-field-group">
                    <label className="advanced-label">Blood Type *</label>
                    <div className="blood-types-grid-advanced">
                        {BLOOD_GROUPS.map(group => (
                            <button
                                key={group.value}
                                type="button"
                                onClick={() => handleBloodGroupChange(group.value)}
                                className={`blood-chip-advanced ${searchRequest.bloodGroup === group.value ? 'active' : ''}`}
                            >
                                {group.display}
                            </button>
                        ))}
                    </div>
                    {errors.bloodGroup && <span className="advanced-error">{errors.bloodGroup}</span>}
                </div>

                <div className="advanced-grid-2">
                    <div className="advanced-field">
                        <label className="advanced-label">Urgency Level *</label>
                        <div className="advanced-input-wrapper">
                            <Clock className="advanced-input-icon" />
                            <select
                                name="emergencyLevel"
                                value={searchRequest.emergencyLevel}
                                onChange={handleInputChange}
                                className={`advanced-input ${errors.emergencyLevel ? 'error' : ''}`}
                            >
                                <option value="">Select Urgency</option>
                                {EMERGENCY_LEVELS.map(level => (
                                    <option key={level.value} value={level.value}>{level.label}</option>
                                ))}
                            </select>
                        </div>
                        {errors.emergencyLevel && <span className="advanced-error">{errors.emergencyLevel}</span>}
                    </div>

                    <div className="advanced-field">
                        <label className="advanced-label">Search Radius</label>
                        <div className="advanced-input-wrapper">
                            <Navigation className="advanced-input-icon" />
                            <select
                                name="radius"
                                value={searchRequest.radius}
                                onChange={handleInputChange}
                                className="advanced-input"
                            >
                                {SEARCH_RADIUS.map(r => (
                                    <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="advanced-section">
                <div className="advanced-section-header">
                    <h4 className="advanced-section-title">Location Details</h4>
                    <LocationButton
                        onClick={handleGetLocation}
                        isLoading={locationLoading}
                        className="location-btn-advanced"
                    />
                </div>

                <div className="advanced-grid-2">
                    <div className="advanced-field">
                        <label className="advanced-label">City *</label>
                        <div className="advanced-input-wrapper">
                            <Building2 className="advanced-input-icon" />
                            <input
                                type="text"
                                name="city"
                                value={searchRequest.geoLocation.city}
                                onChange={handleLocationChange}
                                placeholder="e.g., Dhaka"
                                className={`advanced-input ${errors.city ? 'error' : ''}`}
                            />
                        </div>
                        {errors.city && <span className="advanced-error">{errors.city}</span>}
                    </div>

                    <div className="advanced-field">
                        <label className="advanced-label">District *</label>
                        <div className="advanced-input-wrapper">
                            <Map className="advanced-input-icon" />
                            <input
                                type="text"
                                name="district"
                                value={searchRequest.geoLocation.district}
                                onChange={handleLocationChange}
                                placeholder="e.g., Dhaka"
                                className={`advanced-input ${errors.district ? 'error' : ''}`}
                            />
                        </div>
                        {errors.district && <span className="advanced-error">{errors.district}</span>}
                    </div>

                    <div className="advanced-field full-width">
                        <label className="advanced-label">Address</label>
                        <div className="advanced-input-wrapper">
                            <MapPin className="advanced-input-icon" />
                            <input
                                type="text"
                                name="address"
                                value={searchRequest.geoLocation.address}
                                onChange={handleLocationChange}
                                placeholder="Street, area"
                                className="advanced-input"
                            />
                        </div>
                    </div>

                    <div className="advanced-field">
                        <label className="advanced-label">Zip Code</label>
                        <div className="advanced-input-wrapper">
                            <Hash className="advanced-input-icon" />
                            <input
                                type="text"
                                name="zipcode"
                                value={searchRequest.geoLocation.zipcode}
                                onChange={handleLocationChange}
                                placeholder="e.g., 1205"
                                className="advanced-input"
                            />
                        </div>
                    </div>
                </div>

                {(searchRequest.geoLocation.latitude && searchRequest.geoLocation.longitude) && (
                    <div className="location-coordinates-advanced">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>
              Coordinates: {searchRequest.geoLocation.latitude.toFixed(6)},
                            {searchRequest.geoLocation.longitude.toFixed(6)}
            </span>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="advanced-search-btn"
            >
                {isLoading ? (
                    <>
                        <div className="advanced-spinner"></div>
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