import { useState } from "react";
import "../styles/request-modal.css";

export const RequestModal = ({ donor, onClose }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (message.trim()) {
            alert(`Blood request sent to ${donor.name}!\n\nYour message: ${message}`);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Send Blood Request</h2>

                <div className="modal-donor-info">
                    <img src={donor.image} alt={donor.name} className="modal-donor-avatar" />
                    <div>
                        <div className="modal-donor-name">{donor.name}</div>
                        <div className="modal-donor-details">{donor.bloodGroup} • {donor.location}</div>
                    </div>
                </div>

                <div className="modal-form-group">
                    <label className="modal-label">Your Message *</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your requirement (patient condition, hospital, urgency, etc.)"
                        className="modal-textarea"
                        rows="5"
                    />
                </div>

                <div className="modal-actions">
                    <button onClick={onClose} className="modal-button cancel">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="modal-button submit">
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};
