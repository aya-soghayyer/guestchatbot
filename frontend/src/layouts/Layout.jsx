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
      <div className="z-30 flex flex-col  bg-light-green font-Outfit">
        {/* <div className="z-50"> */}
        {navbars[location.pathname]}
        {/* </div> */}
        <div className="flex-1">
          <Outlet className="z-40" />
        </div>
        <div className="bg-BgFooter text-white">
          {footer[location.pathname]}
        </div>
      </div>
    </>
  )
}

export default Layout
