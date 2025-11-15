import { Users, Heart } from "lucide-react";
import "../styles/action-buttons.css";

export const ActionButtons = ({ onRegister, onPostRequest }) => {
    return (
        <div className="action-buttons">
            <button onClick={onRegister} className="action-button primary">
                <Users className="w-5 h-5" />
                <span>Register</span>
            </button>
            <button onClick={onPostRequest} className="action-button secondary">
                <Heart className="w-5 h-5" />
                <span>Post Blood Request</span>
            </button>
        </div>
    );
};
