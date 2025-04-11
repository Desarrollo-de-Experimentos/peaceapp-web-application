import React from "react";

const ItemOption = ({ icon, text, onClick }) => {
    return (
        <div className="flex items-center gap-3 cursor-pointer hover:bg-[var(--color-secondary)] rounded-md" onClick={onClick} style={{ padding: ".7rem" }}>
            <img src={icon} alt={text} className="w-[25px] h-[25px]" />
            <p className="text-sm font-light text-black text-left">{text}</p>
        </div>
    )
}

export default ItemOption;