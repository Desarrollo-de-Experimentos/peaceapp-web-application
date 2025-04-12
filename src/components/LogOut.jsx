import React from "react";
import logoutIcon from "../assets/icons/logout.svg";

const LogOut = ({ onClick }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full" style={{ padding: ".8rem" }}>
            <div className="w-full h-[1px] bg-[#C4C4C4] my-3"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-[#EDF8FF] rounded-md" onClick={onClick} style={{ padding: ".7rem", backgroundColor: "white" }}>
                <img src={logoutIcon} alt="Log Out" className="w-[20px] h-[20px]" />
                <p className="text-xs font-regular text-[#C4C4C4] text-left">Log Out</p>
            </div>
        </div>
    )
}

export default LogOut;