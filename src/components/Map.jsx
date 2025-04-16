import React, { useEffect, useRef, useState } from 'react';
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

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);

    const [location, setLocation] = useState(null);

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

            // marking the user's location
            markerRef.current = new mapboxgl.Marker(userMarkerEl)
                .setLngLat([location.longitude, location.latitude])
                .addTo(mapRef.current);
        });

        // listen to map move event, this ensures the marker moves with the map
        mapRef.current.on("move", () => {
            const center = mapRef.current.getCenter();
            console.log("Map center:", center);
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
