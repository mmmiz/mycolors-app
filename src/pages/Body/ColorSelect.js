import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorSelect({ label, onMainColorChange, onAboutUsColorChange, onProductsColorChange, onNewsColorChange,onContactColorChange }) {
  const [color, setColor] = useState('white');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    // Call the appropriate callback function with the selected color
    switch (label) {
      case 'Main':
        if (onMainColorChange) {
          onMainColorChange(newColor.hex);
        }
        break;
      case 'About Us':
        if (onAboutUsColorChange) {
          onAboutUsColorChange(newColor.hex);
        }
        break;
      case 'Products':
        if (onProductsColorChange) {
          onProductsColorChange(newColor.hex);
        }
        break;
      case 'News':
        if (onNewsColorChange) {
          onNewsColorChange(newColor.hex);
        }
        break;
      case 'Contact':
        if (onContactColorChange) {
          onContactColorChange(newColor.hex);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
        <div style={{ width: '100%', height:"20vh", transition: 'background-color 0.3s ease-in-out' }}>
          
          <div onClick={() => setShowColorPicker(!showColorPicker)}>
            <Box
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
                position: 'relative', //  needed for dropdown
                zIndex: 2,
              }}
            >

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
                    width: "40px",
                    height: '40px', 
                    borderRadius: '50%',
                    backgroundColor: color, 
                    zIndex: 3,
                  }} 
                />
                <b>{label === 'About Us' ? 'About' : label }</b>
              </Stack>

              {showColorPicker && (
                <div 
                 style={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  top:"65%", 
                  left: 0, 
                }}>
                  <SketchPicker 
                   color={color} 
                   onChange={handleColorChange} 
                   styles={{
                    width: '150px'
                  }}/>
                </div>
              )}
            </div>

            </Box>
          </div>

        </div>
    </>
  );
}
