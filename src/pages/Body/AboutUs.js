import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { isBackgroundColorDark } from '../../utill/textColor';


export default function AboutUs({backgroundColor}) {
  const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          padding: '20px 20px',
          width: '100%',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: textColor
        }}
      >
        <Stack direction="row" spacing={10} >
          <Box sx={{
            border: '2px solid #ccc', 
            boxShadow: '0 10px 10px rgba(0, 0, 0.1, 0.1)', 
            borderRadius: '8px', 
            overflow: 'hidden', 
          }}>
            <img 
            src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww' 
            alt='office'
            width='450px'
            >
            </img>
            
          </Box>

          <Stack direction="column">
            <Typography fontSize={15}><h1>About us</h1></Typography>
            <Typography>
              <p>The greatest glory in living lies not in never falling, but in rising every time we fall.</p>
              <p>The way to get started is to quit talking and begin doing.</p>
              <p>Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma  <br/>
                – which is living with the results of other people's thinking.</p>

                <Button variant="contained" href="#contained-buttons">
                  Read more🌟
                </Button>
            </Typography>
          </Stack>

        </Stack>
       </Box>
    </>
  )
}
