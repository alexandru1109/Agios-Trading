import React from 'react';
import './Navbar.css';
import profileImage from '../assets/profile.png'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="profile-card" onClick={() => window.location.href = '#profile'}>
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <span className="profile-name">Hana, CEO</span>
        </div>
      </div>
      <div className="navbar-links">
        <ul>
          <li className="active"><a href="#dashboard">Dashboard</a></li>
          <li><a href="#business-info">Business Info</a></li>
          <li><a href="#clients">Clients</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#balance">Balance</a></li>
        </ul>
      </div>
      <div className="navbar-links others">
        <ul>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
