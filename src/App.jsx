import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Leaderboard from './Components/Leaderboard';
import Students from './Components/Students';
import Upcoming from './Upcoming.jsx';
import AdminPage from './Pages/AdminPage';
import UpdateAdmin from './Pages/UpdateAdmin';
import './index.css';
import CreateTest from './Pages/CreateTest.jsx';

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
      path: "/createTest",
      element: <CreateTest />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
