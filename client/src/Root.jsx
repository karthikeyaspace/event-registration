import PhonePay from "./components/PhonePay";
import Failure from "./components/Failure";
import Success from "./components/Success";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
    
        <Outlet />
    );
}