import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { obtainCurrentLocation } from '../utils/currentLocation.js';
import IconOption from './ItemList/IconOption.jsx';
import plusIcon from '../assets/icons/plus.svg';
import IconOptionList from './ItemList/IconOptionList.jsx';
import { useWebSocketContext } from '../contexts/WebSocketContext.jsx';
import Location from "../models/LocationModel.js";
import { useMapLocation } from '../contexts/MapLocationContext.jsx';
import ApiService from '../services/ApiService.js';
import { HttpStatusCode } from 'axios';

const Map = ({ onNewReportClick }) => {
    /**
     * this component is responsible for displaying the map and the user's current location
     * ALERT: for our Mapbox plan we are limited to 50,000 map loads per month, so we need to be careful with the number of loads we do.
     * don't load the map if we don't need it, and don't load it more than once.
     */
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxToken) throw new Error("Mapbox token is not defined");

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);

    const [location, setLocation] = useState(null);
    const [mapIsLoaded, setMapIsLoaded] = useState(false);
    const {locationMessage} = useWebSocketContext();
    const {setMapLocation} = useMapLocation();

    const pointIcon = (type) => {
        switch (type) {
            case "Robo":
                return "src/assets/icons/map/theft-map.svg";
            case "Accidente":
                return "src/assets/icons/map/car-accident-map.svg";
            case "Acoso":
                return "src/assets/icons/map/harassment-map.svg";
            case "Falta de iluminación":
                return "src/assets/icons/map/lighting-map.svg";
            default:
                return "src/assets/icons/map/other-map.svg";
        }
    }

    // this effect is responsible for displaying the reports on the map when the component mounts
    useEffect(() => {
        if (!location || !mapRef.current || !mapIsLoaded) return;

        const fetchAndDisplayReports = async () => {
            try {
                const response = await ApiService.get(`/locations/`);
                if (response.status !== HttpStatusCode.Ok) {
                    console.error("Error fetching locations:", response.statusText);
                    return;
                }

                // getting the report types
                const reportsResponse = await ApiService.get(`/reports/`);
                if (reportsResponse.status !== HttpStatusCode.Ok) {
                    console.error("Error fetching reports:", reportsResponse.statusText);
                    return;
                }

                const reports = reportsResponse.data;
                const locations = response.data;

                console.log("Locations:", locations);
                console.log("Reports:", reports);

                locations.forEach(location => {
                    const reportType = reports.find(report => report.id === location.idReport)?.type;
                    console.log("Report type:", reportType);
                    if (!reportType) return;

                    const markerEl = document.createElement('div');
                    markerEl.className = 'custom-user-marker';
                    markerEl.style.backgroundImage = `url('${pointIcon(reportType)}')`;
                    markerEl.style.width = '50px';
                    markerEl.style.height = '50px';
                    markerEl.style.backgroundSize = 'contain';
                    markerEl.style.backgroundRepeat = 'no-repeat';
                    markerEl.style.zIndex = 1;

                    new mapboxgl.Marker(markerEl)
                        .setLngLat([location.alongitude, location.alatitude])
                        .addTo(mapRef.current);
                });
            } catch (e) {
                console.error("Error fetching reports:", e);
            }
        }

        fetchAndDisplayReports();
    }, [location, mapIsLoaded]);
    

    // this effect is responsible for displaying the report on the map when the user clicks on a new report
    useEffect(() => {
        if (!locationMessage || !mapRef.current) return;
        const location = new Location(locationMessage);
    
        const fetchAndDisplayReport = async () => {
            try {
                const response = await ApiService.get(`/reports/${location.idReport}`);
                if (response.status !== HttpStatusCode.Ok) {
                    console.error("Error fetching report:", response.statusText);
                    return;
                }
    
                const reportType = response.data.type;
                console.log("Report type:", reportType);
                if (!reportType) return;
    
                const markerEl = document.createElement('div');
                markerEl.className = 'custom-user-marker';
                markerEl.style.backgroundImage = `url('${pointIcon(reportType)}')`;
                markerEl.style.width = '50px';
                markerEl.style.height = '50px';
                markerEl.style.backgroundSize = 'contain';
                markerEl.style.backgroundRepeat = 'no-repeat';
                markerEl.style.zIndex = 1;
    
                new mapboxgl.Marker(markerEl)
                    .setLngLat([location.alongitude, location.alatitude])
                    .addTo(mapRef.current);
    
            } catch (e) {
                console.error("Error fetching report:", e);
            }
        };
    
        fetchAndDisplayReport();
    }, [locationMessage]);
    
    
    // this effect is responsible for getting the user's current location and setting it in the state when the component mounts
    useEffect(() => {
        const fetchLocation = async () => {
            const { latitude, longitude } = await obtainCurrentLocation();
            setLocation({ latitude, longitude });
        };
        fetchLocation();
    }, []); // getting the current location only once

    useEffect(() => {
        if (!location || !mapContainerRef.current || mapRef.current) return;

        mapboxgl.accessToken = mapboxToken;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [location.longitude, location.latitude],
            zoom: 16,
            attributionControl: false,
        });

        const userMarkerEl = document.createElement('div');
        userMarkerEl.className = 'custom-user-marker';
        userMarkerEl.style.backgroundImage = "url('src/assets/icons/current-location.svg')";
        userMarkerEl.style.width = '60px';
        userMarkerEl.style.height = '60px';
        userMarkerEl.style.backgroundSize = 'contain';
        userMarkerEl.style.backgroundRepeat = 'no-repeat';
        userMarkerEl.style.zIndex = 1;

        // listen to map load event, this ensures the map loads only once, verify the console for the message
        mapRef.current.on("load", () => {
            console.log("Map loaded");

            setMapIsLoaded(true);
            // marking the user's location
            markerRef.current = new mapboxgl.Marker(userMarkerEl)
                .setLngLat([location.longitude, location.latitude])
                .addTo(mapRef.current);
        });

        // listen to map move event, this ensures the marker moves with the map
        mapRef.current.on("move", () => {
            const center = mapRef.current.getCenter();
            setMapLocation({ latitude: center.lat, longitude: center.lng });
            markerRef.current?.setLngLat([center.lng, center.lat]);
        });

        mapRef.current.on('movestart', () => {
            userMarkerEl.classList.add('lifted');
        });
    
        mapRef.current.on('moveend', () => {
            userMarkerEl.classList.remove('lifted');
        });
        
        return () => {
            mapRef.current?.remove();
        };
    }, [location]); // only running when the location changes

    if (!location) return <div>Loading PeaceApp's Map...</div>;

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: '80%',
                height: '100vh',
                position: 'absolute',
                top: 0,
                right: 0,
            }}
        >
            <div className="absolute top-0 left-0 z-10 flex items-center justify-center gap-2" style={{ padding: "0.2rem 0.8rem", margin: "1rem" }}>
                <IconOption icon={plusIcon} text={"New report"} onClick={onNewReportClick} itemList={true} />
                <IconOptionList />
            </div>
        </div>
    );
};

export default Map;
