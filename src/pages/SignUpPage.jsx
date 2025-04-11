import React, { useState } from "react";
import AuthCard from "../components/AuthCard.jsx";
import TextInput from "../components/TextInput.jsx";
import FlagInput from "../components/FlagInput.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import User from "../models/UserModel.js";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const goToSignIn = () => {
        navigate("/sign-in");
    }

    const checkInputsFilled = () => {
        if (!name || !lastName || !phoneNumber || !email || !password) {
            alert("Please fill in all fields.");
            return false;
        }

        console.log("All fields filled");
        // adding to the localstorage the data
        localStorage.setItem("user", JSON.stringify({name, lastname:lastName, phonenumber:phoneNumber, email, password}));
        console.log("User data saved to local storage");
        return true;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <AuthCard>
                <h2 className="text-lg" style={{marginBottom: "2rem"}}>You are one step away from changing your society</h2>

                <div className="flex flex-col items-center justify-center gap-6">
                    <TextInput
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />

                    <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => {setLastName(e.target.value)}}
                    />
                    
                    <div className="flex items-center gap-2" style={{width: "100%"}}>
                        <FlagInput />

                        <TextInput
                            type="number"
                            label="Phone number"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => {setPhoneNumber(e.target.value)}}
                        />
                    </div>

                    <TextInput
                        label="Email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your unique password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 mb-4">

                    <Button
                        onClick={() => {
                            if(checkInputsFilled())
                                navigate("/terms-conditions")
                        }}
                    >Sign Up</Button>
                </div>
            </AuthCard>

            <div className="flex flex-col items-center justify-center gap-.5" style={{marginTop: "1rem"}}>
                <p className="text-sm text-[#010101] font-regular text-center">Already have an account?</p>
                <p className="text-sm text-[var(--color-primary)] font-regular cursor-pointer text-center" onClick={goToSignIn}>Log in</p>
            </div>
        </div>
    )
}

export default SignUp;