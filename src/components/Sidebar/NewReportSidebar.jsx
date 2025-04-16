import React from "react";
import Sidebar from "./Sidebar.jsx";

const NewReportSidebar = ({ onBack }) => {
    return (
        <Sidebar>
            <button
                className="text-sm text-blue-500 hover:underline mb-4"
                onClick={onBack}
            >
                ← Back
            </button>
            <h2 className="text-lg font-bold mb-4">New Report</h2>
            <p>Content for New Report section...</p>
        </Sidebar>
    );
};

export default NewReportSidebar;
