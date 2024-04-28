// import PhonePay from "./components/PhonePay";
import React from "react";
import Status from "./components/Status";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./Root";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Verify from "./components/Verify";

export default function App(){

    let BrowserRouter = createBrowserRouter([{
        path: '',
        element: <Root />,
        children: [
          {
            path: '',
            element: <Home/>
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: "admin",
            element: <Admin />
          },
          {
            path: 'status',
            element: <Status />
          },
          {
            path:'admin/verify',
            element: <Verify />
          }
        ]
      }])
    return (
        <RouterProvider router={BrowserRouter} />
    )
}