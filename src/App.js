
// // src/App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';  // Import Routes
// import axios from 'axios';

// const Home = ({ message }) => (
//   <div>
//     <h1>React Frontend</h1>
//     <p>Message from server: {message}</p>
//   </div>
// );

// const About = () => (
//   <div>
//     <h2>About</h2>
//     <p>This is the about page.</p>
//   </div>
// );

// const Contact = () => (
//   <div>
//     <h2>Contact</h2>
//     <p>This is the contact page.</p>
//   </div>
// );

// function App() {
//   const [message, setMessage] = useState('');
//   const [inputText, setInputText] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://test-server-be.onrender.com/api/message');
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to update the message on the server
//       await axios.post('https://test-server-be.onrender.com/api/message', {
//         message: inputText,
//       });

//       // Fetch the updated message
//       fetchData();
//     } catch (error) {
//       console.error('Error updating message:', error);
//     }
//   };

//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/" element={<Home message={message} />} />
//         </Routes>

//         <form onSubmit={handleSubmit}>
//           <label>
//             Enter something:
//             <input type="text" value={inputText} onChange={handleInputChange} />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </Router>
//   );
// }

// export default App;


// src/App.js
// import React from 'react';
// import Test from './page/Test';

// function App() {
//   return (
//     <>
//       <h1>React Frontend</h1>
//       <Test />
//     </>
//   );
// }
// export default App;


// import Routes from './routes/index';
// import { BrowserRouter as Router } from 'react-router-dom';

// export default function App() {
//   return (
//     <Router>
//     <div>
//       <header>
//         <Routes />
//       </header>
//     </div>
//     </Router>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components for different pages
const HomePage = () => <div>Home Page</div>;
const LoginPage = () => <div>Login Page</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/auth/login" element={LoginPage} />
      </Routes>
    </Router>
  );
};

export default App;





