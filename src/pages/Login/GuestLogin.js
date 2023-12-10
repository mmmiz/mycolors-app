import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


const LoadingMessage = ({ loading }) => {
  const [isVisible, setIsVisible] = useState(loading);

  useEffect(() => {
    let timeout;
    if (loading) {
      setIsVisible(true);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    } else {
      setIsVisible(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [loading]);

  return isVisible ? (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
      Logging in...
    </div>
  ) : null;
};


export default function GuestLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    console.log("API URL:", apiUrl);

    try {
      setLoading(true);

      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: 'guest_login@gmail.com',
        password: '12345678',
      });

      console.log(response.data.message);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/?guestLoginSuccess=true');
    } catch (error) {
      console.error('ERROR BOOM!', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <>
      <p onClick={handleGuestLogin}>{loading ? 'Logging in...' : 'Guest Login'}</p>
      <LoadingMessage loading={loading} />
    </>
  );
}
