import React from 'react'
import Leaderboard from './Components/Leaderboard'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Students from './Components/Students'
import AdminPage from './Components/AdminPage'
import Login from './Components/Login'
import CreateTest from './Components/CreateTest'

const App = () => {
  const router= createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/leaderboard",
      element:<Leaderboard/>
    },
    {
      path:"/students",
      element:<Students/>
    },
    {
      path:"/adminpage",
      element:<AdminPage/>
    },
    {
      path:"/createtest",
      element:<CreateTest/>
    }
  ])
  return (
    <>
    
    <RouterProvider router={router}/>
    </>
  )
}

export default App