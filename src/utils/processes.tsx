import NewJobChirpRebinning from "../routes/jobs/new/chirp";
import NewJobL1A from "../routes/jobs/new/l1a";
import NewJobL1B from "../routes/jobs/new/l1b";

const getProcesses = ():Process[] => {
   return (
      [
         {
            id: "chirp",
            title: "CHIRP Rebinning",
            version: "develop",
         },
         {
            id: "l1a",
            title: "l1a_pge_cwl",
            version: "develop",
         },
         {
            id: "l1b",
            title: "l1b_pge_cwl",
            version: "develop",
         },
      ]
   )
};

const getProcess = (processID:string):Process => {
   const processes:Process[] = getProcesses();
   const index = processes.findIndex( process => process.id === processID );
   return processes[index];
};


const getProcessRoute = (processID:string):JSX.Element | null => {

   const process:Process = getProcess(processID)
   const processRoutes:{ [key: string]: JSX.Element} = {
      "chirp": <NewJobChirpRebinning process={process}/>,
      "l1a": <NewJobL1A process={process}/>,
      "l1b": <NewJobL1B process={process}/>,
   }  

   return (
      (process) ? processRoutes[processID] : null
   )

};

export { getProcesses, getProcess, getProcessRoute };