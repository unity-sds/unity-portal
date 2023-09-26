import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from '@nasa-jpl/react-stellar';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Config from '../../../Config';
import { getTokens } from '../../../AuthenticationWrapper';

import './index.css';
import { IconClose, IconTrash, IconTimeline } from '@nasa-jpl/react-stellar';
import { CellClickedEvent } from 'ag-grid-community';

interface Job {
   process:string;
   jobID:string;
   status:string;
   submitter:string;
   submitTime:string;
   startTime:string;
   stopTime:string;
   duration:string;
   inputs:[];
}

function JobMonitoring() {

   const [rowData, setRowData] = useState<Array<Job>>(); // Set rowData to Array of Objects, one Object per Row
   const [selectedJob, setSelectedJob] = useState<Job>();
   const process_endpoint = Config['sps']['endpoint'] + 'processes';
   const navigate = useNavigate();
   const tokens = getTokens();

   const { jobid_param } = useParams();

   // Each Column Definition results in one Column.
   const [columnDefs] = useState([
      {field: 'process', headerName: 'Process', filter: true},
      {field: 'jobID', headerName: 'Job ID', filter: true, cellStyle: { cursor: 'pointer', color: '#0000FF', textDecoration: 'underline' }},
      {field: 'status', headerName: 'Status', filter: true},
      {field: 'submitter', headerName: 'Submitter', filter: true},
      {field: 'submitTime', headerName: 'Submit Time', filter: true},
      {field: 'startTime', headerName: 'Start Time', filter: true},
      {field: 'stopTime', headerName: 'Stop Time', filter: true},
      {field: 'duration', headerName: 'Duration', filter: true},
   ]);

   // DefaultColDef sets props common to all Columns
   const defaultColDef = useMemo( ()=> ({
      sortable: true,
   }), []);

   const closeDetailPanel = () => {
      setSelectedJob(undefined);
      navigate("/jobs/monitoring");
   };

   useEffect(() => {
      !jobid_param && closeDetailPanel();
   }, [jobid_param])

    // Example of consuming Grid Event
   const cellClickedListener = useCallback( (event:CellClickedEvent) => {

      if( event.colDef.field === 'jobID') {
         navigate('/jobs/monitoring/' + event.data.jobID);
         setSelectedJob(event.data)
      }

   }, []);

   const fetchJobsByprocess = async (abortController:AbortController, processes:Array<any>) => {
      
      return Promise.all(
         processes.map( async (process:any) => {
            const response = await fetch(process_endpoint + '/' + process.id + "/jobs", {
               signal: abortController.signal,
               headers: {
                  "Authorization": "Bearer " + tokens.accessToken,
                  //"Content-Type": "application/json",
                },
            })
            const jobs_response = (await response.json()).jobs;
            const jobs:Array<Job> = new Array<Job>();
            jobs_response.map( (job:Job) => {
               jobs.push({
                  "process": process.id,
                  "jobID": job.jobID,
                  "submitter": job.submitter ? job.submitter : "-",
                  "submitTime": job.submitTime ? job.submitTime : "-",
                  "startTime": job.startTime ? job.startTime : "-",
                  "stopTime": job.stopTime ? job.stopTime : "-",
                  "status": job.status,
                  "duration": job.duration ? job.duration : "-",
                  "inputs": job.inputs
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
      const response = await fetch(process_endpoint, {
         signal: abortController.signal,
         headers: {
            "Authorization": "Bearer " + tokens.accessToken,
            //"Content-Type": "application/json",
          },
      });
      const processes = await response.json();
      
      const jobAbortController = new AbortController();
      const jobsByProcess = await fetchJobsByprocess(jobAbortController, processes.processes).then((data) => {
         return data
      });
      
      let jobs:Array<Job> = [];
      jobsByProcess.map( (jobList:Array<Job>) => {
         jobs = jobs.concat(jobList)
      });

      setRowData(jobs);

      return () => abortController.abort();

   }

   useEffect( () => {
      if( jobid_param && rowData ) {
         const selectedJob = rowData.find((element) => element.jobID == jobid_param);
         setSelectedJob(selectedJob);
      }
   }, [rowData]);

   const onGridReady = useCallback( () => {
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
                  <div style={{ width: '100%', height: '100%' }}>
                     <div className="ag-theme-stellar data-grid-container">
                        <AgGridReact
                           rowData={rowData} // Row Data for Rows
                           columnDefs={columnDefs} // Column Defs for Columns
                           defaultColDef={defaultColDef} // Default Column Properties
                           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                           rowSelection='multiple' // Options - allows click selection of rows 
                           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                           paginationPageSize={20}
                           pagination={true}
                           onGridReady={onGridReady}
                        />
                     </div>
                  </div>
               </>
            </Panel>
            {
               selectedJob && (
                  <>
                     <PanelResizeHandle style={{ backgroundColor: "#969696", display: 'flex', padding: 3}} />
                     <Panel order={2} defaultSize={20} maxSize={40} className='detailView'>
                        <div style={{ display: 'flex'}}>
                           <div className="st-typography-header st-typography-bold" style={{flexGrow:1}}>Job Details</div>
                           <div>
                              <Button variant="icon" onClick={closeDetailPanel}><IconClose></IconClose></Button>
                           </div>
                        </div>
                        <div className='st-typography-displayBody'>{selectedJob.jobID}</div>
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
                           <div className='st-typography-label'>Submit Time</div>
                           <div className='st-typography-displayBody'>{selectedJob.submitTime ? selectedJob.submitTime.toString() : '-' }</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Start Time</div>
                           <div className='st-typography-displayBody'>{selectedJob.startTime ? selectedJob.startTime.toString() : '-' }</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Stop Time</div>
                           <div className='st-typography-displayBody'>{selectedJob.stopTime ? selectedJob.stopTime.toString() : '-' }</div>
                        </div>
                        <div className="job-detail-item">
                           <div className='st-typography-label'>Duration</div>
                           <div className='st-typography-displayBody'>{selectedJob.duration ? selectedJob.duration : '-'}</div>
                        </div>
                        <br />
                        <div className="st-typography-header st-typography-bold" style={{flexGrow:1}}>Input Parameters</div>
                        <br />
                        <div>
                           {
                              selectedJob.inputs.length > 0 ? selectedJob.inputs.map( (input:any, index) => {
                                 return <div className="job-detail-item" key={index + "_" + input.name}>
                                    <div className='st-typography-label'>{input.name}</div>
                                    <div className='st-typography-displayBody'>{input.value ? input.value : '-'}</div>
                                 </div>
                              })
                              :
                              <div className='st-typography-displayBody'>No Input Paramters to display</div>
                           }
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