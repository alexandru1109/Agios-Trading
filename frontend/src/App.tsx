import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import BusinessNews from './pages/BusinessNews';
import StockList10 from './pages/Products';
import Balance from './pages/Balance';
import Chatbot from './pages/Chatbot'; // Asigură-te că această cale este corectă
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login/:userId?" element={<Login />} />
        <Route path="/register/:referralCode?" element={<Register />} />
        <Route path="/forgot-password/:token?" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/news" element={<BusinessNews />} />
        <Route path="/stocks" element={<StockList10 />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/chatbot" element={<Chatbot />} /> {/* Ruta pentru pagina Chatbot */}
      </Routes>
    </Router>
  );
};

export default App;
