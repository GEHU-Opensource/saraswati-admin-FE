import React from 'react'
import Leaderboard from './Components/Leaderboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './Components/Login'
import CreateTest from './Components/CreateTest'
import Home from './Components/Home'
import Upcoming from './Upcoming.jsx'
import Students from './Components/Students'
import AdminPage from './Pages/AdminPage';
import UpdateAdmin from './Pages/UpdateAdmin';
import './index.css';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path:"/leaderboard",
      element:<Leaderboard />
    },
    {
      path:"/students",
      element:<Students />
    },
    {
      path: "/createtest",
      element: <CreateTest />
    },
    {
      path: "/upcoming",
      element: <Upcoming />

    },
    {
      path: "/Adminpage",
      element: <AdminPage /> // Home page
    },
    {
      path: "/UpdateAdmin",
      element: <UpdateAdmin />
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>

    </>
  );
};

export default App
