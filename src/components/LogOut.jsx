import React, { useState } from "react";
import logoutIcon from "../assets/icons/logout.svg";
import logoutFilledIcon from "../assets/icons/logout-filled.svg";

const LogOut = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="absolute bottom-0 left-0 w-full" style={{ padding: ".8rem" }}>
            <div className="w-full h-[1px] bg-[#C4C4C4] my-3"></div>
            <div
                className="flex items-center gap-3 cursor-pointer rounded-md"
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    padding: ".7rem",
                }}
            >
                <img
                    src={isHovered ? logoutFilledIcon : logoutIcon}
                    alt="Log Out"
                    className="w-[20px] h-[20px]"
                />
                <p
                    className="text-xs font-regular text-left"
                    style={{ color: isHovered ? "#D74F4F" : "#C4C4C4" }}
                >
                    Log Out
                </p>
            </div>
        </div>
    );
};

export default LogOut;
