import PhonePay from "./components/PhonePay";
import React from "react";
import Success from "./components/Success";
import Failure from "./components/Failure";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'


export default function App(){

    let BrowserRouter = createBrowserRouter([{
        path: '',
        element: <PhonePay />,
        children: [
        //   {
        //     path: 'register',
        //     element: <PhonePay />
        //   },
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