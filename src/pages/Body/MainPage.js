import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function MainPage({ backgroundImage }) {
  console.log('Background Image URL:', backgroundImage);

  const [backgroundImageLog, setBackgroundImageLog] = useState('');

  useEffect(() => {
    setBackgroundImageLog(backgroundImage);
  }, [backgroundImage]);

  if (!backgroundImageLog){
    return <p>no background image </p>
  }

  return (
   <>
    <div>
      <Box 
        direction="row" 
        display='flex' 
        justifyContent="space-between" 
        alignItems="center"
        sx={{
          backgroundColor: '#F7F8FA',
          color: 'white',
          padding: '20px 20px',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
          width: '100%',
          height: '50px'
        }}
        >
         <Box 
            sx={{
              color: "#1F456E",
              marginLeft: '20px',
              textDecoration: 'none',
              fontSize: '17px'
            }}>
              <b>Example</b>
          </Box>
        
          
          <Stack direction="row" spacing={5} sx={{ justifyContent: 'center', alignItems: 'center', color: '#1F456E', marginRight: '30px'}}>
            <b>about</b>
            <b>products</b>
            <b>news</b>

            <Box > 
              <b>contact🌟</b>
            </Box>
          
          </Stack>
        </Box>
    
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundColor/${backgroundImage})`,
          backgroundSize: 'cover', 
          padding: '20px 20px',
          width: '100%',
          height: '70vh',
          position: 'relative',
        }}
      >

        <Box
          sx={{
            backgroundColor: '#F4F4F7',
            width: '40%',
            height: "55%",
            margin: '70px 0 0 150px', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',  
          }}
        >
          <Typography>
            <h1>Hello, Welcome!</h1>
            <p>Power corrupts; absolute power corrupts absolutely.</p> 
            <p>Speak softly and carry a big stick</p>
            <p>That's one small step for a man, a giant leap for mankind.	</p>
            <Button variant="contained" href="#contained-buttons">
              Read more🌟
            </Button>
          </Typography>
        </Box>

      </Box>

     </div>
   </>
  )
}
