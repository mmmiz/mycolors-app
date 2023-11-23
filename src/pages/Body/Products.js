import React from 'react';
import { Box, Stack } from '@mui/material';
import { isBackgroundColorDark } from '../../utill/textColor';


export default function Products({ backgroundColor }) {
  const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  return (
    <div>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          padding: '20px 20px',
          width: '100%',
          height: '80vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'

        }}
      >
        <Stack direction="column" alignItems="center" textAlign="center" marginBottom={5}>
          <h2>Products</h2>
          <b>Learn more about our products</b>
        </Stack>

        <Stack // parents
          direction="row"
          spacing={5}
          justifyContent="center"
          alignItems="center" 
          marginBottom={5}
        >
          <Box
            sx={{
              backgroundColor: '#F2F3F4',
              color: 'black',
              width: '20%',
              height: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <img
              src="/backgroundColor/product.jpg"
              alt="product"
              width="60%"
            />
            <h2>Product 1</h2>
          </Box>

          <Box
            sx={{
              backgroundColor: '#F2F3F4',
              color: 'black',
              width: '20%',
              height: '50vh', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <img
              src="/backgroundColor/product.jpg"
              alt="product"
              width="60%"
            />
            <h2>Product 2</h2>
          </Box>

          <Box
            sx={{
              backgroundColor: '#F2F3F4',
              color: 'black',
              width: '20%',
              height: '50vh', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* Your product content goes here */}
            <img
              src="/backgroundColor/product.jpg"
              alt="product"
              width="60%"
            />
            <h2>Product 3</h2>
            {/* Add more product information */}
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
 



