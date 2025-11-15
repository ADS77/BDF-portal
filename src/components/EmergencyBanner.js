import { Phone } from "lucide-react";
import "../styles/emergency-banner.css";

export const EmergencyBanner = () => {
    return (
        <div className="emergency-banner">
            <Phone className="w-5 h-5 emergency-banner-icon" />
            <span className="emergency-banner-text">URGENT: O- blood needed at City Hospital!</span>
            <span className="emergency-banner-contact">Contact: +1234567890</span>
        </div>
    );
};
