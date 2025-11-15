import { Phone } from "lucide-react";
import "../styles/footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    © 2025 BloodConnect. Saving lives, one donation at a time.
                </p>
                <p className="footer-helpline">
                    <Phone className="footer-icon" />
                    <span>Emergency Helpline: +1-800-BLOOD-HELP</span>
                </p>
            </div>
        </footer>
    );
};
