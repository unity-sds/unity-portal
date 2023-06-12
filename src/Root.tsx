import {
   createBrowserRouter,
   Outlet,
   RouterProvider,
} from "react-router-dom"

import Home from "./routes/home"
import Login from "./routes/login"
import JobMonitoring from "./routes/jobs/monitoring";

import Navbar from "./components/UnityNavbar"

const router = createBrowserRouter([
   {
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/login",
            element: <Login />
         },
         {
            path: "/jobs/monitoring",
            element: <JobMonitoring />
         }
      ],
      element: <AppWrapper />,
      path: "/",
   },
]);

function AppWrapper() {

   return (
      <>
         <Navbar />
         <div className="view">
            <Outlet/>
         </div>
      </>
   )
}

function Root() {
   return (
      <RouterProvider router={router} />
   )
}

export default Root