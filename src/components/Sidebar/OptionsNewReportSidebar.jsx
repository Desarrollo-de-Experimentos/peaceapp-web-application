import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import IconOption from "../IconOption.jsx";
import theftIcon from "../../assets/icons/theft-new-report.svg";
import accidentIcon from "../../assets/icons/accident-new-report.svg";
import lightingIcon from "../../assets/icons/lighting-new-report.svg";
import harassmentIcon from "../../assets/icons/harassment-new-report.svg";
import otherIcon from "../../assets/icons/other-new-report.svg";

const OptionsNewReportSidebar = ({ onBack }) => {
    const navigate = useNavigate();

    const handleOptionClick = (text) => {
        const type = text.toLowerCase().replace(" ", "-");
        navigate(`/new-report?type=${type}`);
    }

    const options = [
        { icon: theftIcon, text: "Theft" },
        { icon: accidentIcon, text: "Car accident" },
        { icon: lightingIcon, text: "Lighting" },
        { icon: harassmentIcon, text: "Harassment" },
        { icon: otherIcon, text: "Other" },
    ]

    return (
        <Sidebar>
            <button
                className="text-sm text-blue-500 hover:underline mb-4 cursor-pointer"
                onClick={onBack}
            >
                ← Back
            </button>
            <h2 className="text-lg font-bold text-center" style={{margin: "1rem .5rem"}}>New Report</h2>

            <div className="flex flex-col items-center justify-center w-full">
                    {options.map((opt, index) => (
                        <IconOption
                            key={index}
                            icon={opt.icon}
                            text={opt.text}
                            onClick={() => handleOptionClick(opt.text)}
                        />
                    ))}
                </div>
        </Sidebar>
    );
};

export default OptionsNewReportSidebar;
