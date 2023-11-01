import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [loginFail, setLoginFail] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("group")) navigate("/menu");
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        if(!formJson.groupNo || !formJson.password) {
            setLoginFail(true);
            return;
        }
        const msgJSON = await fetch("https://jm-city-hunt-server.vercel.app/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupNo: formJson.groupNo, password: formJson.password })
        });
        const msg = await msgJSON.json();
        const res = msg.res;
        console.log("[LoginPage.js] Received Msg: \"" + res + "\"");
        if (res) {
            setLoginFail(false);
            localStorage.setItem('group', formJson.groupNo);
            navigate("/menu");
        } else {
            setLoginFail(true);
        }
    };

    return (
        <div className="Login" style={{ display: "flex", flex: 1, flexDirection: "column", height: "100vh", alignItems: 'center', justifyContent: 'center' }}>
            <h2>Login Page</h2>
            <form className="LoginInput" onSubmit={login}>
                <label>
                    Group no: <input name="groupNo" />
                </label>
                <label>
                    Password: <input name="password" />
                </label>
                {loginFail ? <h6 style={{ color: "#FF0000" }}>Wrong password</h6> : <></>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}