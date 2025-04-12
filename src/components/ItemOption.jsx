import React from "react";

const ItemOption = ({ icon, text, onClick, checked }) => {
    return (
        <div className="flex items-center gap-3 cursor-pointer hover:bg-[#EDF8FF] rounded-md" onClick={onClick} style={{ padding: ".7rem", backgroundColor: checked ? "#EDF8FF" : "white" }}>
            <img src={icon} alt={text} className="w-[25px] h-[25px]" />
            <p className="text-sm font-regular text-[var(--color-primary)] text-left">{text}</p>
        </div>
    )
}

export default ItemOption;