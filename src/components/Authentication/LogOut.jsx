import React, { useState } from "react";
import logoutIcon from "../../assets/icons/logout.svg";
import logoutFilledIcon from "../../assets/icons/logout-filled.svg";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // removing from localstorage the mapbox key with regex: mapbox.eventData.*
        const mapboxKey = Object.keys(localStorage).find((key) => key.startsWith("mapbox.eventData."));
        if (mapboxKey) {
            console.log(`Removing Mapbox key: ${mapboxKey}`);
            localStorage.removeItem(mapboxKey);
        }

        navigate("/sign-in", { replace: true });
    }

    return (
        <div className="absolute bottom-0 left-0 w-full" style={{ padding: ".8rem" }}>
            <div className="w-full h-[1px] bg-[#C4C4C4] my-3"></div>
            <div
                className="flex items-center gap-3 cursor-pointer rounded-md"
                onClick={logOut}
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
