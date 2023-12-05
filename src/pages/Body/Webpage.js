import React, { useEffect, useState } from 'react';
import Header from './Header';

import ColorSelect from './ColorSelect';
import BackgroundPicSelect from './BackgroundPicSelect';

import MainPage from './MainPage';
import AboutUs from './AboutUs';
import Products from './Products';
import News from './News';
import Contact from './Contact';
import Footer from './Footer';

import { Alert, AlertTitle, Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export default function Webpage() {

  const [mainColor, setMainColor] = useState('white'); // This is important 
  const [mainPageBackground, setMainPageBackground] = useState('black.jpg'); // be a relative path.

  const [aboutUsColor, setAboutUsColor] = useState('#ECECF0');
  const [productsColor, setProductsColor] = useState('white');
  const [newsColor, setNewsColor] = useState('#ECECF0');
  const [contactColor, setContactColor] = useState('white');

  const [isColorSelected, setIsColorSelected] = useState(false);
  const [isColorRegistered, setIsColorRegistered ] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const loginMessage = new URLSearchParams(location.search).get('loginSuccess');
  const guestLoginMessage = new URLSearchParams(location.search).get('guestLoginSuccess');
  const logoutMessage = new URLSearchParams(location.search).get('logoutSuccess');
  const registerMessage = new URLSearchParams(location.search).get('registerSuccess');


  useEffect(() => {
    if (
      aboutUsColor !== 'white' &&
      productsColor !== 'white' &&
      newsColor !== 'white' &&
      contactColor !== 'white'
    ) {
      setIsColorSelected(true);
    } else {
      setIsColorSelected(false);
    }


  }, [mainColor, aboutUsColor, productsColor, newsColor, contactColor, location.search]);


// Main 
  const handleBackgroundSelect = (selectedImage, selectedColor) => {
    setMainPageBackground(selectedImage);
    setMainColor(selectedColor);
  };

  const handleAboutUsColorChange = (newColor) => {
    setAboutUsColor(newColor);
  };

  const handleProductsColorChange = (newColor) => {
    setProductsColor(newColor);
  };

  const handleNewsColorChange = (newColor) => {
    setNewsColor(newColor);
  };

  const handleContactColorChange = (newColor) => {
    setContactColor(newColor);
  };

  const token = localStorage.getItem('token');
  const handleRegisterClick = () => {
    console.log('Register button clicked'); 

    if (token) {
      axios
        .post(`${apiUrl}/all/colors`, {
          mainColor: {
            name: mainColor,
            url: mainPageBackground,
          },
          aboutUsColor,
          productsColor,
          newsColor,
          contactColor,
        }, {
         
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data.message);
          setIsColorRegistered(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            navigate('/auth/login?message=loginRequired');
          } else {
            console.error('Error:', error);
            setIsColorRegistered(false);
          }
        });
    } else {
      console.log('Please select all colors before registering.');
    }
  };

  const messages = [
    { type: 'success', text: 'Login Success!', condition: loginMessage === 'true' },
    { type: 'success', text: 'Logged in as a guest', condition: guestLoginMessage === 'true' },
    { type: 'success', text: 'Logout Success!', condition: logoutMessage === 'true' },
    { type: 'success', text: 'Register Success, please login!', condition: registerMessage === 'true' },
    { type: 'success', text: 'Color Registration Success! Please check all colors', condition: isColorRegistered },
  ];

  const getMaxMessageLength = (messages) => {
    return Math.max(...messages.map((message) => message.text.length));
  };
  const maxMessageLength = getMaxMessageLength(messages);

  return (
    <div>
      <Header />
        <br />
        <Stack sx={{
          display: 'flex',
          alignItems: 'center',
          width: `${maxMessageLength *10}px`,
          margin: '0 auto',
        }}> 
          {messages.map((message, index) => (
            message.condition && (
            <Alert 
             key={index} 
             severity="success"
             style={{ width: '100%' }}
            >
              <AlertTitle>{message.type}</AlertTitle>
              <strong>{message.text}</strong>
            </Alert>
          )
        ))}
        </Stack>
       
      {/* Color select  */}
      <br/>
      <Stack>
        <Box sx={{
          display: 'flex',
          flexDirection: {xs: 'column', lg: 'row'},
          alignItems: 'center',
          margin: 'auto'
        }}>
          <BackgroundPicSelect onMainImageChange={handleBackgroundSelect} selectedColor={mainColor} />
          <ColorSelect label="About Us" onAboutUsColorChange={handleAboutUsColorChange} />
          <ColorSelect label="Products" onProductsColorChange={handleProductsColorChange} />
          <ColorSelect label="News" onNewsColorChange={handleNewsColorChange} />
          <ColorSelect label="Contact" onContactColorChange={handleContactColorChange} />
        </Box>
      </Stack>

      {/* REGISTER Button */}
        <div style={{ margin: '5px 0 100px 0', display: 'flex', justifyContent: 'center' }}>
          {token ? (
            <Button 
              variant="contained" 
              onClick={handleRegisterClick} 
              disabled={!isColorSelected}
              >
              Register
            </Button>
            
          ) : (
            <Button
            component={Link}
            to='auth/login?message=loginRequired'
            variant="contained" 
            disabled={!isColorSelected}>
              Register 
            </Button>
          )}
         </div>
        
      <MainPage backgroundImage={mainPageBackground} /> 
      <AboutUs backgroundColor={aboutUsColor} />
      <Products backgroundColor={productsColor} />
      <News backgroundColor={newsColor}/>
      <Contact backgroundColor={contactColor}/>
      <Footer />
    </div>
  );
}
