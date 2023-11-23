import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { Box } from '@mui/material';
import MainPage from '../Body/MainPage';
import AboutUs from '../Body/AboutUs';
import News from '../Body/News';
import Contact from '../Body/Contact';
import Products from '../Body/Products';

const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";



  export default function ColorDetail() {

    const { orderNumber } = useParams();
    const [colorDetail, setColorDetail] = useState({});
    const [mainPageBackground, setMainPageBackground] = useState('');
    
    const [registeredUser, setRegisteredUser] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const [ likedColors, setLikedColors ] = useState([]);
  
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token && orderNumber) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Details
        axios.get(`http://localhost:3000/all/getColors/${orderNumber}`)
          .then((response) => {
            setColorDetail(response.data);
            setMainPageBackground(response.data.mainColor.url);

            setRegisteredUser(response.data.user);
            console.log(response.data.user);
            console.log('Main Page Background URL:', response.data.mainColor);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
  

        // Fetch current user information
        axios
          .get(`${apiUrl}/auth/profile`)
          .then((response) => {
            setLoggedInUserId(response.data._id);
          })
          .catch((error) => {
            console.error('Error fetching current user:', error);
          });


          // Fetch users liked colors to determine which colors are liked by the current user
          // HOLD THE LIKE STATUS
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
          
          } else {
            navigate('/auth/login?message=loginRequired');
          }

    }, [orderNumber, navigate]);
  
    if (!colorDetail) {
      return <p>Color not found.</p>;
    }

    // LIKE
    const handleLikeClick = async (orderNumber) => {
      const token = localStorage.getItem('token');
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

   // DELETE
    const handleDeleteClick = async (orderNumber) => {
      const alert = window.confirm('Are you sure you want to delete this color?');
      const token = localStorage.getItem('token');

      if (alert) {
      try {
        const response = await axios.delete(`${apiUrl}/all/user/colors/${orderNumber}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setColorDetail(response.data);
        navigate('/');

      } catch (error) {
        console.error('Error:', error);
      }
    }
    };
  
    const backgroundColors = {
      aboutUsColor: colorDetail.aboutUsColor,
      productsColor: colorDetail.productsColor,
      newsColor: colorDetail.newsColor,
      contactColor: colorDetail.contactColor,
    };
  
    return (
      <>
        <br/>
        <h2>Color Details</h2>
        <div>
          {Object.keys(colorDetail).length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              {['mainColor', 'aboutUsColor', 'productsColor', 'newsColor', 'contactColor'].map((category, catIndex) => {
                const colorValue =
                  category === 'mainColor' && typeof colorDetail[category] === 'object'
                    ? colorDetail[category].name
                    : colorDetail[category];
                const displayValue = typeof colorValue === 'object' ? colorValue.name : colorValue;

                return (
                  <Box
                    key={catIndex}
                    sx={{
                      width: '150px',
                      height: '80px',
                      backgroundColor: '#F3F4F6',
                      margin: '10px',
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
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                      <div
                        style={{
                          backgroundColor: colorValue,
                          width: '40px',
                          height: '40px',
                          marginRight: '10px',
                          borderRadius: '50%',
                        }}
                      />
                      <b>{category.replace('Color', '')}</b>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p>{displayValue}</p>
                    </div>
                  </Box>
                );
              })}

            {loggedInUserId === registeredUser ? 
              (<button onClick={()=> handleDeleteClick(colorDetail.orderNumber) }>Delete</button>) 
              : 
              ( <p
                style={{
                  color: likedColors[colorDetail.orderNumber] ? 'red' : 'grey',
                  cursor: 'pointer',
                }}
                onClick={() => handleLikeClick(colorDetail.orderNumber)}
              >
                {likedColors[colorDetail.orderNumber] ? '❤︎ Liked' : '❤︎ Like'}
              </p>) 
            }
          </div>
         )}
        </div>

      <br /><br />
       <div style={{width: '100%'}}>
        <MainPage backgroundImage={mainPageBackground} />
        <AboutUs backgroundColor={backgroundColors.aboutUsColor} />
        <Products backgroundColor={backgroundColors.productsColor} />
        <News backgroundColor={backgroundColors.newsColor} />
        <Contact backgroundColor={backgroundColors.contactColor} />

       </div>
        
     </>
    );
  }
  