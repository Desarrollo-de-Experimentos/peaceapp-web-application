import React from "react";
import peruFlag from "../../assets/icons/peru-flag.svg";

const FlagInput = () => (
    <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300" style={{ padding: "0.5rem 1rem" }}>
        <img src={peruFlag} alt="Peru Flag" className="w-6 h-6" />
        <p className="text-sm text-[#010101] font-regular">+51</p>
    </div>
)

export default FlagInput;