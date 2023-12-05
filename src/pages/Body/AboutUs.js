import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { isBackgroundColorDark } from '../../utill/textColor';

export default function AboutUs({ backgroundColor }) {
  const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          padding: '20px 20px',
          width: '100%',
          height: { sm: '100vh', lg: '80vh' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: textColor,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
          spacing={10}
          sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
        >
          {/* <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww"
            alt="office"
            sx={{
              // width: { xs: '80%', sm: '70%', md: '50%', lg: '30%' },
              width: '30px',
              height: 'auto',
              maxWidth: '450px',
            }}
          /> */}

          <Stack
            direction="column"
            sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left' } }}
          >
            <h1>About us</h1>
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
  );
}
