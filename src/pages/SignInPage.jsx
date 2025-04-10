import React, { useState } from "react";
import AuthCard from "../components/AuthCard.jsx";
import TextInput from "../components/TextInput.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService.js";

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const goToSignUp = () => {
        navigate("/sign-up");
    }

    const checkInputsFilled = async () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await ApiService.post("/authentication/sign-in", {email, password});
            console.log(response.data);
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <AuthCard>
                <h2 className="text-lg mb-6" style={{marginBottom: "1.5rem"}}>Welcome!</h2>

                <div className="flex flex-col items-center justify-center gap-6">

                    <TextInput
                        label="Email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>
                <p className="text-xs text-right font-light text-[var(--color-primary)] cursor-pointer italic" style={{marginTop: ".5rem"}} onClick={() => console.log("Forgot password")}>Forgot your password?</p>
                <div className="flex items-center justify-center gap-2 mt-4 mb-4">

                    <Button
                        onClick={checkInputsFilled}
                    >Sign In</Button>
                </div>
            </AuthCard>

            <div className="flex flex-col items-center justify-center gap-.5" style={{marginTop: "1rem"}}>
                <p className="text-sm text-[#010101] font-regular text-center">Don't have an account yet?</p>
                <p className="text-sm text-[var(--color-primary)] font-regular cursor-pointer text-center" onClick={goToSignUp}>Join now</p>
            </div>

        </div>
    )
}

export default SignIn;