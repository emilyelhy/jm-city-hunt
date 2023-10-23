import React, { useState, useEffect } from "react";
import LoadingOverlay from 'react-loading-overlay';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Location() {
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [loggedInGroup, setLoggedInGroup] = useState();
    const navigate = useNavigate();

    const success = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    const error = () => {
        console.log("Error in retrieving location details");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    useEffect(() => {
        console.log("Running from Location.js");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    }, []);

    return (
        <div className="Location" style={{ flex: 1, backgroundColor: (!longitude || !latitude) ? "#000000" : "#00FF99", height: "100vh", alignItems: 'center', justifyContent: 'center', display: "flex" }}>
            
            <Button variant="contained" style={{ position: "absolute", right: 20, top: 10 }} onClick={logout}>Logout</Button>
            <LoadingOverlay
                active={!longitude || !latitude}
                spinner
                text="Retrieving..."
                fadeSpeed={100}>
                <h5>Group {loggedInGroup} logged in</h5>
                <h5>Detected Location:</h5>
                <h6>Longitude: {longitude}, Lattitude: {latitude}</h6>
            </LoadingOverlay>
        </div>
    )
}