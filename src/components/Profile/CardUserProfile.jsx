import React, { useEffect, useState } from "react";
import mono from "../../assets/icons/arigeimpleis.jpg";
import { useNavigate } from "react-router-dom";
import User from "../../models/UserModel.js";
import { obtainCurrentLocation } from "../../utils/currentLocation.js";

const CardUserProfile = ({style}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(new User({
        id: 0,
        name: "",
        lastname: "",
        email: "",
        phonenumber: "",
        profile_image: null
    }));

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            setUser(new User(parsedUser));
        } else {
            navigate("/sign-in");
        }

        const fetchLocation = async () => {
            const location = await obtainCurrentLocation();
            console.log(location);
        }
        fetchLocation();
    }, []);

    return (
        <div className="flex items-center gap-3" style={{ padding: "1rem", ...style }}>
            <img src={user.profile_image? user.profile_image : mono} alt="Profile" className="w-[45px] h-[45px] rounded-full" />

            <div className="flex flex-col justify-center">
                <h1 className="text-sm font-light text-black text-left">{user.getNameCard()}</h1>
                <p className="text-xs text-[var(--color-primary-light)] text-left">Jesús Maria</p>
            </div>
        </div>
    )
}

export default CardUserProfile;