import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

export default function ChangeMemberPage() {
    const [loggedInGroup, setLoggedInGroup] = useState();
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const getMembers = async () => {
            const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/memberlist", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupNo: loggedInGroup })
            });
            const msg = await msgJSON.json();
            const tempMemberList = [...msg.memberList];
            for (let i = 0; i < 6 - msg.memberList.length; i++)
                tempMemberList.push({ name: "", phone: "", email: "", PIC: false })
            console.log(tempMemberList);
            setMemberList(tempMemberList);
        };
        if (loggedInGroup) getMembers();
    }, [loggedInGroup])

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    }, []);

    const handleMemberList = (e, i, attr) => {
        e.preventDefault();
        const tempMemberList = [...memberList];
        const memberObj = { ...tempMemberList[i] };
        memberObj[attr] = e.target.value;
        tempMemberList[i] = memberObj;
        setMemberList(tempMemberList);
    };

    const update = async (e) => {
        e.preventDefault();
        const tempMemberList = [];
        for (let i = 0; i < 6; i++) {
            if (memberList[i].name.length > 0) tempMemberList.push(memberList[i]);
        }
        const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/updatemember", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupNo: loggedInGroup, memberList: tempMemberList })
        });
        const msg = await msgJSON.json();
        console.log(msg);
    };

    return (
        <div className="ChangeMemberPage">
            <h1>Change Member for Group {loggedInGroup}</h1>
            {memberList.length > 0 ?
                <form onSubmit={(e) => update(e)}>
                    <div style={{ margin: 10 }}>
                        <h4 style={{ margin: 15 }}>Participant 1 (PIC) *compulsory field</h4>
                        <TextField variant="outlined" label="Full Name" value={memberList[0].name} onChange={(e) => handleMemberList(e, 0, "name")} required></TextField >
                        <TextField variant="outlined" label="Phone No" value={memberList[0].phone} onChange={(e) => handleMemberList(e, 0, "phone")} required></TextField >
                        <TextField variant="outlined" label="Email" value={memberList[0].email} onChange={(e) => handleMemberList(e, 0, "email")} required></TextField >
                    </div>
                    <div style={{ margin: 10 }}>
                        <h4 style={{ margin: 15 }}>Participant 2</h4>
                        <TextField variant="outlined" label="Full Name" value={memberList[1].name} onChange={(e) => handleMemberList(e, 1, "name")}></TextField >
                        <TextField variant="outlined" label="Phone No" value={memberList[1].phone} onChange={(e) => handleMemberList(e, 1, "phone")} required={memberList[1].name.length > 0}></TextField >
                        <TextField variant="outlined" label="Email" value={memberList[1].email} onChange={(e) => handleMemberList(e, 1, "email")} required={memberList[1].name.length > 0}></TextField >
                    </div>
                    <div style={{ margin: 10 }}>
                        <h4 style={{ margin: 15 }}>Participant 3</h4>
                        <TextField variant="outlined" label="Full Name" value={memberList[2].name} onChange={(e) => handleMemberList(e, 2, "name")}></TextField >
                        <TextField variant="outlined" label="Phone No" value={memberList[2].phone} onChange={(e) => handleMemberList(e, 2, "phone")} required={memberList[2].name.length > 0}></TextField >
                        <TextField variant="outlined" label="Email" value={memberList[2].email} onChange={(e) => handleMemberList(e, 2, "email")} required={memberList[2].name.length > 0}></TextField >
                    </div>
                    <div style={{ margin: 10 }}>
                        <h4 style={{ margin: 15 }}>Participant 4</h4>
                        <TextField variant="outlined" label="Full Name" value={memberList[3].name} onChange={(e) => handleMemberList(e, 3, "name")}></TextField >
                        <TextField variant="outlined" label="Phone No" value={memberList[3].phone} onChange={(e) => handleMemberList(e, 3, "phone")} required={memberList[3].name.length > 0}></TextField >
                        <TextField variant="outlined" label="Email" value={memberList[3].email} onChange={(e) => handleMemberList(e, 3, "email")} required={memberList[3].name.length > 0}></TextField >
                    </div>
                    <div style={{ margin: 10 }}>
                        <h4 style={{ margin: 15 }}>Participant 5</h4>
                        <TextField variant="outlined" label="Full Name" value={memberList[4].name} onChange={(e) => handleMemberList(e, 4, "name")}></TextField >
                        <TextField variant="outlined" label="Phone No" value={memberList[4].phone} onChange={(e) => handleMemberList(e, 4, "phone")} required={memberList[4].name.length > 0}></TextField >
                        <TextField variant="outlined" label="Email" value={memberList[4].email} onChange={(e) => handleMemberList(e, 4, "email")} required={memberList[4].name.length > 0}></TextField >
                    </div>
                    <div style={{ margin: 10 }}>
                        <h4 style={{ margin: 15 }}>Participant 6</h4>
                        <TextField variant="outlined" label="Full Name" value={memberList[5].name} onChange={(e) => handleMemberList(e, 5, "name")}></TextField >
                        <TextField variant="outlined" label="Phone No" value={memberList[5].phone} onChange={(e) => handleMemberList(e, 5, "phone")} required={memberList[5].name.length > 0}></TextField >
                        <TextField variant="outlined" label="Email" value={memberList[5].email} onChange={(e) => handleMemberList(e, 5, "email")} required={memberList[5].name.length > 0}></TextField >
                    </div>
                    <Button variant="contained" style={{ margin: 10 }} type="submit">Update</Button>
                </form>
                :
                <></>
            }
        </div>
    )
}