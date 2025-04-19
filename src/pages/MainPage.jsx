import React, { useState } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import Map from "../components/Map.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import ReportsSidebar from "../components/Sidebar/ReportsSidebar.jsx";
import AlertsSidebar from "../components/Sidebar/AlertsSidebar.jsx";
import LocationsSidebar from "../components/Sidebar/LocationsSidebar.jsx";
import OptionsNewReportSidebar from "../components/Sidebar/OptionsNewReportSidebar.jsx";
import CardUserProfile from "../components/CardUserProfile.jsx";
import ItemOption from "../components/ItemOption.jsx";
import mapIcon from "../assets/icons/map.svg";
import reportIcon from "../assets/icons/report.svg";
import locationIcon from "../assets/icons/location.svg";
import alertIcon from "../assets/icons/alert.svg";
import mapFilledIcon from "../assets/icons/map-filled.svg";
import reportFilledIcon from "../assets/icons/report-filled.svg";
import locationFilledIcon from "../assets/icons/location-filled.svg";
import alertFilledIcon from "../assets/icons/alert-filled.svg";
import NewReportSidebar from "../components/Sidebar/NewReportSidebar.jsx";
import { MapLocationProvider } from "../contexts/MapLocationContext.jsx";

const Main = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [sidebarView, setSidebarView] = useState("main"); // NEW

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSidebarView(option || "main");
    };

    
    const locationURL = useLocation()
    const navigate = useNavigate()

    const params = new URLSearchParams(locationURL.search)
    const reportType = params.get('type')

    const renderSidebar = () => {
        if (locationURL.pathname === "/new-report" && reportType) {
            return (
                <NewReportSidebar
                    type={reportType}
                    onBack={() => navigate(-1)} // back to previous page
                    reportSubmitted={() => {
                        setSidebarView("main");
                        navigate("/", { replace: true });
                    }}
                />
            );
        }

        switch (sidebarView) {
            case "report":
                return <ReportsSidebar onBack={() => setSidebarView("main")} />;
            case "alerts":
                return <AlertsSidebar onBack={() => setSidebarView("main")} />;
            case "location":
                return <LocationsSidebar onBack={() => setSidebarView("main")} />;
            case "newReport":
                return <OptionsNewReportSidebar onBack={() => {setSidebarView("main"); navigate(-1)}} />;
            default:
                return (
                    <Sidebar>
                        <CardUserProfile style={{ paddingLeft: "1rem" }} />
                        <div className="flex flex-col gap-2 mt-4">
                            <ItemOption
                                icon={mapIcon}
                                text="Map"
                                onClick={() => handleOptionClick("")}
                                checked={selectedOption === "map"}
                            />
                            <ItemOption
                                icon={reportIcon}
                                text="Reports"
                                onClick={() => handleOptionClick("report")}
                                checked={selectedOption === "report"}
                            />
                            <ItemOption
                                icon={alertIcon}
                                text="Alerts"
                                onClick={() => handleOptionClick("alerts")}
                                checked={selectedOption === "alerts"}
                            />
                            <ItemOption
                                icon={locationIcon}
                                text="Share location"
                                onClick={() => handleOptionClick("location")}
                                checked={selectedOption === "location"}
                            />
                        </div>
                    </Sidebar>
                );
        }
    };

    return (
        <div className="w-full h-screen flex">
            <MapLocationProvider>
                {renderSidebar()}

                <Map onNewReportClick={() => {setSidebarView("newReport"); navigate("/new-report")}} />
            </MapLocationProvider>
        </div>
    );
};

export default Main;
