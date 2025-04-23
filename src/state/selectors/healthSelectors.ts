import { HealthState, Service } from "../slices/healthSlice";

export const healthDataRequiresFetchOrUpdate = (state:HealthState):boolean => {
  return state.status === 'failed' || state.lastUpdated === undefined || state.lastUpdated <= (Date.now() - 60000)
};

export const getUiItems = (state:HealthState):Service[] => {
  return state.items.filter( (item) => item.componentType.toLowerCase() == "ui" )
}