import { AgGridReact, CustomCellRendererProps } from "ag-grid-react"; // the AG Grid React Component
import { CellClickedEvent } from 'ag-grid-community';
import { getHealthData } from "../../state/slices/healthSlice";
import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { IconWarning, Error } from "@nasa-jpl/react-stellar";
import React from "react";
import { Link } from "react-router-dom";

 const LinkCellRenderer = (props:CustomCellRendererProps) => {
  return <Link to={props.value} target="_blank">{props.value}</Link>
}

const StatusCellRenderer = (props:CustomCellRendererProps) => {

  if( props.value ) {
    let icon;
    if( props.value.toString().toUpperCase() === "UNHEALTHY" ) {
      icon = <IconWarning className="mdps-icon-warning"/>
    }
    if( props.value.toString().toUpperCase() === "UNAVAILABLE" ) {
      icon = <IconWarning className="mdps-icon-error"/>
    }

    return <React.Fragment>{props.value} {icon}</React.Fragment>
  }

}

function HealthDashboard() {

  const [healthApiError, setHealthApiError] = useState(false);
  const healthApiErrorMessage = "Health Endpoint is Not Available";

  const dispatch = useAppDispatch();

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "componentName", headerName: "Service", filter: true },
    {
      cellClass: 'mdps-aggrid-health-status',
      cellRenderer: StatusCellRenderer,
      field: "status", 
      filter: true,
      headerName: "Status",
      valueGetter: "data.healthChecks[0].status",
    },
    { field: "landingPageUrl", 
      cellRenderer: LinkCellRenderer,
      headerName: "Landing Page", filter: true, cellStyle: { color: '#0000FF', textDecoration: 'underline' }
    },
    { field: "healthCheckUrl", 
      cellRenderer: LinkCellRenderer,
      headerName: "Health Check Page", filter: true, cellStyle: { color: '#0000FF', textDecoration: 'underline' }
    },
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

    if( import.meta.env.DEV ) {
      // Output information to help with debugging only in DEV mode
      console.info(`The field ${event.colDef.field} containing the data, ${event.data} was clicked.`);
    }

    // Example of how to 
    /*if( event.colDef.field === 'landingPageUrl') {
      window.location.href = event.data.landingPageUrl;
    }*/

 }, []);

  const onGridReady = useCallback( () => {
    const abortController = new AbortController();

    // Fetch the health data
    if (healthState.status === "idle") {
      // Fetch the health data
      dispatch(getHealthData());
    } 
    
    return () => abortController.abort();
  }, [dispatch, healthState]);

  useEffect(() => {

    //let isMounted = true;

    if ( healthState.status === "pending" ) {
      // Do something to inform the user that the health data is being fetched
    } else if (healthState.status === "succeeded") {
      // Do something to handle the successful fetching of data
    } else if (healthState.status === "failed") {
      // Do something to handle the error
      setHealthApiError(true);
      console.log(healthState.error);
    }

    // Cleanup function
    return () => {
      //isMounted = false;
    };
  }, [healthState, dispatch]);

  return (
    <>
      <DocumentMeta title="Health Dashboard" description="Health Dashboard" />
      <div className="mdps-main-view">
        <h1>Health Dashboard</h1>
        { healthApiError && <Error><IconWarning />{healthApiErrorMessage}</Error> }
        <div className="ag-theme-stellar mdps-aggrid-container">
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
