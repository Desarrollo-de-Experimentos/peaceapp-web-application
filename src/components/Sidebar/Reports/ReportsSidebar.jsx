import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar.jsx";
import ApiService from "../../../services/ApiService.js";
import {formatDistance, parseISO} from "date-fns";
import noImage from "../../../assets/img/no-image.png";

const ReportsSidebar = ({ onBack }) => {

    const [addressNearest, setAddressNearest] = useState("Avenida Brasil Cuadra 12");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        const fetchReports = async () => {
            try {
                const response = await ApiService.get("/reports/");
                const reports = response.data;
                reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

                setReports(reports);
                setLoading(false);

                console.log(reports);
            }catch(error) {
                console.error("Error fetching reports:", error);
            }
        }

        fetchReports();
    }, []);

    const formatTimeAgo = (dateString) => {
        try {
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }
            
            return formatDistance(date, new Date(), { addSuffix: true });
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    };

    return (
        <Sidebar>
            <div className="flex flex-col h-[80%] px-4 py-3" style={{ margin: "0 1rem" }}>
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
    
                <h2 className="text-lg" style={{color: "#000", margin: "1rem 0"}}>Reports near from <span className="font-semibold">{addressNearest}</span></h2>
    
                <div 
                    className="flex flex-col gap-2 overflow-y-auto h-full relative" 
                    style={{ 
                        flex: "1 1 auto", 
                        maxHeight: "calc(100% - 300px)",
                        paddingRight: "8px",
                        marginBottom: "1rem",
                        scrollbarWidth: "none", 
                        msOverflowStyle: "none", 
                    }}
                >
                    <style jsx>{`
                        .overflow-y-auto::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    
                    {
                        loading ? (
                            <div className="flex justify-center items-center h-full">
                                <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="3 3 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zm0 16a7 7 0 1 1 0-14a7 7 0 0 1 0 14z"></path>
                                    <path fill="currentColor" d="M12.5 6h-1v6h1V6zm-1.5-2a2.5 2.5 0 1 1-.001-4.001A2.5 2.5 0 0 1 11.001 4z"></path>
                                </svg>
                            </div>
                        ) : (
                            <>
                                {reports.map((report) => (
                                    <div 
                                        key={report.id} 
                                        className="flex gap-3 items-center" 
                                        style={{ 
                                            padding: "0.75rem", 
                                            borderRadius: "0.5rem",
                                            backgroundColor: "#f9f9f9", 
                                            marginBottom: "0.5rem",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                        }}
                                    >
                                        <div style={{ 
                                            minWidth: "4rem", 
                                            display: "flex", 
                                            justifyContent: "center", 
                                            alignItems: "center" 
                                        }}>
                                            <img 
                                                src={report.image ? report.image : noImage} 
                                                alt="Report" 
                                                className="rounded-lg object-cover" 
                                                style={{ 
                                                    borderRadius: "0.5rem", 
                                                    width: "4rem", 
                                                    height: "4rem",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center" style={{ flex: "1 1 auto" }}>
                                            <h3 className="text-lg font-semibold" style={{ marginBottom: "0.25rem" }}>{report.title}</h3>
                                            <p className="text-xs font-light" style={{ marginBottom: "0.25rem", lineHeight: "1.2" }}>{report.description}</p>
                                            <p className="text-xs font-light text-gray-500" style={{ fontStyle: "italic" }}>{formatTimeAgo(report.createdAt)}</p>
                                        </div>
                                    </div>
                                ))}
                                
                                {reports.length > 3 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" 
                                        style={{
                                            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 75%)"
                                        }}
                                    />
                                )}
                            </>
                        )
                    }
                </div>
                
                {reports.length > 3 && !loading && (
                    <div className="flex justify-center items-center text-gray-400 text-xs mt-1">
                        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                        <span className="ml-1">Desliza para ver más</span>
                    </div>
                )}
            </div>
        </Sidebar>
    );
};

export default ReportsSidebar;