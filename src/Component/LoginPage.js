import React from "react";

export default function LoginPage() {

    const login = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        const msgJSON = await fetch("http://jm-city-hunt-server.vercel.app/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupNo: formJson.groupNo, password: formJson.password })
        });
        const msg = await msgJSON.json();
        const res = msg.res;
        console.log("[LoginPage.js] Received Msg: \"" + res + "\"");
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}