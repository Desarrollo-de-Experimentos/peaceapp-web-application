import React from "react";
import mono from "../assets/icons/arigeimpleis.jpg";

const CardUserProfile = ({style}) => (
    <div className="flex items-center gap-3" style={{ padding: "1rem", ...style }}>
        <img src={mono} alt="Profile" className="w-[45px] h-[45px] rounded-full" />

        <div className="flex flex-col justify-center">
            <h1 className="text-sm font-light text-black text-left">Arigeimpleis</h1>
            <p className="text-xs text-[var(--color-primary-light)] text-left">Jesús María</p>
        </div>
    </div>
)

export default CardUserProfile;