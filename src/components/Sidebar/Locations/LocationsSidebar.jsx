import React from "react";
import Sidebar from "../Sidebar.jsx";

const LocationsSidebar = ({ onBack }) => {
    return (
        <Sidebar>
            <button
                className="text-sm text-blue-500 hover:underline mb-4"
                onClick={onBack}
            >
                ← Back
            </button>
            <h2 className="text-lg font-bold mb-4">Locations</h2>
            <p>Content for Locations section...</p>
        </Sidebar>
    );
};

export default LocationsSidebar;
