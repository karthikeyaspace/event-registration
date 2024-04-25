import PhonePay from "./components/PhonePay";
import React from "react";
import Success from "./components/Success";
import Failure from "./components/Failure";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Root from "./Root";


export default function App(){

    let BrowserRouter = createBrowserRouter([{
        path: '',
        element: <Root />,
        children: [
          {
            path: 'register/payment',
            element: <PhonePay />
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