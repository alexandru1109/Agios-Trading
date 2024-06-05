import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckEmail.css';

const CheckEmail: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="check-email-container">
      <div className="check-email-card">
        <h2>Înregistrare reușită!</h2>
        <p>Email-ul tău a fost verificat cu succes. Poți acum să te autentifici.</p>
        <button onClick={handleLogin}>Login Now</button>
      </div>
    </div>
  );
};

export default CheckEmail;
