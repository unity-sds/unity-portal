import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@nasa-jpl/react-stellar";
import { DocumentMeta } from "../../../../components/DocumentMeta/DocumentMeta";
import Config from "../../../../Config";
import { BackLink } from "../../../../components/BackLink";
import { GetToken } from "../../../../AuthorizationWrapper";

const JOB_FORM_PAGE_LOAD_STATE = {
   input_collection_id: "",
   start_datetime: "",
   stop_datetime: "",
   output_collection_id: "",
}

const JOB_FORM_INITIAL_STATE = {
   input_collection_id: "",
   start_datetime: "",
   stop_datetime: "",
   output_collection_id: "",
}

type NewJobL1BProps = {
   process:Process
};

function NewJobL1B(props:NewJobL1BProps) {

   const processEndpoint = Config['sps']['endpoint'] + 'processes';
   const {process} = props;
   const [form, setForm] = useState(JOB_FORM_PAGE_LOAD_STATE);
   const [newJobId, setNewJobID] = useState<string>();
   const [submittingJob, setSubmittingJob] = useState(false);
   const tokens = GetToken();
   const meta:{ [key: string]: string} = {
      "description": "Create New " + process.title + " Job",
      "title": "Create New " + process.title + " Job",
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

   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();
      setSubmittingJob(true);

      const data =  {
         "mode": "async",
         "response": "document",
         "inputs": [
            {
               "id": "input_collection_id",
               "data": form.input_collection_id
            },
            {
               "id": "start_datetime",
               "data": form.start_datetime
            },
            {
               "id": "stop_datetime",
               "data": form.stop_datetime
            },
            {
               "id": "output_collection_id",
               "data": form.output_collection_id
            },
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
            <BackLink label="Back to application selection" path={'/jobs/new'} />
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
                  id="input_collection_id"
                  label="Collection ID"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.input_collection_id}
                  onChange={handleChange}
               />

               <TextField
                  id="start_datetime"
                  label="Start Date and Time"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.start_datetime}
                  onChange={handleChange}
               />

               <TextField
                  id="stop_datetime"
                  label="Stop Date and Time"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.stop_datetime}
                  onChange={handleChange}
               />

               <TextField
                  id="output_collection_id"
                  label="Output Unity Collection"
                  labelPosition="top"
                  placeholder=""
                  type="string"
                  value={form.output_collection_id}
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

export default NewJobL1B;