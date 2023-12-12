import {
   Route,
   Routes,
} from "react-router-dom"

import Home from "./routes/home"
import JobMonitoring from "./routes/jobs/monitoring";
import NewJob from "./routes/jobs/new";
import NewJobChirpRebinning from "./routes/jobs/new/chirp-rebinning";
import NewJobL1A from "./routes/jobs/new/l1a";
import NewJobL1B from "./routes/jobs/new/l1b";
import Navbar from "./components/Navbar"
import WebView from "./components/WebView";

import Config from "./Config";

import NotFound from "./routes/errors/not-found";
function Root() {
   return (
      <div className="viewWrapper">
         <Navbar />
         <div className="view">
            <Routes>
               <Route path="/applications/catalog" element={<WebView url={Config.ads.url} />} />
               <Route path="/jobs/monitoring" element={<JobMonitoring />} />
               <Route path="/jobs/monitoring/:jobid_param" element={<JobMonitoring />} />
               <Route path="/jobs/new" element={<NewJob />} />
               <Route path="/jobs/new/chirp-rebinning" element={<NewJobChirpRebinning />} />
               <Route path="/jobs/new/l1a" element={<NewJobL1A />} />
               <Route path="/jobs/new/l1b" element={<NewJobL1B />} />
               <Route path="/" element={<Home />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   )
}

export default Root;