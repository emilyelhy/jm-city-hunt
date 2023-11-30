import React from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterSuccessPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="RegisterSuccessPage">
            <h1>You have registered successfully</h1>
            <h1>Your group number is {state.groupNo}</h1>
            <Button variant="contained" onClick={() => navigate("/")}>Back</Button>
        </div>
    )
}