import { Route, Navigate, Routes, HashRouter } from 'react-router-dom';

import './App.css';

import LoginPage from './Component/LoginPage';
import Location from './Component/Location';

function App() {
    return (
        <div className="App">
            <HashRouter>
				<Routes>
					<Route exact path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/location" element={<Location />} />
				</Routes>
			</HashRouter>
        </div>
    );
}

export default App;
