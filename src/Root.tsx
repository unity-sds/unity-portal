import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import Home from "./routes/home";
import HealthDashboard from "./routes/health-dashboard";

import Navbar from "./components/Navbar"
import WebView from "./components/WebView";

import NotFound from "./routes/errors/not-found";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { useEffect, useState } from "react";
import { getHealthData } from "./state/slices/healthSlice";
import { formatRoute } from "./utils/strings";
import { Progress } from "@nasa-jpl/react-stellar";

function Root() {
  
  const dispatch = useAppDispatch();
  
  const healthState = useAppSelector((state) => {
    return state.health;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

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
      
      setLoading(false);

      if( import.meta.env.DEV ) {
        console.error("Health API Request Error:", healthState.error);
      }

    }

  }, [healthState, dispatch]);

  return (
    <div className="mdps-view-wrapper">
      {
        loading && <>
          <div className="mdps-view mdps-view-with-status">
            <div className="progressStatus">
              <h2>Setting up Unity UI Application</h2>
              <Progress />
            </div>
          </div>
        </>
      }
      { 
        !loading && <>
          <Navbar />
          <div className="mdps-view mdps-view-with-navbar">
          <Routes>
            {
              healthState.items.map( (item, index) => {
                return <Route key={index} path={"/applications/" + formatRoute(item.componentName)} element={<WebView url={item.landingPageUrl} />} />
              })
            }
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/health-dashboard" element={<HealthDashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </>
      }
    </div>
  )
}

export default Root;