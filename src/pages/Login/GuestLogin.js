import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export default function GuestLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    console.log("API URL:", apiUrl);

    try {
      setLoading(true);
      window.alert('Logging in.... ');

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
      setTimeout(() => {
        window.alert('Logging in.... ');
      }, 3000);
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
    </>
  );
}
