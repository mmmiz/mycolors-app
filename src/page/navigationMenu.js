import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/Test">Test</Link>
      </li>
    </ul>
  );
};

export default NavigationMenu;
