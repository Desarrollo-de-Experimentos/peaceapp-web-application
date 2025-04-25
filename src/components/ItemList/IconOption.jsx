import React from "react";

const IconOption = ({ icon, text, onClick, itemList, classStyle, style, widthImage }) => {
    const baseClass = "flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out rounded-xl";
    const itemClass = itemList ? "bg-white" : "";
    const styleItemList = itemList ? { boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" } : {};

    return (
        <div
            className={`${baseClass} ${itemClass} ${classStyle}`}
            style={{ padding: "0.2rem 0.8rem", margin: "1rem", ...styleItemList, ...style }}
            onClick={onClick}
        >
            <img src={icon} alt={text} className={widthImage? widthImage : "w-6 h-6"} />
            <span className="text-xs">{text}</span>
        </div>
    );
};

export default IconOption;
