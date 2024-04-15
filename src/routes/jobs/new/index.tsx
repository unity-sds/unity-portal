import { useNavigate } from "react-router-dom";
import { Button } from "@nasa-jpl/react-stellar";
import { DocumentMeta } from "../../../components/DocumentMeta/DocumentMeta";
import { getProcesses } from "../../../utils/processes";

import "./index.css"

function NewJob() {

   const navigate = useNavigate();

   const processes = getProcesses();

   return (
      <>
         <DocumentMeta
            title="Create New Job"
            description="Create a new Job"
         />
         <div className="main-view" style={{overflow: "auto"}}>
            <h1>Create New Job</h1>
            <div className='app-list-container'>
               <ul className="app-list">
                  {
                     processes.map( (item) => {
                        const path = "/jobs/new/" + item['id'];
                        return (
                           <li key={"job_button_" + item['id']}><Button onClick={() => navigate(path)}>Run New {item['title']} Job</Button></li>
                        )
                     })
                  }
               </ul>
            </div>
         </div>
      </>
   )
}

export default NewJob;