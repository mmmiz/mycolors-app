import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

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
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('ERROR BOOM!', error);
      toast.error('Login failed. Please try again.');
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
      <ToastContainer />
    </>
  );
}
