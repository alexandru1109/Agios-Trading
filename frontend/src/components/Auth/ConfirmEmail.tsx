import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ConfirmEmail.css';

const ConfirmEmail = () => {
    const { token } = useParams<{ token: string }>();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await axios.get(`/api/auth/verify/${token}`);
                console.log(response.data); // Adaugă acest rând pentru a vedea răspunsul în consolă
                if (response.data.success) {
                    setMessage('Înregistrare cu succes!');
                    setTimeout(() => {
                        navigate('/login');  // Redirecționare către pagina de login după un timp
                    }, 3000);
                } else {
                    setMessage('Link de confirmare invalid sau expirat.');
                }
            } catch (error) {
                setMessage('Eroare de server. Vă rugăm să încercați din nou mai târziu.');
            }
        };
        confirmEmail();
    }, [token, navigate]);

    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <h2>{message}</h2>
            </div>
        </div>
    );
};

export default ConfirmEmail;
