// import { Container, Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../pages/Body/Header'
import { Stack } from '@mui/material'

export default function ColorLayout() {
  return (
    <Stack
    sx={{ width: "100%" }}
    direction="column"
    alignItems={"center"}
  >
      <Header />
      <Outlet />
    </Stack>
  )
}