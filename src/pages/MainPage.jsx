import React from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import CardUserProfile from "../components/CardUserProfile";
import ItemOption from "../components/ItemOption";
import mapIcon from "../assets/icons/map.svg";
import reportIcon from "../assets/icons/report.svg";
import locationIcon from "../assets/icons/location.svg";
import alertIcon from "../assets/icons/alert.svg";

const Main = () => {
    return (
        <div className="w-full h-screen">
            <Sidebar>
                <CardUserProfile style={{paddingLeft: "1rem"}} />

                <div className="flex flex-col gap-2 mt-4">
                    <ItemOption 
                        icon={mapIcon}
                        text="Map"
                        onClick={() => {}}
                        checked={true}
                    />

                    <ItemOption 
                        icon={reportIcon}
                        text="Reports"
                        onClick={() => {}}
                    />

                    <ItemOption 
                        icon={alertIcon}
                        text="Alerts"
                        onClick={() => {}}
                    />
        
                    <ItemOption 
                        icon={locationIcon}
                        text="Share location"
                        onClick={() => {}}
                    />
                </div>

            </Sidebar>
            <Map />
        </div>
    )
}

export default Main;