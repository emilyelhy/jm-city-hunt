import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

export default function CalibratePage() {
    const [ckptList, setCkptList] = useState([]);
    const [distanceList, setDistanceList] = useState([]);
    const [currentLat, setCurrentLat] = useState();
    const [currentLong, setCurrentLong] = useState();

    const success = (position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLong(position.coords.longitude);
    };

    const error = () => {
        console.log("Error in retrieving location details");
    };

    const calculateDistance = async (e, ckpt, i) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const distJSON = await fetch("https://jm-city-hunt-server.vercel.app/distance", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude, ckptNo: ckpt.ckptNo })
            });
            const dist = await distJSON.json();
            const distArray = [...distanceList]
            distArray[i] = dist.distance;
            setDistanceList(distArray);
            setCurrentLat(position.coords.latitude);
            setCurrentLong(position.coords.longitude);
        }, error);
    };

    const calibrate = async (e, ckpt, i) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const resJSON = await fetch("https://jm-city-hunt-server.vercel.app/calibrate", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude, ckptNo: ckpt.ckptNo })
            });
            const res = await resJSON.json();
            if (res.res) {
                const listJSON = await fetch("https://jm-city-hunt-server.vercel.app/allckpt", {
                    method: "GET"
                });
                const list = await listJSON.json();
                setCkptList(list.ckptList);
            }
        }, error);
    };

    useEffect(() => {
        const init = async () => {
            const listJSON = await fetch("https://jm-city-hunt-server.vercel.app/allckpt", {
                method: "GET"
            });
            const list = await listJSON.json();
            setCkptList(list.ckptList);
            setDistanceList(new Array(list.ckptList.length).fill(-999));
        };
        init();
    }, []);

    useEffect(() => {
        console.log("Running from Location.js");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    useEffect(() => {
        console.log(distanceList);
    }, [distanceList]);

    return (
        <div className="CalibratePage">
            <h1>Calibrate Page</h1>
            {currentLat && currentLong ?
                <h4>Current Location: ({currentLat}, {currentLong})</h4>
                :
                <h4>Current location not available</h4>
            }
            {ckptList.length > 0 ?
                <div className="ckptList">
                    {ckptList.map((ckpt, i) => {
                        return (
                            <div style={{ borderWidth: 1, borderColor: "#000000", borderStyle: "solid", paddingLeft: 20, paddingRight: 20, margin: 10 }} key={i}>
                                <h5>ckpt #: {ckpt.ckptNo}, description: {ckpt.description}</h5>
                                <h5>Saved geolocation: ({ckpt.location.latitude}, {ckpt.location.longitude})</h5>
                                <h5>Distance to this ckpt: {distanceList[i]}km</h5>
                                <Button variant="contained" style={{ margin: 10 }} onClick={(e) => calculateDistance(e, ckpt, i)}>Calculate distance</Button>
                                <Button variant="contained" style={{ margin: 10 }} onClick={(e) => calibrate(e, ckpt, i)}>Calibrate</Button>
                            </div>
                        )
                    })}
                </div>
                :
                <h3>Loading...</h3>
            }
        </div>
    )
}