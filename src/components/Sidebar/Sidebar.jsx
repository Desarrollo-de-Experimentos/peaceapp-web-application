import React from "react";
import LogOut from "../LogOut.jsx";

const Sidebar = ({ children }) => (
    <div className="relative h-full bg-white" style={{ width: "20%", padding: ".8rem" }}>
        <div className="flex items-center justify-center w-full gap-2" style={{ paddingBottom: ".8rem"}}>
            <img src="/peaceapp-logo.svg" alt="PeaceApp Logo" className="w-[55px] mx-auto" />
            <div className="flex flex-col justify-center">
                <h1 className="text-[0.8rem] font-bold text-left">PeaceApp</h1>
                <p className="text-[0.75rem] text-left">Live in a better society!</p>
            </div>
        </div>

        {children}

        <LogOut />
    </div>
)

export default Sidebar;