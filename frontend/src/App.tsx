import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';
import BusinessNews from './pages/BusinessNews';
import StockList10 from './pages/Products';
import Balance from './pages/Balance';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Login />} />
                <Route path="/news" element={<BusinessNews />} />
                <Route path="/stocks" element={<StockList10 />} />
                <Route path="/balance" element={Balance} />
            </Routes>
        </Router>
    );
};

export default App;
