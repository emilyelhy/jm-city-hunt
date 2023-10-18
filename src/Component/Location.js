import React, { useState, useEffect } from "react";
import LoadingOverlay from 'react-loading-overlay';

export default function Location() {
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();


    const success = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    const error = () => {
        console.log("Error in retrieving location details");
    };

    useEffect(() => {
        console.log("Running from Location.js");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    return (
        <div className="Location" style={{ flex: 1, backgroundColor: (!longitude || !latitude) ? "#000000" : "#00FF99", height: "100vh", alignItems: 'center', justifyContent: 'center', display: "flex" }}>
            <LoadingOverlay
                active={!longitude || !latitude}
                spinner
                text="Retrieving..."
                fadeSpeed={100}>
                <h5>Detected Location:</h5>
                <h6>Longitude: {longitude}, Lattitude: {latitude}</h6>
            </LoadingOverlay>
        </div>
    )
}