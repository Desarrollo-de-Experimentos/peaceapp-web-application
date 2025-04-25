import React from "react";

const AuthCard = ({ children }) => (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-xl text-center relative sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32" style={{ padding: "3rem 2rem 2rem 2rem"}}>
        <div className="absolute justify-center mb-4 -top-15 left-0 right-0 flex items-center">
            <img src="/peaceapp-logo.svg" alt="PeaceApp" className="h-24" />
        </div>
        {children}
    </div>
)

export default AuthCard;