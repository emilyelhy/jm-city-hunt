import React, { useState, useEffect } from "react";
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

    return (
        <div className="CurrentTaskPage" style={{ flex: 1, backgroundColor: (!longitude || !latitude) ? "#000000" : "#00FF99", height: "100vh", alignItems: 'center', justifyContent: 'center', display: "flex" }}>
            <LoadingOverlay
                active={!longitude || !latitude}
                spinner
                text="Retrieving..."
                fadeSpeed={100}>
                <h2>Group {loggedInGroup} logged in</h2>
                {currentCkptNo ?
                    <div>
                        <h3 style={{ marginBottom: 0 }}>Current checkpoint detail:</h3>
                        <h4 style={{ margin: 0 }}>Checkpoint No: {currentCkptNo}, Location: {ckptLocation.latitude}, {ckptLocation.longitude}</h4>
                        <h4 style={{ margin: 0 }}>Clue: {ckptClue}, Task Content: {ckptTaskContent}</h4>
                        <img style={{maxWidth: "50%"}} src={`data:image/png;base64,${imageByteArray}`} alt="Clue of task in pic"></img>
                    </div>
                    :
                    <></>
                }
                <h6>Detected Location: Latitude: {latitude}, Longitude: {longitude}</h6>
            </LoadingOverlay>
        </div>
    )
}