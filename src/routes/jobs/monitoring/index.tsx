import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@nasa-jpl/react-stellar';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Config from '../../../Config';

import './index.css';
import { IconClose, IconTrash, IconTimeline } from '@nasa-jpl/react-stellar';

function JobMonitoring() {

   let { jobId } = useParams();

   const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
   const [selectedJob, setSelectedJob] = useState(null);

   // Each Column Definition results in one Column.
   const [columnDefs, setColumnDefs] = useState([
      {field: 'process', headerName: 'Process', filter: true},
      {field: 'jobId', headerName: 'Job ID', filter: true, cellStyle: { cursor: 'pointer', color: '#0000FF', textDecoration: 'underline' }},
      {field: 'status', headerName: 'Status', filter: true},
      {field: 'submitter', headerName: 'Submitter', filter: true},
      {field: 'startTime', headerName: 'Start Time', filter: true},
      {field: 'stopTime', headerName: 'Stop Time', filter: true},
      {field: 'duration', headerName: 'Duration', filter: true},
   ]);

   // DefaultColDef sets props common to all Columns
   const defaultColDef = useMemo( ()=> ({
      sortable: true,
   }), []);

   const closeDetailPanel = () => {
      setSelectedJob(null)
   };

    // Example of consuming Grid Event
   const cellClickedListener = useCallback( event => {
      //console.log('cellClicked', event);

      if( event.colDef.field === 'jobId') {
         //console.log('cellClicked', event);
         setSelectedJob(event.data)
      }

   }, []);

   const fetchStaticData = async () => {
      fetch('/data/jobs-data.json')
         .then(result => result.json())
         .then(rowData => setRowData(rowData))
   };

   const fetchDynamicData = async () => {
      await fetch(Config['sps']['endpoint'] + 'processes/{process}/jobs')
         .then(result => result.json())
         .then(rowData => setRowData(rowData))
   }

   // Example load data from server
   useEffect(() => {
      fetchStaticData();
      //fetchDynamicData();
   }, []);

   return (
      <>
         <PanelGroup autoSaveId="conditional" direction="horizontal">
            <Panel order={1} className='mainView'>
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
               selectedJob && (
                  <>
                     <PanelResizeHandle style={{ display: 'flex', padding: 8, placeItems: 'center'}}>||</PanelResizeHandle>
                     <Panel order={2} className='detailView'>
                        <div style={{ display: 'flex'}}>
                           <div className="st-typography-header" style={{flexGrow:1}}>
                              <b>Job Details</b>
                           </div>
                           <div>
                              <Button variant="icon" onClick={closeDetailPanel}><IconClose></IconClose></Button>
                           </div>
                        </div>
                        <div className='st-typography-displayBody'>{selectedJob.jobId}</div>
                        <br />
                        <Button variant="secondary" icon={<IconTimeline />}>Open Outputs</Button>
                        <br />
                        <Button variant="secondary" icon={<IconTrash />}>Dismiss Job</Button>
                        <br />
                        <br />
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Process</div>
                           <div className='st-typography-displayBody'>{selectedJob.process}</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Status</div>
                           <div className='st-typography-displayBody'>{selectedJob.status}</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Submitter</div>
                           <div className='st-typography-displayBody'>{selectedJob.submitter}</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Start Time</div>
                           <div className='st-typography-displayBody'>{selectedJob.startTime}</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Stop Time</div>
                           <div className='st-typography-displayBody'>{selectedJob.stopTime ? selectedJob.stopTime : '-' }</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Duration</div>
                           <div className='st-typography-displayBody'>{selectedJob.duration ? selectedJob.duration : '-'}</div>
                        </div>
                     </Panel>
                  </>
               )
            }
         </PanelGroup>
      </>
   )
}

export default JobMonitoring