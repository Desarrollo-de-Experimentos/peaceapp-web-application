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
            <div className="mb-3" style={{ margin: "0 1rem"  }}>
                <button 
                    className="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer" 
                    onClick={onBack}
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
            </div>
            <div className="bg-[#EBF2F6] rounded-lg" style={{ padding: ".5rem 2rem", margin: "1rem 0"}}>
                <h3 className="text-lg font-medium text-left">New Report</h3>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                    {options.map((opt, index) => (
                        <IconOption
                            key={index}
                            icon={opt.icon}
                            text={opt.text}
                            onClick={() => handleOptionClick(opt.text)}
                            classStyle={"w-[100%] h-[100%] flex items-center justify-center"}
                            style={{ padding: "1rem 1rem", margin: "0.5rem 0" }}
                            widthImage={"w-12 h-12"}
                        />
                    ))}
                </div>
        </Sidebar>
    );
};

export default OptionsNewReportSidebar;
