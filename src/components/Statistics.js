import { Users, Heart, Award } from "lucide-react";
import "../styles/statistics.css";

export const Statistics = ({ stats }) => {
    return (
        <div className="statistics">
            <div className="stat-card purple">
                <Users className="stat-card-icon purple" />
                <h3 className="stat-card-title">Registered Donors</h3>
                <span className="stat-card-number purple">{stats.totalDonors.toLocaleString()}</span>
            </div>
            <div className="stat-card green">
                <Award className="stat-card-icon green" />
                <h3 className="stat-card-title">Successful Donations</h3>
                <span className="stat-card-number green">{stats.successfulDonations.toLocaleString()}</span>
            </div>
            <div className="stat-card red">
                <Heart className="stat-card-icon red" />
                <h3 className="stat-card-title">Lives Saved</h3>
                <span className="stat-card-number red">{stats.livesSaved.toLocaleString()}</span>
            </div>
        </div>
    );
};
