import React, { useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import CardUserProfile from "../components/CardUserProfile";
import ItemOption from "../components/ItemOption";
import mapIcon from "../assets/icons/map.svg";
import reportIcon from "../assets/icons/report.svg";
import locationIcon from "../assets/icons/location.svg";
import alertIcon from "../assets/icons/alert.svg";
import mapFilledIcon from "../assets/icons/map-filled.svg";
import reportFilledIcon from "../assets/icons/report-filled.svg";
import locationFilledIcon from "../assets/icons/location-filled.svg";
import alertFilledIcon from "../assets/icons/alert-filled.svg";


const Main = () => {
    // manage the state of the selected option
    const [selectedOption, setSelectedOption] = useState("map");

    // function to handle the click event of the options
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="w-full h-screen">
            <Sidebar>
                <CardUserProfile style={{paddingLeft: "1rem"}} />

                <div className="flex flex-col gap-2 mt-4">
                    <ItemOption 
                        icon={selectedOption === "map" ? mapFilledIcon : mapIcon}
                        text="Map"
                        onClick={() => handleOptionClick("map")}
                        checked={selectedOption === "map"}
                    />

                    <ItemOption 
                        icon={selectedOption === "report" ? reportFilledIcon : reportIcon}
                        text="Reports"
                        onClick={() => handleOptionClick("report")}
                        checked={selectedOption === "report"}
                    />

                    <ItemOption 
                        icon={selectedOption === "alerts" ? alertFilledIcon : alertIcon}
                        text="Alerts"
                        onClick={() => handleOptionClick("alerts")}
                        checked={selectedOption === "alerts"}
                    />
        
                    <ItemOption 
                        icon={selectedOption === "location" ? locationFilledIcon : locationIcon}
                        text="Share location"
                        onClick={() => handleOptionClick("location")}
                        checked={selectedOption === "location"}
                    />
                </div>

            </Sidebar>
            <Map />
        </div>
    )
}

export default Main;