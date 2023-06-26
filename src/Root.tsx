import {
   Route,
   Routes,
} from "react-router-dom"

import Home from "./routes/home"
import JobMonitoring from "./routes/jobs/monitoring";

import Navbar from "./components/UnityNavbar"

function Root() {
   return (
      <>
         <Navbar />
         <div className="view">
            <Routes>
               <Route path="/jobs/monitoring" element={<JobMonitoring />} />
               <Route path="*" element={<Home />} />
            </Routes>
         </div>
      </>
   )
}

export default Root;