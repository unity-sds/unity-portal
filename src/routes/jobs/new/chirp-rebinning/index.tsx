import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@nasa-jpl/react-stellar";
import { DocumentMeta } from "../../../../components/DocumentMeta/DocumentMeta";
import Config from "../../../../Config";
import { getTokens } from "../../../../AuthenticationWrapper";

import "./index.css"

/*const JOB_FORM_PAGE_LOAD_STATE = {
   input_processing_labels: "label1, label2",
   input_cmr_collection_name: "C2011289787-GES_DISC",
   input_cmr_search_start_time: "2016-08-22T00:10:00Z",
   input_cmr_search_stop_time: "2016-08-22T01:10:00Z",
   input_cmr_edl_user: "cmr_user",
   input_cmr_edl_pass: "cmr_pass",
   output_collection_id: "urn:nasa:unity:uds_local_test:DEV1:CHRP_16_DAY_REBIN___1",
   output_data_bucket: "uds-test-cumulus-sps",
   input_daac_collection_shortname: "CHIRP_L1B",
   input_daac_collection_sns: "arn:://SNS-arn"
}*/

const JOB_FORM_PAGE_LOAD_STATE = {
   input_processing_labels: "",
   input_cmr_collection_name: "",
   input_cmr_search_start_time: "",
   input_cmr_search_stop_time: "",
   input_cmr_edl_user: "cmr_user",
   input_cmr_edl_pass: "cmr_pass",
   output_collection_id: "",
   output_data_bucket: "",
   input_daac_collection_shortname: "CHIRP_L1B",
   input_daac_collection_sns: "arn:://SNS-arn"
}

const JOB_FORM_INITIAL_STATE = {
   input_processing_labels: "",
   input_cmr_collection_name: "",
   input_cmr_search_start_time: "",
   input_cmr_search_stop_time: "",
   input_cmr_edl_user: "cmr_user",
   input_cmr_edl_pass: "cmr_pass",
   output_collection_id: "",
   output_data_bucket: "",
   input_daac_collection_shortname: "CHIRP_L1B",
   input_daac_collection_sns: "arn:://SNS-arn"
}

function NewJobChirpRebinning() {

   const processEndpoint = Config['sps']['endpoint'] + 'processes';
   const process:{ id:string, title:string, version:string} = {
      id: "chirp",
      title: "Chirp Rebinning Workflow",
      version: "develop"
   }
   const [form, setForm] = useState(JOB_FORM_PAGE_LOAD_STATE);
   const [newJobId, setNewJobID] = useState<string>();
   const [submittingJob, setSubmittingJob] = useState(false);
   const tokens = getTokens();
   const meta:{ [key: string]: string} = {
      "description": "Create New Chirp Rebinning Job",
      "title": "Create New Chirp Rebinning Job",
   }

   const handleChange = (e:Event & { target: HTMLInputElement}) => {
      setForm({
        ...form,
        [e.target.id]: e.target.value,
      });
   };

   const handleReset = () => {
      setForm(JOB_FORM_INITIAL_STATE);
   }

   const setStopDate = () => {

      const endDate = addDays(new Date(form.input_cmr_search_start_time), 16);
      
      const year = endDate.toLocaleString("default", { year: "numeric" });
      const month = endDate.toLocaleString("default", { month: "2-digit" });
      const day = endDate.toLocaleString("default", { day: "2-digit" });
      const formattedEndDate = year + "-" + month + "-" + day;

      setForm({
         ...form,
         ["input_cmr_search_stop_time"]: formattedEndDate
      })

   }

   const addDays = function(date:Date, days:number) {
      date.setDate(date.getDate() + days);
      return date;
    }

   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();
      setSubmittingJob(true);

      const data =  {
         "mode": "async",
         "response": "document",
         "inputs": [
            {
               "id": "input_processing_labels",
               "data": form.input_processing_labels.split(",")
            },
            {
               "id": "input_cmr_collection_name",
               "data": form.input_cmr_collection_name
            },
            {
               "id": "input_cmr_search_start_time",
               "data": form.input_cmr_search_start_time
            },
            {
               "id": "input_cmr_search_stop_time",
               "data": form.input_cmr_search_stop_time
            },
            {
               "id": "input_cmr_edl_user",
               "data": form.input_cmr_edl_user
            },
            {
               "id": "input_cmr_edl_pass",
               "data": form.input_cmr_edl_pass
            },
            {
               "id": "output_collection_id",
               "data": form.output_collection_id
            },
            {
               "id": "output_data_bucket",
               "data": form.output_data_bucket
            },
            {
               "id": "input_daac_collection_shortname",
               "data": form.input_daac_collection_shortname
           },
           {
               "id": "input_daac_collection_sns",
               "data": form.input_daac_collection_sns
           }
         ],
         "outputs": [
            {
               "id": "output",
               "transmissionMode": "reference"
            }
         ]
      }

      await fetch(
         processEndpoint + "/" + process.id + ":" + process.version + "/jobs",
         {
            method: "POST",
            headers: {
               "Authorization": "Bearer " + tokens.accessToken,
               "Content-Type": "application/json",
             },
            body: JSON.stringify(data)
         }
      ).then( (response:Response) => {

         
         if( response.ok ) {
            const jobID:string | undefined = response.headers.get("Location")?.replace("http://127.0.0.1:5000/processes/" + process.id.toString() + ":" + process.version.toString() + "/jobs/","")
            setNewJobID(jobID);
            setSubmittingJob(false);
         }

      }).catch( (error:Error) => {
         console.debug("Error", error.message);
         setSubmittingJob(false);
      })

      handleReset()

   }

   return (
      <>
         <DocumentMeta
            title={meta["title"]}
            description={meta["description"]}
         />
         <div className="main-view" style={{overflow: "auto"}}>
            <h1>{meta["title"]}</h1>
            <Link to="/jobs/new">Back to application selection</Link>
            <form className="job-form" onSubmit={handleSubmit}>
               <h2>Job Parameters</h2>
               { newJobId && 
                  <>
                     <div>Your job request was submitted successfully!</div>
                     <div>Your Job ID is <Link to={`/jobs/monitoring/${newJobId}`}>{newJobId}</Link></div>
                     <br />
                  </> 
               }
               <TextField
                  id="input_processing_labels"
                  label="Execution Labels"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  helperText="Comma delimited set of labels"
                  value={form.input_processing_labels}
                  onChange={handleChange}
               />

               <TextField
                  id="input_cmr_collection_name"
                  label="CMR Collection Concept ID"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.input_cmr_collection_name}
                  onChange={handleChange}
               />

               <TextField
                  id="input_cmr_search_start_time"
                  label="CMR Data Search Start Time"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.input_cmr_search_start_time}
                  onChange={handleChange}
               />

               <TextField
                  id="input_cmr_search_stop_time"
                  label="CMR Data Search Stop Time"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.input_cmr_search_stop_time}
                  onChange={handleChange}
               />
               <Button variant="secondary" onClick={setStopDate}>Set to Start + 16 days</Button>
               <br /><br />

               <TextField
                  id="output_collection_id"
                  label="Output Unity Collection"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.output_collection_id}
                  onChange={handleChange}
               />

               <TextField
                  id="output_data_bucket"
                  label="Output Data"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.output_data_bucket}
                  onChange={handleChange}
               />

               <div style={{display: "flex", gap: "8px"}}>
                  <Button type="submit" disabled={submittingJob}>Submit New Job</Button>
                  <Button variant="secondary" type="reset" onClick={handleReset}>Reset</Button>
               </div>

            </form>
         </div>
      </>
   )
}

export default NewJobChirpRebinning;