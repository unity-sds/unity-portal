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
import { healthDataRequiresFetchOrUpdate } from "./state/selectors/healthSelectors";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { useEffect } from "react";
import { getHealthData } from "./state/slices/healthSlice";

function Root() {
  
  const dispatch = useAppDispatch();
  const processes = getProcesses();
  
  const healthState = useAppSelector((state) => {
    return state.health;
  });
  
  useEffect(() => {
    
    let isMounted = true;
    
    // Check if data manager status is 'idle', then fetch the investigations data from the API
    if (healthDataRequiresFetchOrUpdate(healthState)) {
      dispatch(getHealthData());
    }
    
    if (healthState.status === "pending") {
      // Do something to inform user that investigation data is being fetched
    } else if (healthState.status === "succeeded") {
      // Do something to handle the successful fetching of data
    } else if (healthState.error != null || healthState.error != undefined) {
      // Do something to handle the error
      console.log(healthState.error);
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
    
  }, [healthState, dispatch]);
  
  return (
    <div className="viewWrapper">
    <Navbar />
    <div className="view">
    <Routes>
      {
        healthState.items.map( (item, index) => {
          return <Route key={index} path={"/applications/" + item.service} element={<WebView url={item.landingPage} />} />
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
  )
}

export default Root;