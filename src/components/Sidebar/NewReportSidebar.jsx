import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import TextInput from "../TextInput.jsx";
import Button from "../Button.jsx";
import { obtainCurrentLocation } from "../../utils/currentLocation.js";
import ImageInput from "../ImageInput.jsx";
import ApiService from "../../services/ApiService.js";
import Report from "../../models/ReportModel.js";
import { HttpStatusCode } from "axios";
import { useMapLocation } from "../../contexts/MapLocationContext.jsx";

const NewReportSidebar = ({ type, onBack, reportSubmitted }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState(null);
    const {mapLocation} = useMapLocation();

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
    

    const verifyInputsFilled = () => {
        if (!title || !description || !image) {
            alert("Please fill in all fields.");
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
            const responseReport = await ApiService.post("/reports/", {
                title,
                detail: description,
                type,
                user_id,
                image: "",
                address: ""
            });
            const report = new Report(responseReport.data);

            const responseLocation = await ApiService.post("/locations/", {
                latitude: location.latitude.toString(),
                longitude: location.longitude.toString(),
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


    return (
        <Sidebar>
            <button
                className="text-sm text-blue-500 hover:underline mb-4 cursor-pointer"
                onClick={onBack}
            >
                ← Back
            </button>
            <h2 className="text-lg font-bold mb-4 text-center" style={{margin: "1rem .5rem", padding: "0 1rem"}}>New Report</h2>
            
            <div className="flex flex-col items-center justify-center w-full" style={{padding: "0 1rem"}}> 
                <p className="text-center text-gray-700 mb-4">You are creating a new report of type: <strong>{type}</strong></p>
                <p className="text-center text-gray-700 mb-4">Please fill in the details below:</p>
                
                <form className="w-full" style={{margin: "1rem 0"}}>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <TextInput
                            label="Title"
                            placeholder="Enter report title"
                            className="mb-4"
                            width="w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        
                        <TextInput
                            label="Description"
                            placeholder="Enter report description"
                            className="mb-4"
                            width="w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <ImageInput
                            onChange={(image) => {
                                setImage(image);
                                console.log("Image selected:", image);
                            }}
                        />
                    </div>

                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            verifyInputsFilled() && submitInfo();
                        }}
                        width="w-full"
                    >Submit</Button>
                </form>
            </div>
        </Sidebar>
    );
}

export default NewReportSidebar;