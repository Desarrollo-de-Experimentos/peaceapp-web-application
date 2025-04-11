import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService.js";
import { useAuth } from "../auth/AuthContext.jsx";

const TermsConditions = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [termsAccepted, setTermsAccepted] = useState(false);

    const goToSignIn = () => {
        navigate("/sign-in");
    }

    const checkTermsAccepted = () => {
        if (!termsAccepted) {
            alert("Please accept the terms and conditions to proceed.");
            return false;
        }

        return true;
    }

    const obtainToken = async ({name, lastName, phoneNumber, email, password}) => {
        try {
            const response = await ApiService.post("/authentication/sign-in", {username: email, password});
            const {id, token} = response.data;

            localStorage.removeItem("user");
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({id, name, lastName, phoneNumber, email}));

            setUser({id, name, lastName, phoneNumber, email}); // set the user in the context
            navigate("/", {replace: true}); // redirect to home page
        }catch(e) {
            console.error(e);
        }
    }

    const registerUser = async () => {
        const checked = checkTermsAccepted()
        if(!checked) return;

        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData);

            if(!userData) return;
            const { email, password } = userData;

            const response = await ApiService.post("/authentication/sign-up", {username: email, password, roles: ["ROLE_USER"]});

            const {message} = response.data;
            if(message) return; // xd "error" message from backend
            
            await obtainToken(userData);
        }catch(e) {
            console.error(e);
        }
    }

    return  (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <AuthCard>
                <h2 className="text-lg mb-6" style={{marginBottom: "1.5rem"}}>Terms and Conditions of use</h2>
                <p className="text-sm text-[#010101] font-light text-justify" style={{marginBottom: "2rem"}}>By registering with PeaceApp, you agree to share your real-time location and provide data necessary to enhance security. The information will be used exclusively for security purposes and will be treated confidentially. Furthermore, by using the application, you agree to use it responsibly, respecting the law and promoting a safe environment for all users.</p>

                <div className="flex items-center justify-center gap-2">
                    <input type="checkbox" 
                    className="w-7 h-4 appearance-none rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 checked:bg-blue-400 checked:border-blue-600 focus:outline-none transition duration-200" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <p className="text-[.65rem] text-justify text-[#010101] font-light">I have read and accept the terms and conditions of use of PeaceApp, I will use the application in good faith to contribute to a better society, otherwise I refrain from legal consequences. <span className="text-[red]">*</span></p>
                </div>

                <Button
                    onClick={registerUser}
                    >
                    Confirm
                </Button>
            </AuthCard>

            <div className="flex flex-col items-center justify-center gap-.5" style={{marginTop: "1rem"}}>
                <p className="text-sm text-[#010101] font-regular text-center">Already have an account?</p>
                <p className="text-sm text-[var(--color-primary)] font-regular cursor-pointer text-center" onClick={goToSignIn}>Log in</p>
            </div>
        </div>
    )
}

export default TermsConditions;