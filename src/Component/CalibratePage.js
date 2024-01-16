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
            distArray[i] = { distanceY: dist.distanceY, distanceF: dist.distanceF, distanceE: dist.distanceE };
            setDistanceList(distArray);
            setCurrentLat(position.coords.latitude);
            setCurrentLong(position.coords.longitude);
        }, error);
    };

    const calibrate = async (e, ckpt, type) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const resJSON = await fetch("https://jm-city-hunt-server.vercel.app/calibrate", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude, ckptNo: ckpt.ckptNo, type: type })
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
            setDistanceList(new Array(list.ckptList.length).fill({ distanceY: -999, distanceF: -999, distanceE: -999 }));
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
                                <h5 style={{ marginBottom: 0 }}>Saved geolocation: </h5>
                                <h5 style={{ margin: 0 }}>Youth: ({ckpt.location.Y.latitude}, {ckpt.location.Y.longitude})</h5>
                                <h5 style={{ margin: 0 }}>Family: ({ckpt.location.F.latitude}, {ckpt.location.F.longitude})</h5>
                                <h5 style={{ marginTop: 0 }}>Elderly: ({ckpt.location.E.latitude}, {ckpt.location.E.longitude})</h5>
                                <h5 style={{ marginBottom: 0 }}>Distance to this ckpt:</h5>
                                <h5 style={{ margin: 0 }}>Youth: {distanceList[i].distanceY * 1000}m</h5>
                                <h5 style={{ margin: 0 }}>Family: {distanceList[i].distanceF * 1000}m</h5>
                                <h5 style={{ marginTop: 0 }}>Elderly: {distanceList[i].distanceE * 1000}m</h5>
                                <Button variant="contained" style={{ margin: 10 }} onClick={(e) => calculateDistance(e, ckpt, i)}>Calculate distance</Button>
                                <Button variant="contained" color="error" style={{ margin: 10 }} onClick={(e) => calibrate(e, ckpt, "Y")}>Calibrate Youth</Button>
                                <Button variant="contained" color="error" style={{ margin: 10 }} onClick={(e) => calibrate(e, ckpt, "F")}>Calibrate Family</Button>
                                <Button variant="contained" color="error" style={{ margin: 10 }} onClick={(e) => calibrate(e, ckpt, "E")}>Calibrate Elderly</Button>
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