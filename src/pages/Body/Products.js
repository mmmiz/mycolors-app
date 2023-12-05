import React from 'react';
import { Box, Stack } from '@mui/material';
import { isBackgroundColorDark } from '../../utill/textColor';

export default function Products({ backgroundColor }) {
  const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  const products = [
    { name: 'Product 1', imageSrc: '/backgroundColor/product.jpg' },
    { name: 'Product 2', imageSrc: '/backgroundColor/product.jpg' },
    { name: 'Product 3', imageSrc: '/backgroundColor/product.jpg' },
  ];

  return (
    <div>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          padding: '20px 20px',
          width: '100%',
          height: { xs: 'auto', sm: '100vh' },
          textAlign: 'center',
        }}
      >
        <Stack direction="column" alignItems="center" marginBottom={5}>
          <h2>Products</h2>
          <b>Learn more about our products</b>
        </Stack>

        <Stack
          container
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 3 }}
        >
          {products.map((product, index) => (
            <Stack
              item
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto', 
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#F2F3F4',
                  color: 'black',
                  width: '70%',
                  height: '55vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '10px',
                }}>
                <img src={product.imageSrc} alt={product.name} width="60%" />
                <h2>{product.name}</h2>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </div>
  );
};
