import { Outlet } from "react-router-dom";
import { urlContext } from "./urlContext";
export default function Root() {
    return (
    <urlContext.Provider value="https://bug-free-acorn-445994w76pxhq99-3000.app.github.dev/">
        <Outlet />
    </urlContext.Provider>
    );
}