// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://test-server-be.onrender.com/api/message');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Message from server: {message}</p>
    </div>
  );
}

export default App;
