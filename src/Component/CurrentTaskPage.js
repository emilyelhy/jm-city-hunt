import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import LoadingOverlay from 'react-loading-overlay';

export default function CurrentTaskPage() {
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [loggedInGroup, setLoggedInGroup] = useState();
    const [currentCkptNo, setCurrentCkptNo] = useState();
    const [ckptLocation, setCkptLocation] = useState();
    const [ckptClue, setCkptClue] = useState();
    const [ckptTaskContent, setCkptTaskContent] = useState();
    const [imageByteArray, setImageByteArray] = useState();

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

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    }, []);

    useEffect(() => {
        const getCurrentCkpt = async () => {
            const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/currentckpt", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupNo: loggedInGroup })
            });
            const msg = await msgJSON.json();
            if (Object.keys(msg).length === 0) {
                console.log("Game ended");
                return;
            }
            console.log(msg);
            setCurrentCkptNo(msg.ckptNo);
            setCkptLocation(msg.location);
            setCkptClue(msg.clue);
            setCkptTaskContent(msg.taskContent);
            const imageJSON = await fetch("https://jm-city-hunt-server.vercel.app/getimage", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ckptNo: msg.ckptNo })
            });
            const imageMsg = await imageJSON.json();
            const imgDataString = imageMsg.res;
            setImageByteArray(imgDataString);
        };
        if (loggedInGroup) getCurrentCkpt();
    }, [loggedInGroup]);

    const validateLocation = async (e) => {
        e.preventDefault();
        const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/validatelocation", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupNo: loggedInGroup, latitude: latitude, longitude: longitude, ckptNo: currentCkptNo })
        });
        const msg = await msgJSON.json();
        if (msg.res) {
            window.location.reload(false);
        }
        else {
            console.log("Not in range");
        }
    };

    return (
        <div className="CurrentTaskPage" style={{ flex: 1, backgroundColor: (!longitude || !latitude) ? "#000000" : "#00FF99", alignItems: 'center', justifyContent: 'center', display: "flex", overflow: "scroll" }}>
            <LoadingOverlay
                active={!longitude || !latitude}
                spinner
                text="Retrieving..."
                fadeSpeed={100}>
                {latitude && longitude ?
                    <div>
                        <h2>Group {loggedInGroup} logged in</h2>
                        {currentCkptNo ?
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <h3 style={{ marginBottom: 0 }}>Current checkpoint detail:</h3>
                                <h4 style={{ margin: 0 }}>Checkpoint No: {currentCkptNo}, Location: {ckptLocation.latitude}, {ckptLocation.longitude}</h4>
                                <h4 style={{ margin: 0 }}>Clue: {ckptClue}, Task Content: {ckptTaskContent}</h4>
                                <img style={{ maxWidth: "50%" }} src={`data:image/png;base64,${imageByteArray}`} alt="Clue of task in pic"></img>
                                <Button variant="contained" onClick={validateLocation}>Validate Location</Button>
                            </div>
                            :
                            <h3>Game Ended</h3>
                        }
                        <h6>Detected Location: Latitude: {latitude}, Longitude: {longitude}</h6>
                    </div>
                    :
                    <></>
                }
            </LoadingOverlay>
        </div>
    )
}