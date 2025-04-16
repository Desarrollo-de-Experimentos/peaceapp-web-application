import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import TextInput from "../TextInput.jsx";
import Button from "../Button.jsx";
import { obtainCurrentLocation } from "../../utils/currentLocation.js";
import ImageInput from "../ImageInput.jsx";

const NewReportSidebar = ({ type, onBack }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState(null);


    useEffect(() => {
        const fetchCurrentLocation = async () => {
            try {
                const location = await obtainCurrentLocation();
                console.log("Current location:", location);
                setLocation(location);
            }
            catch(e){
                console.error("Error obtaining location:", e);
            }
        }
        fetchCurrentLocation();
    }, []);

    const verifyInputsFilled = () => {
        if (!title || !description || !image) {
            alert("Please fill in all fields.");
            return false;
        }

        return true;
    }

    const submitInfo = async () => {
        if (!verifyInputsFilled()) return;

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);

            console.log("Submitting report with data:", formData.get("title"), formData.get("description"), formData.get("image"));
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