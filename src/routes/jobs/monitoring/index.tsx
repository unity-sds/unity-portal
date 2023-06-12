import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import './index.css';

function JobMonitoring() {

   const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

   // Each Column Definition results in one Column.
   const [columnDefs, setColumnDefs] = useState([
      {field: 'process', headerName: 'Process', filter: true},
      {field: 'jobId', headerName: 'Job ID', filter: true},
      {field: 'submitter', headerName: 'Submitter', filter: true},
      {field: 'startTime', headerName: 'Start Time', filter: true},
      {field: 'stopTime', headerName: 'Stop Time', filter: true},
      {field: 'duration', headerName: 'Duration', filter: true},
      {field: 'status', headerName: 'Status', filter: true}
   ]);


   // DefaultColDef sets props common to all Columns
   const defaultColDef = useMemo( ()=> ({
      sortable: true
   }), []);

    // Example of consuming Grid Event
   const cellClickedListener = useCallback( event => {
      console.log('cellClicked', event);
   }, []);

   // Example load data from server
   useEffect(() => {
      fetch('/data/jobs-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
   }, []);

   const showJobDetailPanel = false;

   return (
      <>
         <PanelGroup autoSaveId="conditional" direction="horizontal">
            <Panel order={1}>
               <>
                  <h1>Job Monitoring</h1>
                  <div className="ag-theme-stellar data-grid-container">
                     <AgGridReact
                        rowData={rowData} // Row Data for Rows
                        columnDefs={columnDefs} // Column Defs for Columns
                        defaultColDef={defaultColDef} // Default Column Properties
                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                        rowSelection='multiple' // Options - allows click selection of rows 
                        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                     />
                  </div>
               </>
            </Panel>
            {
               showJobDetailPanel && (
                  <>
                     <PanelResizeHandle style={{ display: 'flex', padding: 8, placeItems: 'center'}}>||</PanelResizeHandle>
                     <Panel order={2}>
                        Job Detail
                     </Panel>
                  </>
               )
            }
         </PanelGroup>
      </>
   )
}

export default JobMonitoring