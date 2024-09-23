import axios, { AxiosRequestConfig } from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from "../../Config";
import { GetToken } from '../../AuthorizationWrapper';

enum HEALTH_ACTIONS {
  GET_HEALTH = "health/getHealth",
}

type HealthCheck = {
  status:string;
  httpResponseCode:string;
  date:string | number;
}

export type Service = {
  componentName:string;
  healthCheckUrl:string;
  landingPageUrl:string;
  healthChecks: Array<HealthCheck>;
  ssmKey:string;
};

export type HealthState = {
  error: string | null | undefined
  items: Service[]
  lastUpdated: number | undefined,
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
};

const initialState:HealthState = {
  error: null,
  items: [],
  lastUpdated: undefined,
  status: 'idle',
};

const getItems = () => {

  // Get additional links that should be added for the given project and venue

  const project = Config['general']['project'];
  const venue = Config['general']['venue'];

  let serviceItems:Service[] = Array<Service>();

  if( project.toUpperCase() === 'EMIT' && venue.toUpperCase() === 'DEV' ) {

    serviceItems = [
      {
        componentName: "Jupyterhub",
        ssmKey: "",
        healthCheckUrl: "",
        landingPageUrl: "https://www.mdps.mcp.nasa.gov:4443/emit/dev/jupyter/",
        healthChecks: [
          {
            status: "UNKNOWN",
            httpResponseCode: "",
            date: ""
          }
        ]
      },
      {
        componentName: "Airflow",
        ssmKey: "",
        healthCheckUrl: "",
        landingPageUrl: "http://k8s-sps-airflowi-3b3c3cafcc-31473296.us-west-2.elb.amazonaws.com:5000/home",
        healthChecks: [
          {
            status: "UNKNOWN",
            httpResponseCode: "",
            date: ""
          }
        ]
      },
      {
        componentName: "Airflow-ogc",
        ssmKey: "",
        healthCheckUrl: "",
        landingPageUrl: "http://k8s-sps-ogcproce-927cdf8d63-717063809.us-west-2.elb.amazonaws.com:5001/",
        healthChecks: [
          {
            status: "UNKNOWN",
            httpResponseCode: "",
            date: ""
          }
        ]
      },
    ];
  }

  return serviceItems;

}

/**
 * Get all the instruments from the PDS OpenSearch API
 */ 
export const getHealthData = createAsyncThunk(
  HEALTH_ACTIONS.GET_HEALTH,
  async (_:void, thunkAPI) => {
    
    const url = Config['cs']['health_endpoint'];
    const token = GetToken();
    
    const config:AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    
    try {
      const response = await axios.get(url, config);
      return response.data.services;
    } catch (err:any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
    
  }
);

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getHealthData.pending, (state, _action) => {
      // When data is being fetched
      state.status = "pending";
    });
    
    builder.addCase(getHealthData.fulfilled, (state, action) => {
      // When data is fetched successfully
      state.status = "succeeded";
      state.lastUpdated = Date.now();

      // Parse and store the fetched data into the state
      const data = action.payload;
      state.items = data.concat(getItems());

    });
    
    builder.addCase(getHealthData.rejected, (state, action) => {
      // When data is fetched unsuccessfully
      state.status = "failed";

      state.items = getItems();
      // Update the error message for proper error handling
      state.error = action.error.message;
    });
    
  }
});

export default healthSlice.reducer;