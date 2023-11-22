import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
import Test from '../page/Test';

export default function Routes() {
  const routeElements = useRoutes(
    [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/test',
        element: <Test />
      }
    ],
    { basename: '/unko' } // Set basename here
  );

  return (
    <div>
      <header>
        {routeElements}
      </header>
    </div>
  );
}

