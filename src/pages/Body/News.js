import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { isBackgroundColorDark } from '../../utill/textColor';

export default function News({ backgroundColor }) {
  const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';


  const data = Array.from({ length: 3 }, (_, index) => ({
    date: '2023 Sep',
    product: 'Product',
    description: 'We cannot solve problems with the kind of thinking we employed when we came up with them.',
  }));

  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          padding: '20px 20px',
          width: '100%',
          height: {xs: '120vh', sm: '89vh'},
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Stack textAlign='center' marginTop='-60px' flexDirection='column'>
          <h2>News</h2>
          <p>We cannot solve problems with the kind of thinking we employed when we came up with them.</p>
        </Stack>

      {data.map((item, index) => (
        <Box
          key={index}
          textAlign="center"
          sx={{
            color: 'grey',
            width: '80%',
            height: 'auto',
            borderBottom: `1px ${textColor} solid`,
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            flexDirection: 'row', 
            marginTop: '20px',
          }}
        >
          <p>{item.date}</p>
          <Box
            textAlign="center"
            sx={{
              backgroundColor: 'grey',
              color: 'white',
              width: '80px',
              height: '30px',
              borderRadius: '20px',
              marginLeft: '10px', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {item.product}
          </Box>
          <p style={{ marginLeft: '10px' }}>{item.description}</p>
        </Box>
      ))}

      <Button sx={{backgroundColor: backgroundColor}}>
        read more
      </Button>
      </Box>
    </>
  );
}
