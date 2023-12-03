import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function MainPage() {
    const [loggedInGroup, setLoggedInGroup] = useState();
    const [allCkpt, setAllCkpt] = useState([]);
    const [imgList, setImgList] = useState([]);
    const [userType, setUserType] = useState();
    const [ckptRecord, setCkptRecord] = useState([]);
    const [taskRecord, setTaskRecord] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    //     if (navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setLatitude(position.coords.latitude);
    //             setLongitude(position.coords.longitude);
    //         }, () => {
    //             console.log("Error in retrieving location details");
    //         });
    //     }
    }, []);

    useEffect(() => {
        const init = async () => {
            // get all ckpt
            const listJSON = await fetch("https://jm-city-hunt-server.vercel.app/allckptsafe", {
                method: "GET"
            });
            const list = await listJSON.json();
            setAllCkpt(list.ckptList);
            // get type of user
            const typeJSON = await fetch("https://jm-city-hunt-server.vercel.app/usertype", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupNo: loggedInGroup })
            });
            const type = await typeJSON.json();
            setUserType(type.type);
            // get all images
            const imgJSON = await fetch("https://jm-city-hunt-server.vercel.app/getallimage", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userType: type.type })
            });
            const images = await imgJSON.json();
            setImgList(images.imageList);
            // calculate ckptRecord and taskRecord
            let ckptRecord = new Array(list.ckptList.length).fill(0);
            let taskRecord = new Array(list.ckptList.length).fill(0);
            const recordJSON = await fetch("https://jm-city-hunt-server.vercel.app/progress", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupNo: loggedInGroup })
            });
            const records = await recordJSON.json();
            for (let i = 0; i < records.visitedCkpts.length; i++) ckptRecord[Number(records.visitedCkpts[i]) - 1] = 1;
            for (let i = 0; i < records.completedTask.length; i++) taskRecord[Number(records.completedTask[i]) - 1] = 1;
            setCkptRecord(ckptRecord);
            setTaskRecord(taskRecord);
        }
        if (loggedInGroup) init();
    }, [loggedInGroup]);

    const refresh = async () => {
        // calculate ckptRecord and taskRecord
        let ckptRecord = new Array(allCkpt.ckptList.length).fill(0);
        let taskRecord = new Array(allCkpt.ckptList.length).fill(0);
        const recordJSON = await fetch("https://jm-city-hunt-server.vercel.app/progress", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupNo: loggedInGroup })
        });
        const records = await recordJSON.json();
        for (let i = 0; i < records.visitedCkpts.length; i++) ckptRecord[Number(records.visitedCkpts[i]) - 1] = 1;
        for (let i = 0; i < records.completedTask.length; i++) taskRecord[Number(records.completedTask[i]) - 1] = 1;
        setCkptRecord(ckptRecord);
        setTaskRecord(taskRecord);
    };

    const validate = async (e, ckpt) => {
        e.preventDefault();
        console.log("Validate for ckpt", ckpt.ckptNo);
        // navigator.geolocation.getCurrentPosition(async (position) => {
        //     const resJSON = await fetch("https://jm-city-hunt-server.vercel.app/calibrate", {
        //         method: "POST",
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude, ckptNo: ckpt.ckptNo, type: userType })
        //     });
        //     const res = await resJSON.json();
        //     if (res.res) refresh();
        //     setLatitude(position.coords.latitude);
        //     setLongitude(position.coords.longitude);
        // }, () => {
        //     console.log("Error in retrieving location details");
        // });
    };

    return (
        <div className="TaskMainPage">
            <h1>Main Page for Group {loggedInGroup}</h1>
            {allCkpt.length > 0 && imgList.length > 0 && ckptRecord.length > 0 && taskRecord.length > 0 && userType ?
                <div>
                    {allCkpt.map((ckpt, i) => {
                        return (
                            <div style={{ borderWidth: 1, borderColor: "#000000", borderStyle: "solid", margin: 10 }} key={i}>
                                <h3>Ckpt #{ckpt.ckptNo}</h3>
                                {ckptRecord[i] === 0 ?
                                    <div>
                                        <img style={{ maxWidth: "50%" }} src={`data:image/png;base64,${imgList[i].data}`} alt="Clue of task in pic"></img>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                            <h5>Clue: {ckpt.clue[userType]}</h5>
                                            <Button variant="contained" onClick={(e) => validate(e, ckpt)}>Validate</Button>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        )
                    })}
                    <h4>Your current location: ({latitude ? latitude : "--"}, {longitude ? longitude : "--"})</h4>
                </div>
                :
                <h4>Loading...</h4>
            }
        </div>
    )
}