import React from 'react'
import { useRoutes } from 'react-router-dom'
import Test from '../page/Test';

export default function Routes() {
  return useRoutes ([
    {
      path: "/test", element: <Test />
    }
  ])
}
