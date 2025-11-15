import { useState } from "react";
import { Droplet, MapPin, Search, Building2, Map, Navigation } from "lucide-react";
import "../../styles/quick-search.css";
import {BloodGroupSelector, LocationButton } from "../SharedComponents";
import {buildSearchRequest, getCurrentLocation } from "../../Utils";

export const QuickSearch = ({ onSearch, isLoading, onAdvancedClick }) => {
    const [quickSearchData, setQuickSearchData] = useState({
        bloodGroup: '',
        city: '',
        district: '',
        latitude: null,
        longitude: null
    });
    const [errors, setErrors] = useState({});
    const [locationLoading, setLocationLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!quickSearchData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        if (!quickSearchData.city.trim()) newErrors.city = 'City is required';
        if (!quickSearchData.district.trim()) newErrors.district = 'District is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuickSearchData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleBloodGroupChange = (bloodGroup) => {
        setQuickSearchData(prev => ({ ...prev, bloodGroup }));
        if (errors.bloodGroup) setErrors(prev => ({ ...prev, bloodGroup: '' }));
    };

    const handleGetLocation = async () => {
        setLocationLoading(true);
        try {
            const location = await getCurrentLocation();
            setQuickSearchData(prev => ({
                ...prev,
                latitude: location.latitude,
                longitude: location.longitude
            }));
        } catch (error) {
            alert("Unable to get location. Please enable location services.");
        } finally {
            setLocationLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
     /*   const searchRequest = buildSearchRequest({
            bloodGroup: quickSearchData.bloodGroup,
            city: quickSearchData.city,
            district: quickSearchData.district,
            latitude: quickSearchData.latitude,
            longitude: quickSearchData.longitude,
            radius: 10,
            emergencyLevel: 'NORMAL'
        });*/
        const searchRequest = buildSearchRequest(quickSearchData);
        console.log("Search Request : ", searchRequest);
        onSearch(searchRequest);
    };

    return (
        <div className="quick-search-container">
            <div className="quick-search-header">
                <h3 className="quick-search-title">Quick Blood Search</h3>
                <p className="quick-search-subtitle">Find donors near you instantly</p>
            </div>

            <BloodGroupSelector
                value={quickSearchData.bloodGroup}
                onChange={handleBloodGroupChange}
                error={errors.bloodGroup}
            />

            <div className="quick-form-grid-with-location">
                <div className="quick-field">
                    <label className="quick-label">City *</label>
                    <div className="quick-input-wrapper">
                        <Building2 className="quick-input-icon" />
                        <input
                            type="text"
                            name="city"
                            value={quickSearchData.city}
                            onChange={handleInputChange}
                            placeholder="e.g., Dhaka"
                            className={`quick-input ${errors.city ? 'error' : ''}`}
                        />
                    </div>
                    {errors.city && <span className="quick-error">{errors.city}</span>}
                </div>

                <div className="quick-field">
                    <label className="quick-label">District *</label>
                    <div className="quick-input-wrapper">
                        <Map className="quick-input-icon" />
                        <input
                            type="text"
                            name="district"
                            value={quickSearchData.district}
                            onChange={handleInputChange}
                            placeholder="e.g., Dhaka"
                            className={`quick-input ${errors.district ? 'error' : ''}`}
                        />
                    </div>
                    {errors.district && <span className="quick-error">{errors.district}</span>}
                </div>

                <div className="quick-field location-field">
                    <label className="quick-label">Location</label>
                    <div className="location-wrapper">
                        {quickSearchData.latitude && quickSearchData.longitude ? (
                            <div className="location-display-btn">
                                <MapPin className="location-display-icon" />
                                <div className="location-display-content">
                                    <span className="location-display-label">GPS Coordinates</span>
                                    <span className="location-display-coords">
                    {quickSearchData.latitude.toFixed(4)}&deg;N, {quickSearchData.longitude.toFixed(4)}&deg;E
                  </span>
                                </div>
                            </div>
                        ) : (
                            <LocationButton
                                onClick={handleGetLocation}
                                isLoading={locationLoading}
                                className="quick-location-btn"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="quick-search-btn"
                >
                    {isLoading ? (
                        <>
                            <div className="quick-spinner"></div>
                            <span>Searching...</span>
                        </>
                    ) : (
                        <>
                            <Search className="w-5 h-5" />
                            <span>Quick Search</span>
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onAdvancedClick}
                    className="quick-advanced-btn"
                >
                    <span>Need Advanced Search?</span>
                    <span className="arrow">→</span>
                </button>
            </div>
        </div>
    );
};