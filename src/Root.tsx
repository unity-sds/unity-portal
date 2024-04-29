import {
   Route,
   Routes,
} from "react-router-dom"

import Home from "./routes/home";
import HealthDashboard from "./routes/health-dashboard";
import JobMonitoring from "./routes/jobs/monitoring";
import NewJob from "./routes/jobs/new";

import Navbar from "./components/Navbar"
import WebView from "./components/WebView";

import Config from "./Config";

import { getProcesses, getProcessRoute } from "./utils/processes";
import NotFound from "./routes/errors/not-found";

function Root() {

   const processes = getProcesses();

   return (
      <div className="viewWrapper">
         <Navbar />
         <div className="view">
            <Routes>
               <Route path="/applications/catalog" element={<WebView url={Config.ads.url} />} />
               <Route path="/health-dashboard" element={<HealthDashboard />} />
               <Route path="/jobs/monitoring" element={<JobMonitoring />} />
               <Route path="/jobs/monitoring/:jobid_param" element={<JobMonitoring />} />
               <Route path="/jobs/new" element={<NewJob />} />

               {
                  /* Add routes for job execution forms */
                  processes.map( (item) => {
                     const path = "/jobs/new/" + item['id'];
                     const route:JSX.Element | null = getProcessRoute(item['id']);
                     return (
                        <Route path={path} element={ (route) ? route : <NotFound />} key={"route_" + item['id']}/>
                     )
                  })
               }

               <Route path="/" element={<Home />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   )
}

export default Root;