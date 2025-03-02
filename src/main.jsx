import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import AdminPage from './Pages/AdminPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminPage/>
  </BrowserRouter>
);
