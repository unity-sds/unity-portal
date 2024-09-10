import {
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

function Root() {
  
  const dispatch = useAppDispatch();
  
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