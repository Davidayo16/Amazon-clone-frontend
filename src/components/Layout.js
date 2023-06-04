import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <>
      <Header/>
      <Sidebar/>  
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
