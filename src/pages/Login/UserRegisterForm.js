import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
    
      setErrorMessage('');
      console.log(response.data);
      navigate('/?registerSuccess=true');
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('User with this email address already exists.'); 
      } else {
        setErrorMessage('Error registering user. Please try again later.');  
      }
      console.error('Error registering user:', error);
    }
  };

  const formFields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <div>
      <Box sx={{
        width: {xs: "320px", lg: '400px'},
        height: '470px',
        border: '2px #B2D3C2 solid',
        backgroundColor: '#f7f7f7',
        marginTop: '50px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}>
        <Stack textAlign='center' marginTop='20px'>
         <h2>User Registration</h2>
          <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.name} style={{ textAlign: 'center'}}>
                <TextField sx={{width: '80%', marginTop: '10px'}} 
                label={field.label}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange} 
                required
                />
              </div>
            ))}

            <br/ >
            <Button
              variant="contained"
              type='submit'
              sx={{ backgroundColor: '#FFBE33', color: 'white', width: 'fit-content' }}
            >
              Register
            </Button>
        
           </form>
        </Stack>
      </Box>
      
      {/* {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

    </div>
  );
};

export default RegisterForm;
