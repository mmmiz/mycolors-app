import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/?logoutSuccess=true');
      console.log('token removed');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
       {loading && <p>Logging out...</p>}
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
};

export default Logout;
