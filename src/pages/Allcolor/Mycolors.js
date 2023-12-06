import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


export default function MyColors() {
  const [ userColors, setUserColors ] = useState([]);
  const [ isMyColorExisting, setIsMyColorExisting ] = useState();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserColors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all/user/colors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserColors(response.data);
        setIsMyColorExisting(true);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate('/auth/login');
        } else {
        console.error('Error:', error);
        setIsMyColorExisting(false);
        }
      }
    };
    if (token) {  
      fetchUserColors();
    }
  }, [token, navigate]);

  if (!isMyColorExisting) {
    return <p>no colors registered yet</p>;
  }


  const handleDetailsClick = (orderNumber) => {
    navigate(`/all/getColors/${orderNumber}`, { state: { orderNumber } });
  };  

  const handleDeleteClick = async (orderNumber) => {
    const alert = window.confirm('Are you sure you want to delete this color?');
    if(alert) {
    try {

      await axios.delete(`${apiUrl}/all/user/colors/${orderNumber}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserColors(prevColors => prevColors.filter(color => color.orderNumber !== orderNumber));
    
    } catch (error) {
      console.error('Error:', error);
    }
  }
  };

  return (
    <>
    <br />
    <br />
    <h2>My Colors</h2>
    {userColors.map((color, index) => (
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
                    flexDirection: {xs: 'column', lg: 'row'},
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
            {/* ------each color box --------- */}
            <Stack spacing={2} marginLeft='10px'>
              <Button size='small' variant="contained" type='submit'sx={{ backgroundColor: '#FFBE33', color: 'white' }} onClick={() => handleDetailsClick(color.orderNumber)}>Details</Button>
              <Button size='small' variant="contained" type='submit'sx={{ backgroundColor: '#33AFFF', color: 'white' }} onClick={() => handleDeleteClick(color.orderNumber)}>Delete</Button>
          
            </Stack>
          </div>
        ))} 
    </>
);}


