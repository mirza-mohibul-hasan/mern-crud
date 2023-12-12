import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddStudent from './pages/AddStudent';
import Home from './pages/Home';
import UpdateStudent from './pages/UpdateStudent';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "add",
    element: <AddStudent></AddStudent>
  },
  {
    path: "update/:_id",
    element: <UpdateStudent></UpdateStudent>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
