// import React from 'react'
// import Footer from '../Compononts/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import GuestNav from '../components/navbars/GuestNav'
// import AdminNavbar from '../Compononts/Navbar/AdminNavbar'
// import UserChatMobileNavbar from '../Compononts/Navbar/UserChatMobileNavbar'

function Layout() {
  const location = useLocation()
  const navbars = {
    '/': <GuestNav />,
  }

  const footer = {
    '/': <></>,
    // '/guestchat': <></>,
    // '/userchat': <></>,
    // '/admin': <></>,
    // '/admin/courses': <></>,
    // '/admin/students': <></>,
    // '/admin/services': <></>,
    // '/admin/addcourse': <></>,
  }
  return (
    <>
      <div className="flex flex-col h-screen  bg-gradient-to-r from-light-green via-mid-green to-dark-greenn font-Outfit">
        {/* <div className="z-50"> */}
        {navbars[location.pathname]}
        {/* </div> */}
        <div className="flex-1">
          <Outlet className="" />
        </div>
        <div className="bg-BgFooter text-white">
          {footer[location.pathname]}
        </div>
      </div>
    </>
  )
}

export default Layout
