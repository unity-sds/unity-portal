import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@nasa-jpl/react-stellar';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Config from '../../../Config';

import './index.css';
import { IconClose, IconTrash, IconTimeline } from '@nasa-jpl/react-stellar';

function JobMonitoring() {

   const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
   const [selectedJob, setSelectedJob] = useState(null);
   const process_endpoint = Config['sps']['endpoint'] + 'processes';
   const navigate = useNavigate();

   // Each Column Definition results in one Column.
   const [columnDefs, setColumnDefs] = useState([
      {field: 'process', headerName: 'Process', filter: true},
      {field: 'jobId', headerName: 'Job ID', filter: true, cellStyle: { cursor: 'pointer', color: '#0000FF', textDecoration: 'underline' }},
      {field: 'status', headerName: 'Status', filter: true},
      {field: 'submitter', headerName: 'Submitter', filter: true},
      {field: 'submit_time', headerName: 'Submit Time', filter: true},
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

      if( event.colDef.field === 'jobId') {
         setSelectedJob(event.data)
      }

   }, []);

   const fetchJobsByprocess = async (abortController:AbortController, processes:Array<any>) => {
      
      return Promise.all(
         processes.map( async (process:any) => {
            const response = await fetch(process_endpoint + '/' + process.id + "/jobs", {signal: abortController.signal})
            const jobs_response = (await response.json()).jobs;
            const jobs = [];
            jobs_response.map(job => {
               jobs.push({
                  "process": process.id,
                  "jobId": job.jobID,
                  "submitter": !!job.submitter ? job.submitter : "-",
                  "submit_time": !!job.submit_time ? job.submit_time : "-",
                  "startTime": !!job.startTime ? job.startTime : "-",
                  "stopTime": !!job.stopTime ? job.stopTime : "-",
                  "status": job.status,
                  "duration": !!job.duration ? job.duration : "-"
               });
            })
            return jobs;
         })
      )
   }

   const fetchData = async (abortController:AbortController) => {

      /**
       * Normally we would simply call SPS and ask it for a list of all jobs, but
       * at the moment we must fetch a list of processes, and then query each
       * process for their respective list of jobs and aggregate them.
       */

      const response = await fetch(process_endpoint, {signal: abortController.signal})
      const processes = await response.json();
      
      const jobAbortController = new AbortController();
      let jobsByProcess = await fetchJobsByprocess(jobAbortController, processes.processes).then((data) => {
         return data
      });
      
      let jobs = [];
      jobsByProcess.map( (jobList) => {
         jobs = jobs.concat(jobList)
      });
      setRowData(jobs);
      return () => abortController.abort();
   }

   // Example load data from server
   useEffect( () => {

      const abortController = new AbortController();

      fetchData(abortController)

      return () => abortController.abort();

   }, []);

   return (
      <>
         <PanelGroup autoSaveId="conditional" direction="horizontal">
            <Panel order={1} className='mainView'>
               <>
                  <h1>Job Monitoring</h1>
                  <Button onClick={() => navigate("/jobs/new")}>Run New Job or Batch</Button>
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
                     <PanelResizeHandle style={{ backgroundColor: "#969696", display: 'flex', padding: 3}} />
                     <Panel order={2} defaultSize={20} maxSize={40} className='detailView'>
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
                           <div className='st-typography-displayBody'>{selectedJob.submitter ? selectedJob.submitter : '-'}</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Start Time</div>
                           <div className='st-typography-displayBody'>{selectedJob.startTime ? selectedJob.startTime : '-' }</div>
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

export default JobMonitoring;