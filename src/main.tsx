import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
// import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

//Routing Sauce: https://www.youtube.com/watch?v=oTIJunBa6MA
const router = createBrowserRouter([
  {
    path: '/',
    element:  <HomePage />,
    errorElement: <NotFoundPage />,
  },
  // ROUTING TEMPLATE:
  // {
  //   path: '/journal',
  //   element: <JournalPage />,
  // },
  // DONT FORGET TO IMPORT THE .tsx FILE
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //Component Tree of Project
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
)
