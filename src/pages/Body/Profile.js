import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { EnvelopeSimple } from 'phosphor-react';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${apiUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate('/auth/login');
        } else {
          console.error('Error Fetching user data:', error);
          console.log(token);

        setLoading(false);
        }
      });
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...please wait</div>;
  }

  if (!userInfo || !userInfo.user) {
    return <div>Error loading user data. Please try again later. you are not logged in correctly</div>;
  }

    return (
      <Box
        sx={{
          width: "400px",
          height: "350px",
          border: '2px #B2D3C2 solid',
          backgroundColor: '#f7f7f7',
          marginTop: '50px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
         
        }}
      >
        <Stack
          direction='column'
          justifyContent='center'
          alignContent='center'
          textAlign="center"
          spacing={2}
          sx={{ width: '100%', textAlign: 'center', marginTop: '40px' }}
        >
          <h1>Welcome <br/>
            {userInfo.user.username}!
          </h1>
          <p><b>Email<EnvelopeSimple size={20} /></b>: {userInfo.user.email}</p>
  
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Button
              component={Link}
              to="/auth/profile/edit"
              variant="contained"
              style={{ backgroundColor: '#FFBE33', color: 'white', width: 'fit-content', marginTop:'20px'}}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };
  
export default Profile;