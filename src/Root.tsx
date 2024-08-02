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

import { getProcesses, getProcessRoute } from "./utils/processes";
import NotFound from "./routes/errors/not-found";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { useEffect, useState } from "react";
import { getHealthData } from "./state/slices/healthSlice";
import { formatRoute } from "./utils/strings";

function Root() {
  
  const dispatch = useAppDispatch();
  const processes = getProcesses();
  
  const healthState = useAppSelector((state) => {
    return state.health;
  });

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    //let isMounted = true;

    if (healthState.status === "idle") {
      // Fetch the health data
      dispatch(getHealthData());
    } else if ( healthState.status === "pending" ) {
      // Do something to inform the user that the health data is being fetched
    } else if (healthState.status === "succeeded") {
      // Do something to handle the successful fetching of data
      setLoading(false);
    } else if (healthState.status === "failed") {
      // Do something to handle the error
      console.log(healthState.error);
    }
    
    // Cleanup function
    return () => {
      //isMounted = false;
    };
    
  }, [healthState, dispatch]);

  return (
    <>
      {
        loading && <>Loading Health Data</>
      }
      { 
        !loading && 
          <div className="viewWrapper">
            <Navbar />
            <div className="view">
            <Routes>
              {
                healthState.items.map( (item, index) => {
                  return <Route key={index} path={"/applications/" + formatRoute(item.componentName)} element={<WebView url={item.landingPageUrl} />} />
                })
              }
              {/*<Route path="/applications/catalog" element={<WebView url={Config.ads.url} />} />*/}
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
      }
    </>
  )
}

export default Root;