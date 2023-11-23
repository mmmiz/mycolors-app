
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Box, Button, Stack, TextField } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


const UserLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();
  
  const location = useLocation();
  const message = new URLSearchParams(location.search).get('message');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/?loginSuccess=true');

      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginMessage('Invalid credentials. Please try again.'); 

      } else {
        setLoginMessage('Login failed. Please try again later.'); 
      }
      console.error('Error logging in:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return (
    <div>
      {message === 'loginRequired' && (
        <Alert severity="error" sx={{marginTop: '30px'}}>
          <AlertTitle>Error</AlertTitle>
          Need to log in to access the page — <strong>Please log in!</strong>
        </Alert>
      )}

      <Box
        sx={{
          width: "400px",
          height: "400px",
          border: '2px #B2D3C2 solid',
          backgroundColor: '#f7f7f7',
          marginTop: '30px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
         
        }}
      >
        <Stack spacing={2} sx={{ width: '100%', textAlign: 'center', marginTop: '40px' }}>
          <h2>User Login</h2>

          <form onSubmit={handleSubmit} sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Stack spacing={1}
              direction='column'
              justifyContent='center'
              alignContent='center'
              textAlign="center"
              sx={{ width: '100%', paddingX: '10%' }} 
            >
            <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange}  sx={{width: '80%'}} required/> 
            <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange}  sx={{width: '80%'}} required/> 
            </Stack>

        
  
            <Stack direction="row" justifyContent="center" sx={{ width: '100%', marginTop: '30px' }}>
              <Button
                variant="contained"
                type='submit'
                sx={{ backgroundColor: '#FFBE33', color: 'white', width: 'fit-content' }}
              >
                Login
              </Button>
            </Stack>
       
          </form>


              <Link  
                to="/auth/register"
                style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: '#A9AFB9',
                '&:hover': {
                  textDecoration: 'underline'
                }}}>
                  New users?
                </Link>
              
            <p style={{ color: 'red' }}>{loginMessage}</p>
      </Stack>
      </Box>
    </div>
    
  );
};

export default UserLoginForm;


