import { useNavigate } from "react-router-dom";
import { Button } from "@nasa-jpl/react-stellar";
import { DocumentMeta } from "../../../components/DocumentMeta/DocumentMeta";

import "./index.css"

function NewJob() {

   const navigate = useNavigate();
   
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
                  <li><Button onClick={() => navigate("/jobs/new/chirp-rebinning")}>Run New Chirp Rebinning Job</Button></li>
                  <li><Button onClick={() => navigate("/jobs/new/l1a")}>Run New L1A Job</Button></li>
                  <li><Button onClick={() => navigate("/jobs/new/l1b")}>Run New L1B Job</Button></li>
               </ul>
            </div>
         </div>
      </>
   )
}

export default NewJob;