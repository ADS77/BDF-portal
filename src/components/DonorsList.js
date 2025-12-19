import { DonorCard } from "./DonorCard";
import { User } from "lucide-react";
import "../styles/donor-list.css";

export const DonorsList = ({ donors, onRequestBlood }) => {
    if (donors.length === 0) {
        return (
            <div className="donors-list-empty">
                <User className="donors-list-empty-icon" />
                <h3 className="donors-list-empty-title">No donors found</h3>
                <p className="donors-list-empty-text">Try adjusting your search criteria</p>
            </div>
        );
    }

    return (
        <div className="donors-list">
            <div className="donors-list-header">
                <h2 className="donors-list-title">
                    Found {donors.length} donor{donors.length !== 1 ? 's' : ''}
                </h2>
                <p className="donors-list-subtitle">Available donors matching your criteria</p>
            </div>
            <div className="donors-list-grid">
                {donors.map(donor => (
                    <DonorCard
                        key={donor.id}
                        donor={donor}
                        onRequestBlood={onRequestBlood}
                    />
                ))}
            </div>
        </div>
    );
};
