import React from "react";
import Sidebar from "./Sidebar.jsx";

const NewReportSidebar = ({ type, onBack }) => {
    return (
        <Sidebar>
            <button
                className="text-sm text-blue-500 hover:underline mb-4 cursor-pointer"
                onClick={onBack}
            >
                ← Back
            </button>
            <h2 className="text-lg font-bold mb-4">New Report</h2>
            <p>Content for New Report {type} section...</p>
        </Sidebar>
    );
}

export default NewReportSidebar;