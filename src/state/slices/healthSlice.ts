import axios, { AxiosRequestConfig } from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from "../../Config";
import { GetToken } from '../../AuthorizationWrapper';
import { formatRoute } from '../../utils/routes';

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
  componentCategory:string;
  componentType:string;
  description:string;
  healthChecks: Array<HealthCheck>;
  healthCheckUrl:string;
  landingPageUrl:string;
  nativeRoute:boolean;
  reportHealthStatus:boolean;
  route:string; // needed for portal routing
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

/**
 * Get all the instruments from the PDS OpenSearch API
 */ 
export const getHealthData = createAsyncThunk(
  HEALTH_ACTIONS.GET_HEALTH,
  async (_:void, thunkAPI) => {
    
    const url = Config['cs']['healthEndpointUrl'];
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

      const data = Config.general.defaultRoutes;

      // Add portal route for each application
      action.payload.forEach( (service:Service) => {
        service.nativeRoute = false;
        service.route = "/applications/" + formatRoute(service.componentName);
        service.reportHealthStatus = true;
        data.push(service);
      })

      // sort services alphabetically by their componentName
      data.sort( (a:Service, b:Service) => {
        
        if( a.componentName > b.componentName ) return 1;
        if( a.componentName < b.componentName ) return -1;
        
        return 0;

      });

      state.items = data;

    });
    
    builder.addCase(getHealthData.rejected, (state, action) => {
      // When data is fetched unsuccessfully
      state.status = "failed";

      state.items = Array<Service>();
      // Update the error message for proper error handling
      state.error = action.error.message;
    });
    
  }
});

export default healthSlice.reducer;