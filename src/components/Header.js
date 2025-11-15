import { Heart, User, UserPlus, HelpCircle } from "lucide-react";
import "../styles/header.css"
export const Header = ({ onLogin, onSignup }) => {
    return (
        <header className="header">
            <nav className="header-nav">
                <div className="header-logo">
                    <Heart className="w-8 h-8 text-red-900 fill-red-900" />
                    <span className="header-logo-text">BloodConnect</span>
                </div>
                <div className="header-nav-links">
                    <button onClick={onLogin} className="header-nav-button">
                        <User className="w-4 h-4" />
                        <span>Login</span>
                    </button>
                    <button onClick={onSignup} className="header-nav-button primary">
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                    </button>
                    <button className="header-nav-button">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};
