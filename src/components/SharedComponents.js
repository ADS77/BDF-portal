import {Droplet, MapPin } from "lucide-react";
import {BLOOD_GROUPS} from "../Constants";
export const BloodGroupSelector = ({ value, onChange, error }) => (
    <div className="blood-type-section">
        <label className="quick-label">Select Blood Type *</label>
        <div className="blood-types-grid">
            {BLOOD_GROUPS.map(group => (
                <button
                    key={group.value}
                    type="button"
                    onClick={() => onChange(group.value)}
                    className={`blood-chip ${value === group.value ? 'active' : ''}`}
                >
                    <Droplet className="blood-chip-icon" />
                    {group.display}
                </button>
            ))}
        </div>
        {error && <span className="quick-error">{error}</span>}
    </div>
);

export const  LocationButton = ({ onClick, isLoading, className = "location-btn" }) => (
    <button
        type="button"
        onClick={onClick}
        className={className}
        disabled={isLoading}
    >
        <MapPin className="w-4 h-4" />
        {isLoading ? 'Getting Location...' : 'Use My Location'}
    </button>
);
