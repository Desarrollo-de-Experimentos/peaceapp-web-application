import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar.jsx";
import TextInput from "../../Input/TextInput.jsx";
import Button from "../../Input/Button.jsx";
import { obtainCurrentLocation } from "../../../utils/currentLocation.js";
import ImageInput from "../../Input/ImageInput.jsx";
import ApiService from "../../../services/ApiService.js";
import Report from "../../../models/ReportModel.js";
import { HttpStatusCode } from "axios";
import { useMapLocation } from "../../../contexts/MapLocationContext.jsx";
import theftIcon from "../../../assets/icons/map/theft-map.svg";
import TextArea from "../../Input/TextArea.jsx";
import Cloudinary from "../../../services/Cloudinary.js";

const NewReportSidebar = ({ type, onBack, reportSubmitted }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("Avenida Brasil cuadra 12");
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [period, setPeriod] = useState("p.m.");
    const [category, setCategory] = useState("Otros");
    const [formValid, setFormValid] = useState(false);
    const {mapLocation} = useMapLocation();

    useEffect(() => {
        // verify the type of the report in the URL as a query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const typeParam = urlParams.get("type");
        console.log("Type param:", typeParam);
        if (typeParam) {
            setCategory(typeParam);   
        }
    }, []);

    // getting the current time and setting it in the state
    useEffect(() => {
        const date = new Date();
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();

        const currentPeriod = currentHour >= 12 ? "p.m." : "a.m.";
        const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
        const formattedMinute = currentMinute < 10 ? `0${currentMinute}` : currentMinute;

        setHour(formattedHour.toString());
        setMinute(formattedMinute.toString());
        setPeriod(currentPeriod);
    }, []);

    // getting the current location and setting it in the state
    useEffect(() => {
        if (mapLocation) {
            console.log("Map location:", mapLocation);
            setLocation(mapLocation);
        } else {
            const fetchCurrentLocation = async () => {
                const location = await obtainCurrentLocation();
                setLocation(location);
            };
            fetchCurrentLocation();
        }
    }, [mapLocation]);

    // veryfing if the title and description are filled
    useEffect(() => {
        const isValid = title.trim() !== "" && description.trim() !== "";
        setFormValid(isValid);
    }, [title, description]);
    
    const verifyInputsFilled = () => {
        if (!description || !title) {
            alert("Please fill in all required fields.");
            return false;
        }
        return true;
    }
    

    const submitInfo = async () => {
        if (!verifyInputsFilled()) return;
        const userStorage = JSON.parse(localStorage.getItem("user"));
        if(!userStorage) {
            console.error("User not found in local storage.");
            return;
        }

        const {user_id} = userStorage;

        try {

            const imageUrl = await Cloudinary.uploadImage(image);

            const responseReport = await ApiService.post("/reports/", {
                title,
                detail: description,
                type,
                user_id,
                image: imageUrl? imageUrl : "",
                address: address
            });
            const report = new Report(responseReport.data);

            const responseLocation = await ApiService.post("/locations/", {
                latitude: location?.latitude?.toString() || "0",
                longitude: location?.longitude?.toString() || "0",
                idReport: report.id
            });

            if(responseReport.status === HttpStatusCode.Created && responseLocation.status === HttpStatusCode.Created) {
                setTitle("");
                setDescription("");
                setImage(null);
                setLocation(null);

                reportSubmitted();
            }else {
                alert("Error creating report or location.");
            }

        } catch(e) {
            console.error("Error submitting report:", e);
        }
    }

    const handleDelete = () => {
        setTitle("");
        setDescription("");
        setImage(null);
        onBack();
    }

    return (
        <Sidebar>
            <div className="flex flex-col h-100 px-4 py-3" style={{ margin: "0 1rem"  }}>
                <div className="mb-3">
                    <button 
                        className="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer" 
                        onClick={onBack}
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </button>
                </div>
                
                <div className="bg-[#EBF2F6] rounded-lg" style={{ padding: ".5rem 2rem", margin: "1rem 0"}}>
                    <h3 className="text-lg font-medium text-left">New Report</h3>
                </div>

                <div className="flex flex-col h-100">
                    <div className="mb-4">
                        <p className="text-s font-medium" style={{marginBottom: ".5rem"}}>{address}</p>
                    </div>

                    <div className="flex items-center gap-5" style={{ marginBottom: "1rem" }}>
                        <label className="text-s font-light mb-1 block">Time:</label>
                        <div className="flex items-center gap-2">
                            <label 
                                type="text" 
                                className="border rounded px-2 py-1 w-8 text-center border-[#55B0DB]"
                            >{hour}</label>
                            <span className="text-gray-500">:</span>
                            <label 
                                type="text" 
                                className="border rounded px-2 py-1 w-8 text-center border-[#55B0DB]"
                            >{minute}</label>
                            <label
                                className="border rounded px-2 py-1 w-14 text-center border-[#55B0DB]"
                            >{period} 
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-5" style={{ marginBottom: "1rem" }}>
                        <label className="text-sm font-light mb-1 block">Category:</label>
                        <div className="relative">
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border rounded px-3 py-2 w-full appearance-none bg-white border-[#55B0DB]"
                                style={{padding: "0.125rem 1rem"}}
                            >
                                <option value="theft">Robo</option>
                                <option value="car-accident">Accidente automovilístico</option>
                                <option value="lighting">Falta de iluminación</option>
                                <option value="harassment">Acoso</option>
                                <option value="other">Otro</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4" style={{ marginBottom: "1rem" }}>
                        <label className="text-sm font-medium mb-1 block">Title:</label>
                        <TextInput
                            placeholder="Añade un título breve"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">Description:</label>
                        
                        <TextArea
                            placeholder="Describe lo que sucedió"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            width={true}
                        />
                    </div>
                    
                    <div className="mb-4" style={{ marginBottom: "1rem" }}>
                        <label className="text-sm font-medium mb-1 block">Evidence:</label>
                        <ImageInput
                            image={image}
                            setImage={setImage}
                            icon={theftIcon}
                            text={"Add evidence"}
                            placeholder={"Add a photo of the incident"}
                            onChange={(file) => setImage(file)}
                        />
                    </div>

                    <div className="flex gap-2 mt-auto">
                        <button 
                            onClick={submitInfo}
                            className={`py-2 rounded flex-1 text-center ${
                                formValid 
                                    ? "bg-[#55B0DB] text-white hover:bg-[#4095BE] cursor-pointer" 
                                    : "bg-gray-200 text-gray-700 cursor-not-allowed"
                            }`}
                            style={{ padding: "0.5rem 1rem"}}
                        >
                            PUBLISH
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="border border-red-500 text-red-500 py-2 rounded flex-1 text-center cursor-pointer hover:bg-red-500 hover:text-white transition duration-200"
                            style={{ padding: "0.5rem 1rem"}}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default NewReportSidebar;