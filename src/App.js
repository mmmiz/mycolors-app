
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationMenu from './page/navigationMenu';
import HomePage from './page/HomePage';
import LoginPage from "./page/LoginPage";
import Test from './page/Test';

import RootLayout from './layout/Root';

import ColorLayout from './layout/ColorLayout';
import AllcolorSelection from './pages/Allcolor/AllColorSelection';
import MyColors from './pages/Allcolor/Mycolors';
import LikedColors from './pages/Allcolor/LikedColors';
import ColorDetail from './pages/Allcolor/ColorDetail';

import AuthLayout from './layout/AuthLayout'
import LoginPageForm from './pages/Login/LoginPageForm';
import UserRegisterForm from './pages/Login/UserRegisterForm';
import Profile from './pages/Body/Profile';
import ProfileEditForm from './pages/Body/ProfileEditForm';



const App = () => {
  return (
    <Router>

      <div>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<LoginPage />} />
          <Route path="/Test" element={<Test />} />
        </Routes>
      </div>

      <div>
      <Routes>
        <Route path='/' element={<RootLayout />} />

        <Route path="/all" element={<ColorLayout />}>
          <Route path="getColors" element={<AllcolorSelection />} />
          <Route path="myColors" element={<MyColors />} />
          <Route path="myColors/likes" element={<LikedColors />} />
          <Route path="getColors/:orderNumber" element={<ColorDetail />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPageForm />} />
          <Route path="register" element={<UserRegisterForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEditForm />} />
        </Route>
        
      </Routes>
      </div>



    </Router>
  );
};

export default App;







