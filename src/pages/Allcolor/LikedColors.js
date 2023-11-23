import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


export default function LikedColors() {
  const [ likedColors, setLikedColors ] = useState([]);
 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchLikedColors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all/user/colors/likes`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setLikedColors(response.data);
      } catch(error) {
        if (error.response && error.response.status === 403) {
          navigate('/auth/login');
        }
      }
    };
    fetchLikedColors();
  }, [navigate]);

  
  // LIKE
    const handleLikeClick = async (orderNumber) => {
    const token = localStorage.getItem('token');
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post(`${apiUrl}/all/allColors/${orderNumber}/like`);

    const updatedLikedColors = likedColors.filter((color) => color.orderNumber !== orderNumber);
    setLikedColors(updatedLikedColors);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (!likedColors) {
    return <p>Color not found.</p>;
  }

 return (
    <>
      <br />
      <h2>Likes</h2>
      {likedColors.map((color, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {['mainColor', 'aboutUsColor', 'productsColor', 'newsColor', 'contactColor'].map((category, catIndex) => { 
             const colorValue = category === 'mainColor' && typeof color[category] === 'object'
              ? color[category].name 
              : color[category]; 
              const displayValue = typeof colorValue === 'object' ? colorValue.name : colorValue;

            return (
            <Box
              key={catIndex}
              sx={{
                width: '150px',
                height: '80px',
                backgroundColor: '#F3F4F6',
                margin: '10px',
                padding: '15px 8px 0 8px',
                borderRadius: '5%',
                border: '1px solid #DADBDD',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'black',
                transition: 'backgroundColor 0.3s',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <div
                  style={{
                    backgroundColor: colorValue,
                    width: '40px',
                    height: '40px',
                    marginRight: '10px',
                    borderRadius: '50%',
                  }}
                />
                <b>{category.replace('Color', '')}</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>{displayValue}</p>
              </div>
            </Box>
            );
          })}
          
          <Stack spacing={2} marginLeft='10px'>
            <p
              style={{
                color: likedColors ? 'red' : 'grey', 
                cursor: 'pointer',
              }}
              onClick={() => handleLikeClick(color.orderNumber)}
            >
              {likedColors ? '❤︎ Liked' : '❤︎ Like'}
            </p>
           </Stack> 

        </div>
      ))}
    </>
  );
}

