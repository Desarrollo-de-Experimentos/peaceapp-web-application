import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { obtainCurrentLocation } from '../utils/currentLocation.js';
import IconOption from './IconOption.jsx';
import plusIcon from '../assets/icons/plus.svg';
import IconOptionList from './IconOptionList.jsx';


const Map = ({ onNewReportClick }) => {
    /**
     * this component is responsible for displaying the map and the user's current location
     * ALERT: for our Mapbox plan we are limited to 50,000 map loads per month, so we need to be careful with the number of loads we do.
     * don't load the map if we don't need it, and don't load it more than once.
     */
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxToken) throw new Error("Mapbox token is not defined");

    const mapRef = useRef();
    const mapContainerRef = useRef();

    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            const { latitude, longitude } = await obtainCurrentLocation();
            console.log("Latitude: ", latitude, "Longitude: ", longitude);
            setLocation({ latitude, longitude });
        };
        fetchLocation();
    }, []); // getting the current location only once

    useEffect(() => {
        if (location && !mapRef.current) {
            // only initializing the map if it hasn't been initialized yet
            mapboxgl.accessToken = mapboxToken;
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [location.longitude, location.latitude],
                zoom: 16,
                attributionControl: false,
            });

            // listen to map load event, this ensures the map loads only once, verify the console for the message
            mapRef.current.on('load', () => {
                console.log("Map loaded");
            });
        } else if (location && mapRef.current) {
            // updating the map's center and zoom if location changes
            mapRef.current.setCenter([location.longitude, location.latitude]);
            mapRef.current.setZoom(16);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [location]); // only running when the location changes

    if (!location) return <div>Loading the peaceapp...</div>;

    return (
        <div id="map-container" ref={mapContainerRef} style={{ 
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