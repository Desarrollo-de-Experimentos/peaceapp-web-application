import React from "react";
import Sidebar from "./Sidebar.jsx";

const AlertsSidebar = ({ onBack }) => {
    return (
        <Sidebar>
            <button
                className="text-sm text-blue-500 hover:underline mb-4"
                onClick={onBack}
            >
                ← Back
            </button>
            <h2 className="text-lg font-bold mb-4">Alerts</h2>
            <p>Content for Alerts section...</p>
        </Sidebar>
    );
};

export default AlertsSidebar;
