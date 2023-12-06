import { Box, Button, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { User } from 'phosphor-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Login/logoutButton';
import GuestLogin from '../Login/GuestLogin';


export default function Header() {
  const isLoggedIn = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleMobileMenuToggle = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };


  // navi
  const navigationLinks = [
    {
      to: '/all/myColors',
      label: 'My colors',
      showWhenLoggedIn: true,
    },
    {
      to: '/all/myColors/likes',
      label: 'Likes',
      showWhenLoggedIn: true,
    },
    {
      label: 'Guest Login',
      showWhenLoggedIn: false,
    },  
    {
      to: '/auth/login',
      label: 'Login',
      showWhenLoggedIn: false,
    },
    {
      to: '/auth/register',
      label: 'Register',
      showWhenLoggedIn: false,
    },  
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#B2D3C2',
          color: 'white',
          padding: '20px 20px',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
          width: '100%',
        }}
      >

        <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{margin: '0 50px'}}>
          {/* Left side of the top bar */}
          <Box 
            component={Link}
            to='/'
            sx={{
              color: "#1F456E",
              marginLeft: '20px',
              textDecoration: 'none',
              fontSize: '17px'
            }}>
              <b>MY COLOR</b>
          </Box>

          {/* Right side of the top bar */}
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              component={Link}
              to="/all/getColors"
              variant="outlined"
              size="medium"
              sx={{
                color: "#1F456E",
                borderColor: '#1F456E',
                '&:hover': {
                  backgroundColor: '#1F456E',
                  textDecoration: 'none',
                  color: 'white',
                },
              }}
            >
              All colors
            </Button>
            
            {navigationLinks.map((link, index) => {
              if ((link.showWhenLoggedIn && isLoggedIn) || (!link.showWhenLoggedIn && !isLoggedIn)) {
                return (
                  <Button
                    key={index}
                    component={Link}
                    to={link.to}
                    variant="outlined"
                    size="medium" 
                    sx={{
                      color: "#1F456E",
                      borderColor: '#1F456E',
                      '&:hover': {
                        backgroundColor: '#1F456E',                    
                        color: 'white',
                      },
                    }}
                  >
                    {link.label !== 'Guest Login' ? (
                      link.label
                    ) : (
                      <div
                        style={{
                          color: "#1F456E",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            backgroundColor: '#1F456E',
                            color: 'white',
                          },                        
                          height: '25px',
                        }}
                      >
                        <GuestLogin />
                      </div>
                    )}
                  </Button>
                );
              }
              return null; 
            })}

       {isLoggedIn && (  
          <>
            <IconButton
              edge='end'
              color='inherit'
              aria-label='more'
              aria-controls='menu-appbar'
              asia-aria-haspopup='true'
              sx={{color: "#1F456E"}}
              onClick={handleClick}
            >
              <User size={20}/>
            </IconButton>
         

          <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/auth/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              Profile
            </Link>
          </MenuItem> 

          <MenuItem onClick={handleClose}>
            <Logout />
          </MenuItem>
        </Menu>
        </> 
     )}
    </Stack>
  </Stack>
  </Box>
    </>
  );
}
