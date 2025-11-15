import { useState } from "react";
import { QuickSearch } from "./QuickSearch";
import { AdvancedSearch } from "./AdvancedSearch";
import "../../styles/search-switcher.css";

export const SearchSwitcher = ({ onSearch, isLoading }) => {
    const [searchMode, setSearchMode] = useState('quick');

    const handleQuickToAdvanced = () => {
        setSearchMode('advanced');
    };

    const handleAdvancedToQuick = () => {
        setSearchMode('quick');
    };

    return (
        <div className="search-switcher-container">
            {searchMode === 'quick' ? (
                <QuickSearch
                    onSearch={onSearch}
                    isLoading={isLoading}
                    onAdvancedClick={handleQuickToAdvanced}
                />
            ) : (
                <AdvancedSearch
                    onSearch={onSearch}
                    isLoading={isLoading}
                    onClose={handleAdvancedToQuick}
                />
            )}
        </div>
    );
};
