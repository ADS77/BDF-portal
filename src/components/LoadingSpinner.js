import "../styles/loading-spinner.css";

export const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Searching for donors...</p>
        </div>
    );
};