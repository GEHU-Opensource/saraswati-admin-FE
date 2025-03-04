import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Leaderboard from './Pages/Leaderboard'
import Login from './Pages/Login'
import CreateTest from './Pages/CreateTest'
import Students from './Pages/Students'
import AdminPage from './Pages/AdminPage';
import UpdateAdmin from './Pages/UpdateAdmin';
import UpcomingTests from './Pages/UpcomingTests'
import OrgAdmin from './Pages/OrgAdmin'
import ManageAdmin from './Pages/ManageAdmin'
import CreateAdmin from './Pages/CreateAdmin'
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
      path: "/adminpage",
      element: <AdminPage /> 
    },
    {
      path: "/updateAdmin",
      element: <UpdateAdmin />
    },
    {
      path: "/upcomingtests",
      element: <UpcomingTests />
    },
    {
      path: "/orgadmin",
      element: <OrgAdmin />
    },
    {
      path:"/manageadmin",
      element:<ManageAdmin/>
    },
    {
      path: "/addadmin",
      element: <CreateAdmin/>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>

    </>
  );
};

export default App
