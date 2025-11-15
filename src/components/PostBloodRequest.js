import React, { useState } from 'react';
import {
    ArrowLeft,
    Heart,
    User,
    Droplet,
    Hash,
    MapPin,
    MessageSquare,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Loader,
    Navigation,
    Info
} from 'lucide-react';
import '../styles/blood-request.css';

const PostBloodRequest = () => {
    const [formData, setFormData] = useState({
        userId: '', // This would typically come from auth context
        neededBloodGroup: '',
        quantity: 1,
        location: {
            address: '',
            city: '',
            district: '',
            latitude: null,
            longitude: null,
            zipcode: ''
        },
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('location.')) {
            const locationField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [locationField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle blood group selection
    const handleBloodGroupSelect = (bloodGroup) => {
        setFormData(prev => ({
            ...prev,
            neededBloodGroup: bloodGroup
        }));

        if (errors.neededBloodGroup) {
            setErrors(prev => ({
                ...prev,
                neededBloodGroup: ''
            }));
        }
    };

    // Handle quantity change
    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, Math.min(10, formData.quantity + change));
        setFormData(prev => ({
            ...prev,
            quantity: newQuantity
        }));
    };

    // Get user's current location
    const getCurrentLocation = () => {
        setIsGettingLocation(true);

        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            setIsGettingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // You can integrate with a reverse geocoding service here
                    // For now, we'll just set the coordinates
                    setFormData(prev => ({
                        ...prev,
                        location: {
                            ...prev.location,
                            latitude,
                            longitude
                        }
                    }));

                    // Simulate reverse geocoding (replace with actual service)
                    setTimeout(() => {
                        setFormData(prev => ({
                            ...prev,
                            location: {
                                ...prev.location,
                                city: 'Current City', // Replace with actual reverse geocoding
                                district: 'Current District'
                            }
                        }));
                    }, 1000);

                } catch (error) {
                    console.error('Error getting location details:', error);
                } finally {
                    setIsGettingLocation(false);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please enter manually.');
                setIsGettingLocation(false);
            }
        );
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.userId) {
            newErrors.userId = 'User ID is required';
        }

        if (!formData.neededBloodGroup) {
            newErrors.neededBloodGroup = 'Please select a blood group';
        }

        if (!formData.location.address.trim()) {
            newErrors['location.address'] = 'Address is required';
        }

        if (!formData.location.city.trim()) {
            newErrors['location.city'] = 'City is required';
        }

        if (!formData.location.district.trim()) {
            newErrors['location.district'] = 'District is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Please provide details about your blood requirement';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Prepare data for API
            const requestData = {
                userId: parseInt(formData.userId),
                neededBloodGroup: formData.neededBloodGroup,
                quantity: formData.quantity,
                location: {
                    address: formData.location.address.trim(),
                    city: formData.location.city.trim(),
                    district: formData.location.district.trim(),
                    latitude: formData.location.latitude,
                    longitude: formData.location.longitude,
                    zipcode: formData.location.zipcode.trim()
                },
                message: formData.message.trim()
            };

            console.log('Submitting blood request:', requestData);

            // Replace this with your actual API call
            const response = await fetch('/api/blood-request/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Blood request created:', result);
                setSubmitStatus('success');

                // Reset form after successful submission
                setTimeout(() => {
                    // Navigate back to home or requests list
                    // navigate('/'); or navigate('/my-requests');
                    window.history.back();
                }, 2000);
            } else {
                throw new Error('Failed to create blood request');
            }

        } catch (error) {
            console.error('Error creating blood request:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            window.history.back();
            // Or navigate to home: navigate('/');
        }
    };

    return (
        <div className="post-request-container">
            {/* Header */}
            <header className="post-request-header">
                <nav className="header-nav">
                    <a href="/" className="header-logo">
                        <Heart size={32} color="#ff6b6b" />
                        <span>BloodConnect</span>
                    </a>
                    <button className="back-button" onClick={handleCancel}>
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </button>
                </nav>
            </header>

            <main className="post-request-main">
                <div className="request-form-card">
                    {/* Header */}
                    <div className="form-header">
                        <h1 className="form-title">Post Blood Request</h1>
                        <p className="form-subtitle">
                            Fill in the details below to request blood from our donor community
                        </p>

                        <div className="urgent-notice">
                            <AlertTriangle size={20} />
                            <span>This will be visible to all registered donors in your area</span>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="message-banner success">
                            <CheckCircle size={20} />
                            <span>Blood request posted successfully! Redirecting...</span>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="message-banner error">
                            <XCircle size={20} />
                            <span>Failed to post blood request. Please try again.</span>
                        </div>
                    )}

                    {/* Form */}
                    <form className="blood-request-form" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <User size={20} />
                                Personal Information
                            </h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">
                                        User ID <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="userId"
                                        value={formData.userId}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.userId ? 'error' : ''}`}
                                        placeholder="Enter your user ID"
                                    />
                                    {errors.userId && (
                                        <div className="error-message">
                                            <XCircle size={16} />
                                            {errors.userId}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Blood Information */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <Droplet size={20} />
                                Blood Requirement
                            </h2>

                            <div className="form-group">
                                <label className="form-label">
                                    Blood Group Needed <span className="required">*</span>
                                </label>
                                <div className="blood-group-selector">
                                    {bloodGroups.map(group => (
                                        <button
                                            key={group}
                                            type="button"
                                            onClick={() => handleBloodGroupSelect(group)}
                                            className={`blood-group-option ${formData.neededBloodGroup === group ? 'selected' : ''}`}
                                        >
                                            {group}
                                        </button>
                                    ))}
                                </div>
                                {errors.neededBloodGroup && (
                                    <div className="error-message">
                                        <XCircle size={16} />
                                        {errors.neededBloodGroup}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Hash size={16} />
                                    Quantity (Units) <span className="required">*</span>
                                </label>
                                <div className="quantity-input">
                                    <div className="quantity-controls">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={formData.quantity <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <div className="quantity-display">{formData.quantity}</div>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={formData.quantity >= 10}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {formData.quantity} unit{formData.quantity > 1 ? 's' : ''} of {formData.neededBloodGroup || 'blood'} needed
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <MapPin size={20} />
                                Location Details
                            </h2>

                            <div className="location-helper">
                                <Info size={16} />
                                <span>Providing accurate location helps donors find you quickly</span>
                            </div>

                            <button
                                type="button"
                                onClick={getCurrentLocation}
                                disabled={isGettingLocation}
                                className="get-location-btn"
                            >
                                {isGettingLocation ? (
                                    <Loader className="spinner" size={16} />
                                ) : (
                                    <Navigation size={16} />
                                )}
                                <span>{isGettingLocation ? 'Getting Location...' : 'Get Current Location'}</span>
                            </button>

                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label className="form-label">
                                        Address <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location.address"
                                        value={formData.location.address}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors['location.address'] ? 'error' : ''}`}
                                        placeholder="Enter full address (hospital, clinic, or home)"
                                    />
                                    {errors['location.address'] && (
                                        <div className="error-message">
                                            <XCircle size={16} />
                                            {errors['location.address']}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">
                                        City <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location.city"
                                        value={formData.location.city}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors['location.city'] ? 'error' : ''}`}
                                        placeholder="Enter city name"
                                    />
                                    {errors['location.city'] && (
                                        <div className="error-message">
                                            <XCircle size={16} />
                                            {errors['location.city']}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        District <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location.district"
                                        value={formData.location.district}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors['location.district'] ? 'error' : ''}`}
                                        placeholder="Enter district name"
                                    />
                                    {errors['location.district'] && (
                                        <div className="error-message">
                                            <XCircle size={16} />
                                            {errors['location.district']}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="location.zipcode"
                                        value={formData.location.zipcode}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Enter ZIP/Postal code"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <MessageSquare size={20} />
                                Additional Information
                            </h2>

                            <div className="form-group">
                                <label className="form-label">
                                    Message <span className="required">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    placeholder="Please provide details about your requirement (urgency level, patient condition, contact information, etc.)"
                                    rows={4}
                                />
                                {errors.message && (
                                    <div className="error-message">
                                        <XCircle size={16} />
                                        {errors.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="submit-section">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-button"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader className="spinner" size={20} />
                                        <span>Posting Request...</span>
                                    </>
                                ) : (
                                    <>
                                        <Heart size={20} />
                                        <span>Post Blood Request</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default PostBloodRequest;