import React from 'react'
import Leaderboard from './Components/Leaderboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import Upcoming from './Upcoming.jsx'
import Students from './Components/Students'
import AdminPage from './Pages/AdminPage';
import UpdateAdmin from './Pages/UpdateAdmin';
import './index.css';

const App = () => {
  const router= createBrowserRouter([
    {
      path:"/",
      element:<Home/>
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
      path:"/upcoming",
      element:<Upcoming>
    }
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
