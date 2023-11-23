import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationMenu from './page/navigationMenu';
import HomePage from './page/HomePage';
import LoginPage from "./page/LoginPage";
import Test from './page/Test';


const App = () => {
  return (
    <Router>
      <div>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<LoginPage />} />
          <Route path="/contact" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;







