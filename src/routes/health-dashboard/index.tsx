import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { CellClickedEvent } from 'ag-grid-community';
import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useCallback, useMemo, useState } from "react";

interface HealthCheck {
  status:string;
  date:string
}

interface Service {
  healthChecks:HealthCheck[]
  landingPage:string;
  service:string;
}

function HealthDashboard() {

  const [rowData, setRowData] = useState<Array<Service>>([
    {
      "service": "airflow",
      "landingPage":"unity.jpl.nasa.gov/project/venue/processing/ui",
      "healthChecks": [
        {
          "status": "HEALTHY",
          "date": "2024-04-09T18:01:08Z"
        }
      ]
    },
    {
      "service": "jupyter",
      "landingPage":"unity.jpl.nasa.gov/project/venue/ads/jupyter",
      "healthChecks": [
        {
          "status": "HEALTHY",
          "date": "2024-04-09T18:01:08Z"
        }
      ]
    },
    {
      "service": "other_service",
      "landingPage":"unity.jpl.nasa.gov/project/venue/other_service",
      "healthChecks": [
        {
          "status": "UNHEALTHY",
          "date": "2024-04-09T18:01:08Z"
        }
      ]
    }
  ]); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "service", headerName: "Service", filter: true },
    {
      cellRenderer: params => {
      
        let icon;
        if( params.value.toString().toUpperCase() === "UNHEALTHY" ) {
          icon = <IconWarning className="unity-icon-warning"/>
        }

        return <React.Fragment>{params.value} {icon}</React.Fragment>

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
    //fetchData(abortController)  #todo implement data fetch
    return () => abortController.abort();
  }, []);

  return (
    <>
      <DocumentMeta title="Health Dashboard" description="Health Dashboard" />
      <div className="main-view">
        <h1>Health Dashboard</h1>
        <div className="ag-theme-stellar data-grid-container">
          <AgGridReact
            rowData={rowData} // Row Data for Rows
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
