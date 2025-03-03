import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Leaderboard from './Components/Leaderboard';
import Students from './Components/Students';
import Upcoming from './Upcoming.jsx';
import AdminPage from './Pages/AdminPage';
import UpdateAdmin from './Pages/UpdateAdmins.jsx';
import './index.css';
import CreateTest from './Pages/CreateTest.jsx';
import ManageAdmin from './Pages/ManageAdmin.jsx';
import CreateAdmin from './Pages/CreateAdmin.jsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/leaderboard",
      element: <Leaderboard />
    },
    {
      path: "/students",
      element: <Students />
    },
    {
      path: "/upcoming",
      element: <Upcoming /> // Fixed the incorrect JSX syntax
    },
    {
      path: "/adminpage",
      element: <AdminPage />
    },
    {
      path: "/updateadmin",
      element: <UpdateAdmin />
    },
    {
      path: "/createAdmin",
      element: <CreateAdmin />
    },
    {
      path: "/createTest",
      element: <CreateTest />
    },
    {
      path: "/ManageAdmin",
      element:<ManageAdmin/>
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
