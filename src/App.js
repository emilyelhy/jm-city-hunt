import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes, HashRouter } from 'react-router-dom';

import './App.css';

import LoginPage from './Component/LoginPage';
import Dashboard from './Component/Dashboard';
import CalibratePage from './Component/CalibratePage';
import InfoPage from './Component/InfoPage';
import RegisterPage from './Component/RegisterPage';
import RegisterSuccessPage from './Component/RegisterSuccessPage';

function App() {
    const [loggedInGroup, setLoggedInGroup] = useState();

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    }, []);

    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={loggedInGroup ? <Navigate to="/menu" /> : <Navigate to="/info" />} />
                    <Route path="/info" element={<InfoPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/regsuccess" element={<RegisterSuccessPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/menu" element={<Dashboard />} />
                    <Route path="/calibrate" element={<CalibratePage />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
