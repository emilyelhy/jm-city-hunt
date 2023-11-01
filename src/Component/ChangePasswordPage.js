import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const [currentGroup, setCurrentGroup] = useState();
    const [updateFail, setUpdateFail] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("group")) navigate("/login");
        else setCurrentGroup(localStorage.getItem("group"));
    }, [navigate]);

    const changePassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        if (!formJson.oldPassword || !formJson.newPassword || !formJson.validateNewPassword) {
            setUpdateFail(true);
            return;
        }
        if (formJson.newPassword !== formJson.validateNewPassword) {
            setUpdateFail(true);
            return;
        }
        if (formJson.newPassword === formJson.oldPassword) {
            setUpdateFail(true);
            return;
        }
        const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/changepassword", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupNo: currentGroup, oldPassword: formJson.oldPassword, newPassword: formJson.newPassword })
        });
        const msg = await msgJSON.json();
        const res = msg.res;
        console.log("[LoginPage.js] Received Msg: \"" + res + "\"");
        if (res) {
            setUpdateFail(false);
        } else {
            setUpdateFail(true);
        }
    };

    return (
        <div className="ChangePasswordPage" style={{ display: "flex", flex: 1, height: "100vh" }}>
            <form className="ChangePasswordInput" onSubmit={changePassword}>
                <h5>
                    Updating password of group {currentGroup}
                </h5>
                <label>
                    Old password: <input name="oldPassword" />
                </label>
                <label>
                    New password: <input name="newPassword" />
                </label>
                <label>
                    Re-enter new password: <input name="validateNewPassword" />
                </label>
                {updateFail ? <h6 style={{ color: "#FF0000" }}>Fail to change</h6> : <></>}
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}