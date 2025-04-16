import React, { useState } from "react";
import theftIcon from '../assets/icons/theft.svg';
import carIcon from '../assets/icons/car.svg';
import lightingIcon from '../assets/icons/lighting.svg';
import harassmentIcon from '../assets/icons/harassment.svg';
import otherIcon from '../assets/icons/other.svg';
import pointsIcon from "../assets/icons/points.svg";
import IconOption from "./IconOption.jsx";

const IconOptionList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { icon: theftIcon, text: "Theft" },
        { icon: carIcon, text: "Car accident" },
        { icon: lightingIcon, text: "Lighting" },
        { icon: harassmentIcon, text: "Harassment" },
        { icon: otherIcon, text: "Other" },
    ];

    const handleOptionClick = (text) => {
        setSelectedOption(text);
        setIsOpen(false); // Optionally close dropdown after selection
        console.log("Selected:", text);
    };

    return (
        <div className="relative text-left" >
            <img
                src={pointsIcon}
                className="px-4 py-2 rounded-[20px] bg-white shadow-xl cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out w-8 h-8" 
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}
                alt="Select Option"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-xl z-20" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
                    {options.map((opt, index) => (
                        <IconOption
                            key={index}
                            icon={opt.icon}
                            text={opt.text}
                            onClick={() => handleOptionClick(opt.text)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default IconOptionList;
