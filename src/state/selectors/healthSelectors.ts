import { HealthState } from "../slices/healthSlice";

export const healthDataRequiresFetchOrUpdate = (state:HealthState):boolean => {
  return state.status === 'failed' || state.lastUpdated === undefined || state.lastUpdated <= (Date.now() - 60000)
};