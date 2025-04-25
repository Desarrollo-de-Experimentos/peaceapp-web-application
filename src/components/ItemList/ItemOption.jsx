import React from "react";

const ItemOption = ({ icon, text, onClick, checked }) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 cursor-pointer rounded-md p-[0.7rem] transition-colors duration-100 ease-in-out hover:bg-[#EDF8FF]"
            style={{
                padding: "0.7rem",
            }}
        >
            <img src={icon} alt={text} className="w-[25px] h-[25px]" />
            <p className="text-sm font-regular text-[var(--color-primary)] text-left">{text}</p>
        </div>
    );
};

export default ItemOption;