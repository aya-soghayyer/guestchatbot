// import { useState } from 'react'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GuestChat from './views/GuestChat.jsx'
// import NotFound from './views/NotFound'
import { useState } from 'react'
import Layout from './layouts/Layout.jsx'

export let domainName = 'http://localhost:8000/'
// 18.208.251.97
function App() {
  const [chatId, setChatId] = useState('newchat')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      // errorElement: <NotFound />, // way for showing error when user write a path outside of the project rand of paths , example: localhost.../register
      children: [
        {
          path: '/',
          element: <GuestChat />,
        },
        // {
        //   path: '*', //another way for the error
        //   element: <NotFound />,
        // },
      ],
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
