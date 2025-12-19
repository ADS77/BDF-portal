import { useState } from "react";
import { User, Mail, Phone, Droplet, MapPin, Building2, Map, Hash, CheckCircle, AlertCircle } from "lucide-react";
import "../styles/donor-reg.css";
import {defaultRegReq} from "../model/request/DefaultRequest";

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

const ROLES = [
    { value: 'DONOR', label: 'Donor' },
    { value: 'RECIPIENT', label: 'Recipient' },
    { value: 'VOLUNTEER', label: 'Volunteer' }
];

export const DonorRegistration = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState(()=> structuredClone(defaultRegReq));

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState('');
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\d\s\-+()]{10,15}$/;
        return phoneRegex.test(phone);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Invalid phone number format';
        }

        if (!formData.bloodGroup) {
            newErrors.bloodGroup = 'Blood group is required';
        }

        if (!formData.geoLocation.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.geoLocation.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.geoLocation.district.trim()) {
            newErrors.district = 'District is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        geoLocation: {
                            ...prev.geoLocation,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }));
                    setSubmitMessage('Location captured successfully!');
                    setTimeout(() => setSubmitMessage(''), 3000);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setSubmitMessage('Unable to get location. Please enter manually.');
                    setTimeout(() => setSubmitMessage(''), 3000);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus('error');
            setSubmitMessage('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitMessage('');

        var requestData = JSON.stringify(formData);
        console.log("Request Data : ", requestData);

        try {
            const response = await fetch('http://localhost:8088/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage(data.message || 'Registration successful!');

                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess(data);
                    }
                   /* setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        role: 'DONOR',
                        bloodGroup: '',
                        geoLocation: {
                            address: '',
                            city: '',
                            district: '',
                            latitude: null,
                            longitude: null,
                            zipcode: ''
                        }
                    });*/
                }, 2000);
            } else {
                setSubmitStatus('error');
                setSubmitMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setSubmitStatus('error');
            setSubmitMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="registration-overlay">
            <div className="registration-modal">
                <div className="registration-header">
                    <h2 className="registration-title">Donor Registration</h2>
                    <p className="registration-subtitle">Join our life-saving community</p>
                    {onClose && (
                        <button onClick={onClose} className="registration-close">×</button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="registration-form">
                    {/* Personal Information Section */}
                    <div className="form-section">
                        <h3 className="section-title">Personal Information</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">
                                    Full Name *
                                </label>
                                <div className="input-wrapper">
                                    <User className="input-icon" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className={`form-input ${errors.name ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Email Address *
                                </label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your.email@example.com"
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Phone Number *
                                </label>
                                <div className="input-wrapper">
                                    <Phone className="input-icon" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+880 1234-567890"
                                        className={`form-input ${errors.phone ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Blood Group *
                                </label>
                                <div className="input-wrapper">
                                    <Droplet className="input-icon text-red-500" />
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.bloodGroup ? 'error' : ''}`}
                                    >
                                        <option value="">Select Blood Group</option>
                                        {BLOOD_GROUPS.map(group => (
                                            <option key={group.value} value={group.value}>
                                                {group.display}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.bloodGroup && <span className="error-message">{errors.bloodGroup}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Role
                                </label>
                                <div className="input-wrapper">
                                    <User className="input-icon" />
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    >
                                        {ROLES.map(role => (
                                            <option key={role.value} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location Information Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <h3 className="section-title">Location Information</h3>
                            <button
                                type="button"
                                onClick={getCurrentLocation}
                                className="location-button"
                            >
                                <MapPin className="w-4 h-4" />
                                Use Current Location
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">
                                    Address *
                                </label>
                                <div className="input-wrapper">
                                    <MapPin className="input-icon" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.geoLocation.address}
                                        onChange={handleLocationChange}
                                        placeholder="House/Flat, Road, Area"
                                        className={`form-input ${errors.address ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.address && <span className="error-message">{errors.address}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    City *
                                </label>
                                <div className="input-wrapper">
                                    <Building2 className="input-icon" />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.geoLocation.city}
                                        onChange={handleLocationChange}
                                        placeholder="e.g., Dhaka"
                                        className={`form-input ${errors.city ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    District *
                                </label>
                                <div className="input-wrapper">
                                    <Map className="input-icon" />
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.geoLocation.district}
                                        onChange={handleLocationChange}
                                        placeholder="e.g., Dhaka"
                                        className={`form-input ${errors.district ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.district && <span className="error-message">{errors.district}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Zip Code
                                </label>
                                <div className="input-wrapper">
                                    <Hash className="input-icon" />
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={formData.geoLocation.zipcode}
                                        onChange={handleLocationChange}
                                        placeholder="e.g., 1205"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {(formData.geoLocation.latitude && formData.geoLocation.longitude) && (
                                <div className="form-group full-width">
                                    <div className="location-info">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        <span className="location-text">
                                            Location: {formData.geoLocation.latitude.toFixed(6)}, {formData.geoLocation.longitude.toFixed(6)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Message */}
                    {submitMessage && (
                        <div className={`status-message ${submitStatus}`}>
                            {submitStatus === 'success' ? (
                                <CheckCircle className="status-icon" />
                            ) : submitStatus === 'error' ? (
                                <AlertCircle className="status-icon" />
                            ) : null}
                            <span>{submitMessage}</span>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="form-actions">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-secondary"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Registering...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Register as Donor</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};