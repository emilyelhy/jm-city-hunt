import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes, HashRouter } from 'react-router-dom';

import './App.css';

import LoginPage from './Component/LoginPage';
import Location from './Component/Location';

function App() {
    const [loggedInGroup, setLoggedInGroup] = useState();

    useEffect(() => {
        setLoggedInGroup(localStorage.getItem("group"));
    }, []);

    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={loggedInGroup ? <Navigate to="/location" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/location" element={<Location />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
