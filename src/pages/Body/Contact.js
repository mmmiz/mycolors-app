import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { isBackgroundColorDark } from '../../utill/textColor';

export default function Footer({backgroundColor}) {
  const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  return (  
    <Box
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        padding: '70px 20px',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px', 
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        justifyContent="space-between"
      >
        {/* Left side of the footer */}
        <Box sx={{marginLeft: '30px'}}>
          <h2>My Colors</h2>
          <p>© 2023 MyPalette</p>
        </Box>
  
        {/* Right side of the footer */}
        <Stack direction="column" spacing={2}>
          <Typography sx={{textDecoration: 'underline'}}>About</Typography>
          <Typography sx={{textDecoration: 'underline'}}>Products</Typography>
          <Typography sx={{textDecoration: 'underline'}}>News</Typography>
        </Stack>

        <Button>Contact</Button>
     
      </Stack>
      <Stack>
      </Stack>
    </Box>
  );
}
