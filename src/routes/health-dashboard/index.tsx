import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { CellClickedEvent, ICellRendererParams } from 'ag-grid-community';
import { getHealthData } from "../../state/slices/healthSlice";
import { healthDataRequiresFetchOrUpdate } from "../../state/selectors/healthSelectors";
import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { IconWarning } from "@nasa-jpl/react-stellar";
import React from "react";

function HealthDashboard() {

  const dispatch = useAppDispatch();

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "service", headerName: "Service", filter: true },
    {
      cellClass: 'unity-aggrid-health-status',
      cellRenderer: (params:ICellRendererParams) => {

        if( params.value ) {
          let icon;
          if( params.value.toString().toUpperCase() === "UNHEALTHY" ) {
            icon = <IconWarning className="unity-icon-warning"/>
          }
          if( params.value.toString().toUpperCase() === "UNAVAILABLE" ) {
            icon = <IconWarning className="unity-icon-error"/>
          }
  
          return <React.Fragment>{params.value} {icon}</React.Fragment>
        }

      },
      field: "status", 
      filter: true,
      headerName: "Status",
      valueGetter: "data.healthChecks[0].status",
    },
    { field: "landingPage", headerName: "Landing Page", filter: true, cellStyle: { cursor: 'pointer', color: '#0000FF', textDecoration: 'underline' }},
    { field: "date", valueGetter: "data.healthChecks[0].date", headerName: "Date", filter: true },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( (event:CellClickedEvent) => {

    if( event.colDef.field === 'landingPage') {
      window.location.href = "https://" + event.data.landingPage;
    }

 }, []);

  const onGridReady = useCallback( () => {
    const abortController = new AbortController();

    // Check if data manager status is 'idle', then fetch the investigations data from the API
    if (healthDataRequiresFetchOrUpdate(healthState)) {
      dispatch(getHealthData());
    }
    
    return () => abortController.abort();
  }, [dispatch, healthState]);

  useEffect(() => {
    let isMounted = true;

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
    <>
      <DocumentMeta title="Health Dashboard" description="Health Dashboard" />
      <div className="main-view">
        <h1>Health Dashboard</h1>
        <div className="ag-theme-stellar data-grid-container">
          <AgGridReact
            rowData={healthState.items} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            paginationPageSize={20}
            pagination={true}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </>
  );
}

export default HealthDashboard;
