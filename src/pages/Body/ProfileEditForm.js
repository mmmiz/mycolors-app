import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const ProfileEditForm = () => {
  const [newEmail, setNewEmail] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
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
        setOriginalEmail(response.data.user.email);
        setNewEmail(response.data.user.email);
      })
      .catch((error) => {
        console.error('Error Fetching user data:', error);
      });
    }
  }, []);

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (originalEmail === 'guest_login@gmail.com') {
      setShowAlert(true);
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `${apiUrl}/auth/profile/edit`,
        { newEmail }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Email updated successfully:', response.data.message);
      navigate('/auth/profile');
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  return (
    <Box sx={{
      width: "400px",
      height: "350px",
      border: '2px #B2D3C2 solid',
      backgroundColor: '#f7f7f7',
      marginTop: '50px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    }}>
       <Stack
          direction='column'
          justifyContent='center'
          alignContent='center'
          textAlign="center"
          sx={{ width: '100%', textAlign: 'center' }} 
          >
        <h1 style={{ marginTop: '40px' }}>Edit Profile</h1>

        <form onSubmit={handleSubmit} sx={{ textAlign: 'center' }}>
          <h3>New email </h3>
          <TextField sx={{width: '80%'}} label="Email" type="email" value={newEmail} onChange={handleEmailChange} required/>
       
          <Stack direction="row" justifyContent="center" sx={{ width: '100%', marginTop: '30px' }}>
            <Button
              variant="contained"
              type='submit'
              disabled={originalEmail === 'guest_login@gmail.com'}
              sx={{ backgroundColor: '#FFBE33', color: 'white', width: 'fit-content' }}
            >
              Update
            </Button>
          </Stack>

        </form>

        </Stack>

        {/* Alert Dialog */}
        <Dialog open={showAlert} onClose={handleAlertClose}>
          <DialogTitle>Cannot change email for guest user</DialogTitle>
          <DialogContent>
            <p>You cannot change the email for the guest user.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
};

export default ProfileEditForm;
