
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [message, setMessage] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mycolors-api.onrender.com/api/message');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to update the message on the server
      await axios.post('https://mycolors-api.onrender.com/api/message', {
        message: inputText,
      });

      // Fetch the updated message
      fetchData();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Message from server: {message}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Test Enter something:
          <input type="text" value={inputText} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Test;
