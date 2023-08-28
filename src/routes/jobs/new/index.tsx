import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@nasa-jpl/react-stellar";
import Config from "../../../Config";

import "./index.css"

const JOB_FORM_PAGE_LOAD_STATE = {
   input_processing_labels: "label1, label2",
   input_cmr_collection_name: "C2011289787-GES_DISC",
   input_cmr_search_start_time: "2016-08-22",
   input_cmr_search_stop_time: "2016-09-06",
   input_cmr_edl_user: "cmr_user",
   input_cmr_edl_pass: "cmr_pass",
   output_collection_id: "CHIRP_OUTPUT_COLLECTION",
   output_data_bucket: "s3://unity-data-bucket",
   input_daac_collection_shortname: "CHIRP_OUTPUT_COLLECTION",
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
   input_daac_collection_shortname: "CHIRP_OUTPUT_COLLECTION",
   input_daac_collection_sns: "arn:://SNS-arn"
}

function NewJob() {

   const processEndpoint = Config['sps']['endpoint'] + 'processes';
   const process:{ id:string, title:string, version:string} = {
      id: "chirp",
      title: "Chirp Rebinning Workflow",
      version: "develop"
   }
   const [form, setForm] = React.useState(JOB_FORM_PAGE_LOAD_STATE);
   const [newJobId, setNewJobId] = useState();

   const handleChange = (e:Event) => {
      setForm({
        ...form,
        [e.target.id]: e.target.value,
      });
   };

   const handleReset = (e:Event) => {
      setForm(JOB_FORM_INITIAL_STATE);
   }

   const setStopDate = (e:Event) => {

      let endDate = addDays(new Date(form.input_cmr_search_start_time), 16);
      
      let year = endDate.toLocaleString("default", { year: "numeric" });
      let month = endDate.toLocaleString("default", { month: "2-digit" });
      let day = endDate.toLocaleString("default", { day: "2-digit" });
      let formattedEndDate = year + "-" + month + "-" + day;

      setForm({
         ...form,
         ["input_cmr_search_stop_time"]: formattedEndDate
      })

   }

   const addDays = function(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }

   const handleSubmit = async (e:Event) => {

      e.preventDefault();

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

      const response = await fetch(
         processEndpoint + "/" + process.id + ":" + process.version + "/jobs",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
         }
      ).then( (response:Response) => {

         
         if( response.ok ) {
            let jobId = response.headers.get("Location")?.replace("http://127.0.0.1:5000/processes/" + process.id + ":" + process.version + "/jobs/","")
            setNewJobId(jobId);
         }

      }).catch( (errpr:Error) => {
         console.debug("Error", error.message);
      })



      handleReset(e)

   }

   return (
      <div className="mainView">
         <h1>Create New Job</h1>
         <form onSubmit={handleSubmit}>

            <h2>{process.title}</h2>
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
               type="date"
               value={form.input_cmr_search_start_time}
               onChange={handleChange}
            />

            <TextField
               id="input_cmr_search_stop_time"
               label="CMR Data Search Stop Time"
               labelPosition="top"
               placeholder=""
               type="date"
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
               <Button type="submit">Submit New Job</Button>
               <Button variant="secondary" type="reset" onClick={handleReset}>Reset</Button>
            </div>

         </form>
      </div>
   )
}

export default NewJob;