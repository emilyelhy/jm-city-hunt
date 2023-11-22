import React, { useEffect, useState } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { AiOutlineCheck, AiOutlineClose, AiOutlineCompass } from "react-icons/ai";

export default function History() {
    const [loggedInGroup, setLoggedInGroup] = useState();
    const [allCkpt, setAllCkpt] = useState([]);
    const [ckptRecord, setCkptRecord] = useState();
    const [taskRecord, setTaskRecord] = useState();

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    }, []);

    useEffect(() => {
        const init = async () => {
            const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/currentckpt", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupNo: loggedInGroup })
            });
            const msg = await msgJSON.json();
            const listJSON = await fetch("https://jm-city-hunt-server.vercel.app/allckpt", {
                method: "GET"
            });
            const list = await listJSON.json();
            setAllCkpt(list.ckptList);
            let ckptRecord = new Array(list.ckptList.length).fill(0);
            let taskRecord = new Array(list.ckptList.length).fill(0);
            if (Object.keys(msg).length > 0) ckptRecord[msg.ckptNo - 1] = 1;
            const recordJSON = await fetch("https://jm-city-hunt-server.vercel.app/progress", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupNo: loggedInGroup })
            });
            const records = await recordJSON.json();
            for (let i = 0; i < records.visitedCkpts.length; i++) ckptRecord[Number(records.visitedCkpts[i]) - 1] = 2;
            for (let i = 0; i < records.completedTasks.length; i++) taskRecord[Number(records.completedTasks[i]) - 1] = 1;
            console.log(ckptRecord);
            console.log(taskRecord);
            setCkptRecord(ckptRecord);
            setTaskRecord(taskRecord);
        };
        if (loggedInGroup) init();
    }, [loggedInGroup]);

    useEffect(() => {
        console.log("ckptRecord:", ckptRecord);
        console.log("taskRecord:", taskRecord);
    }, [ckptRecord, taskRecord])

    return (
        <div className="History" style={{ flex: 1, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {ckptRecord && taskRecord ?
                <div>
                    <h4>History Page of Group {loggedInGroup}</h4>
                    {allCkpt.map((ckpt, i) => {
                        return (
                            <div style={{ borderWidth: 1, borderColor: "#000000", borderStyle: "solid", marginBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <h3>Checkpoint No: {ckpt.ckptNo}</h3>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                                    <h5 style={{ marginRight: 10 }}>Visiting status</h5>
                                    {ckptRecord[i] === 2 ?
                                        <AiOutlineCheck />
                                        : ckptRecord[i] === 1 ?
                                            <AiOutlineCompass />
                                            :
                                            <AiOutlineClose />}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                                    <h5 style={{ marginRight: 10 }}>Task status</h5>
                                    {taskRecord[i] === 1 ?
                                        <AiOutlineCheck />
                                        :
                                        <AiOutlineClose />}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                :
                <h1>Loading...</h1>
            }
        </div>
    )
}