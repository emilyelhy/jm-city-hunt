import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';

import Login from './Component/Login';
import Location from './Component/Location';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/location" element={<Location />} />
				</Routes>
			</BrowserRouter>
        </div>
    );
}

export default App;
