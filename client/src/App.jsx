import PhonePay from "./components/PhonePay";
import React from "react";
import Success from "./components/Success";
import Failure from "./components/Failure";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./Root";
import Home from "./components/Home";

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
            path: 'register/success',
            element: <Success />
          },
          {
            path: 'register/failure',
            element: <Failure />
          }
        ]
      }])
    return (
        <RouterProvider router={BrowserRouter} />
    )
}