import { Send, Calendar, MapPin, Droplet, Star, Phone, Mail, CheckCircle, AlertTriangle } from "lucide-react";
import "../styles/donor-card.css";

export const DonorCard = ({ donor, onRequestBlood }) => {
    const daysSinceLastDonation = donor.lastDonationDate
        ? Math.floor((new Date() - new Date(donor.lastDonationDate)) / (1000 * 60 * 60 * 24))
        : null;

    const isEligible = daysSinceLastDonation === null || daysSinceLastDonation >= 90;
    const isAvailable = donor.isAvailable && isEligible;
    const formatBloodGroup = (bloodGroup) => {
        if (!bloodGroup) return 'N/A';
        return bloodGroup.replace('_POSITIVE', '+')
            .replace('_NEGATIVE', '-');
    };

    const formatPhone = (phone) => {
        if (!phone) return '';
        if (phone.startsWith('01')) {
            return `+880 ${phone}`;
        }
        return phone;
    };

    const displayLocation = [donor.geoLocation?.city, donor.geoLocation?.district]
        .filter(Boolean)
        .join(', ') || 'Location not specified';

    return (
        <div className="donor-card">
            <div className="donor-card-content">
                {/* Header Section */}
                <div className="donor-card-header">
                    <div className="donor-avatar-container">
                        <img
                            src={donor.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${donor.name}`}
                            alt={donor.name}
                            className="donor-card-avatar"
                        />
                        {donor.isVerified && (
                            <div className="verified-badge" title="Verified Donor">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                        )}
                    </div>

                    <div className="donor-card-info">
                        <div className="donor-card-top">
                            <div>
                                <div className="donor-name-container">
                                    <h3 className="donor-card-name">{donor.name}</h3>
                                    {!donor.isVerified && (
                                        <AlertTriangle className="w-4 h-4 text-yellow-500" title="Not Verified" />
                                    )}
                                </div>
                                <div className="donor-card-rating">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="donor-card-rating-value">
                                        {donor.rating ? donor.rating.toFixed(1) : '0.0'}
                                    </span>
                                    <span className="donor-card-rating-count">
                                        ({donor.totalDonations || 0} donation{donor.totalDonations !== 1 ? 's' : ''})
                                    </span>
                                </div>
                            </div>
                            <span className="donor-card-blood-badge">
                                <Droplet className="w-4 h-4" />
                                {formatBloodGroup(donor.bloodGroup)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="donor-card-details">
                    {/* Location */}
                    <div className="donor-card-detail-item">
                        <MapPin className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                        <div>
                            <div className="donor-card-location-title">{displayLocation}</div>
                            {donor.geoLocation?.address && (
                                <div className="donor-card-address">{donor.geoLocation.address}</div>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="donor-card-contact-row">
                        {donor.phone && (
                            <div className="donor-card-detail-item">
                                <Phone className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <span className="donor-card-contact">{formatPhone(donor.phone)}</span>
                            </div>
                        )}
                        {donor.email && (
                            <div className="donor-card-detail-item">
                                <Mail className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <span className="donor-card-contact donor-card-email">{donor.email}</span>
                            </div>
                        )}
                    </div>

                    {/* Last Donation Date */}
                    {donor.lastDonationDate && (
                        <div className="donor-card-detail-item">
                            <Calendar className="w-4 h-4 text-purple-500" />
                            <span>
                                Last donation: {new Date(donor.lastDonationDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                                {daysSinceLastDonation !== null && (
                                    <span className="donor-card-days-ago"> ({daysSinceLastDonation} days ago)</span>
                                )}
                            </span>
                        </div>
                    )}

                    {/* Eligibility and Availability Footer */}
                    <div className="donor-card-footer">
                        <span className={`donor-card-eligibility ${isEligible ? 'eligible' : 'not-eligible'}`}>
                            {isEligible ? (
                                <>✓ Eligible to donate</>
                            ) : (
                                <>Wait {90 - daysSinceLastDonation} days</>
                            )}
                        </span>
                        {donor.isAvailable ? (
                            <span className="donor-card-availability available">
                                <div className="donor-card-availability-dot"></div>
                                Available
                            </span>
                        ) : (
                            <span className="donor-card-availability unavailable">
                                <div className="donor-card-availability-dot-gray"></div>
                                Unavailable
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => onRequestBlood(donor)}
                    disabled={!isAvailable}
                    className={`donor-card-button ${isAvailable ? 'available' : 'unavailable'}`}
                    title={!isAvailable ? 'Donor is currently not available or not eligible' : 'Send blood request to this donor'}
                >
                    <Send className="w-4 h-4" />
                    {isAvailable ? 'Send Blood Request' : 'Not Available'}
                </button>

                {/* Additional Info Footer */}
                {donor.createdAt && (
                    <div className="donor-card-meta">
                        Member since {new Date(donor.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                    })}
                    </div>
                )}
            </div>
        </div>
    );
};

export const DonorCardHelpers = {
    formatBloodGroup: (bloodGroup) => {
        if (!bloodGroup) return 'N/A';
        const mapping = {
            'A_POSITIVE': 'A+',
            'A_NEGATIVE': 'A-',
            'B_POSITIVE': 'B+',
            'B_NEGATIVE': 'B-',
            'AB_POSITIVE': 'AB+',
            'AB_NEGATIVE': 'AB-',
            'O_POSITIVE': 'O+',
            'O_NEGATIVE': 'O-'
        };
        return mapping[bloodGroup] || bloodGroup;
    },

    calculateDaysSinceDonation: (lastDonationDate) => {
        if (!lastDonationDate) return null;
        return Math.floor((new Date() - new Date(lastDonationDate)) / (1000 * 60 * 60 * 24));
    },

    isDonorEligible: (lastDonationDate) => {
        const days = DonorCardHelpers.calculateDaysSinceDonation(lastDonationDate);
        return days === null || days >= 90;
    },

    formatPhone: (phone) => {
        if (!phone) return '';
        if (phone.startsWith('01')) {
            return `+880 ${phone}`;
        }
        return phone;
    }
};