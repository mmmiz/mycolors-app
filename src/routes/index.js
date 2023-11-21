import React from 'react'
import { useRoutes } from 'react-router-dom'
import Unko from '../page/Unko';

export default function Routes() {
  return useRoutes ([
    {
      path: "/unko", element: <Unko />
    }
  ])
}
