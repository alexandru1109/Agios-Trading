// frontend/src/components/Auth/Verify.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Verify: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const confirmEmail = async () => {
      try { 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify/${token}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Error verifying email');
        }

        setMessage('Your email has been confirmed. Redirecting to login...');
        setTimeout(() => {
          navigate('/checkemail'); // Redirecționează către pagina de confirmare
        }, 2000); // Redirecționează după 2 secunde
      } catch (error) {
        setMessage('Error confirming your email. Please try again.');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <div className="verify-container">
      <h2>Email Confirmation</h2>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
