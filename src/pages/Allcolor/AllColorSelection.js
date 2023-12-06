import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";


export default function AllColorSelection() {
  const navigate = useNavigate();
  const [allColors, setAllColors] = useState([]);
  const [likedColors, setLikedColors] = useState([]);


  useEffect(() => {
    axios.get(`${apiUrl}/all/getColors`)
    .then((response) => {
      setAllColors(response.data);
    }) 
    .catch((error) => {
       console.error('Error fetching colors:', error);
    })

    const token = localStorage.getItem('token');
    if(token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   
       
    // Like status
    axios.get(`${apiUrl}/all/user/colors/likes`)
    .then((response) => {
      const userLikedColors = response.data.reduce((acc, color) => {
        acc[color.orderNumber] = true;
        return acc;
      }, {});
      setLikedColors(userLikedColors);
    })
    .catch((error) => {
      console.error('Error fetching liked colors:', error);
    }); 
    }
  }, [navigate]);

  
  // LIKE 
  const handleLikeClick = async (orderNumber) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login?message=loginRequired');
    }
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(`${apiUrl}/all/allColors/${orderNumber}/like`);
      
      setLikedColors(prevLikedColors => ({
        ...prevLikedColors,
        [orderNumber]: response.data.isLiked
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  // DETAILS
  const handleDetailsClick = (orderNumber) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/all/getColors/${orderNumber}`);
    } else {
      navigate('/auth/login?message=loginRequired');
    }
  };



  return (
    <>
      <br />
      <div style={{ textAlign: 'center' }}>
        <h2>All Colors</h2>
        <Grid container spacing={2}>
          {allColors.map((color, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  backgroundColor: '#F3F4F6',
                  margin: '10px',
                  padding: '15px 8px 0 8px',
                  borderRadius: '5%',
                  border: '1px solid #DADBDD',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'backgroundColor 0.3s',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
              >
                {/* Your content */}
                <Stack spacing={2} marginLeft='10px'>
                  <Button
                    size='small'
                    variant="contained"
                    type='submit'
                    sx={{ backgroundColor: '#FFBE33', color: 'white' }}
                    onClick={() => handleDetailsClick(color.orderNumber)}
                  >
                    Details
                  </Button>
                  <p
                    style={{
                      color: likedColors[color.orderNumber] ? 'red' : 'grey',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleLikeClick(color.orderNumber)}
                  >
                    {likedColors[color.orderNumber] ? '❤︎ Liked' : '❤︎ Like'}
                  </p>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Stack } from '@mui/material';

// export default function AllColorSelection() {
//   const navigate = useNavigate();
//   const [allColors, setAllColors] = useState([]);
//   const [likedColors, setLikedColors] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/all/getColors');
//         setAllColors(response.data);
      
//       } catch (error) {
//         console.error('Error fetching colors:', error);
//       }
//     };

//    // Like status
//     axios.get('http://localhost:3000/all/user/colors/likes')
//     .then((response) => {
//       const userLikedColors = response.data.reduce((acc, color) => {
//         acc[color.orderNumber] = true;
//         return acc;
//       }, {});
//       setLikedColors(userLikedColors);
//     })
//     .catch((error) => {
//       console.error('Error fetching liked colors:', error);
//     });


//     fetchData();
//   }, [navigate]);

  
//   // LIKE 
//   const handleLikeClick = async (orderNumber) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/auth/login?message=loginRequired');
//     }
//     try {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const response = await axios.post(`http://localhost:3000/all/allColors/${orderNumber}/like`);
      
//       setLikedColors(prevLikedColors => ({
//         ...prevLikedColors,
//         [orderNumber]: response.data.isLiked
//       }));
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  
//   // DETAILS
//   const handleDetailsClick = (orderNumber) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       navigate(`/all/getColors/${orderNumber}`);
//     } else {
//       navigate('/auth/login?message=loginRequired');
//     }
//   };




//   return (
//     <>
//       <br />
//       <div style={{textAlign: 'center'}}>
//       <h2>All Colors</h2>
//       {allColors.map((color, index) => (
//         <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          
//           {['mainColor', 'aboutUsColor', 'productsColor', 'newsColor', 'contactColor'].map((category, catIndex) => {
//             const colorValue =
//               category === 'mainColor' && typeof color[category] === 'object'
//                 ? color[category].name
//                 : color[category];
//             const displayValue = typeof colorValue === 'object' ? colorValue.name : colorValue;

//             return (
//               <Box
//                 key={catIndex}
//                 sx={{
//                   width: '150px',
//                   height: '80px',
//                   backgroundColor: '#F3F4F6',
//                   margin: '10px',
//                   padding: '15px 8px 0 8px',
//                   borderRadius: '5%',
//                   border: '1px solid #DADBDD',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   transition: 'backgroundColor 0.3s',
//                   '&:hover': {
//                     backgroundColor: 'white',
//                     color: 'black',
//                   },
//                 }}
//               >
//                 <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
//                   <div
//                     style={{
//                       backgroundColor: colorValue,
//                       width: '40px',
//                       height: '40px',
//                       marginRight: '10px',
//                       borderRadius: '50%',
//                     }}
//                   />
//                   <b>{category.replace('Color', '')}</b>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <p>{displayValue}</p>
//                 </div>
//               </Box>
//             );
//           })}
  
//           <Stack spacing={2} marginLeft='10px'>

          
//             <Button size='small' variant="contained" type='submit'sx={{ backgroundColor: '#FFBE33', color: 'white' }} onClick={() => handleDetailsClick(color.orderNumber)}>Details</Button>

//             <p
//               style={{
//                 color: likedColors[color.orderNumber] ? 'red' : 'grey',
//                 cursor: 'pointer',
//               }}
//               onClick={() => handleLikeClick(color.orderNumber)}
//             >
//               {likedColors[color.orderNumber] ? '❤︎ Liked' : '❤︎ Like'}
//             </p>

//           </Stack>
//         </div>
//       ))}

//       </div>
//     </>
//   );
// }

