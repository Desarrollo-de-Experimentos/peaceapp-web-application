import React from "react";

const Button = ({ children, onClick, type = "button" }) => (
    <button
        type={type}
        onClick={onClick}
        className="bg-[var(--color-bg-button)] text-white rounded cursor-pointer text-xs font-regular transition duration-500 ease-in-out hover:bg-[var(--color-primary)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-80"
        style={{ padding: ".5rem .8rem", borderRadius: "15px", marginTop: "1rem" }}
    >
        {children}
    </button>
)

export default Button;