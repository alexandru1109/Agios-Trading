import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const isAuthenticated = () => {
    // Verifică dacă utilizatorul este autentificat
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated() && <Navbar />}
        <Routes>
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
