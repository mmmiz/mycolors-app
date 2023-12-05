import React, { useState } from 'react';
import { Box, Stack} from '@mui/material';


export default function BackgroundPicSelect({ onMainImageChange, selectedColor }) {
  const [showSelect, setShowSelect] = useState(false);

  const handleBoxClick = () => {
    setShowSelect(!showSelect);
  };

  const handleColorSelect = (color) => {
    onMainImageChange(color.url, color.name); 
  };

  const predefinedImages = [
    { url: 'black.jpg', name: 'Black' },
    { url: 'blue.jpg', name: 'Blue' },
    { url: 'green.jpg', name: 'Green' },
    { url: 'orange.jpg', name: 'Orange' },
    { url: 'pink.jpg', name: 'Pink' },
    { url: 'purple.jpg', name: 'Purple' },
    { url: 'red.jpg', name: 'Red' },
    { url: 'white.jpg', name: 'White' },
    { url: 'yellow.jpg', name: 'Yellow' },

  ];

  return (
      <>
       <div style={{ width: '100%', height: '20vh', transition: 'background-color 0.3s ease-in-out' }}>
        <Box
          onClick={handleBoxClick}
          sx={{
            width: '150px',
            height: '80px',
            backgroundColor: '#F3F4F6',
            margin: '3px',
            padding: '15px 8px 0 8px',
            borderRadius: '5%',
            border: '1px solid #DADBDD',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'black',
            transition: 'backgroundColor 0.3s',
            '&:hover': {
              backgroundColor: 'white',
              color: 'black',
            },
            position: 'relative', 
            zIndex: showSelect ? 4 : 2,
          }}
        >
          {showSelect && (
            <div
              style={{
                position: 'absolute',
                top: '105%',
                left: '0',
                width: '100%',
                backgroundColor: '#f9fafb',
                zIndex: 4,
                border: '1px solid #B2D3C2',
                borderRadius: '3%',
              }}>

              {predefinedImages.map((color, index) => (  // DROPDOWN 
                 <div
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    width: '100%',
                    height: '30px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    lineHeight: '30px',
                  }}>
                  {color.name}
                </div>
              ))}

            </div>
          )}

        <div style={{ position: 'relative' }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -65%)',
            }}
          >
             <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: selectedColor.toLowerCase(),
                zIndex: 3,
              }}
            />
            <b>Main</b>
          </Stack>
         </div>

        </Box> 
      </div>
    </>
  );
}
