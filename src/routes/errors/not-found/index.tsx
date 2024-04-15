import { DocumentMeta } from "../../../components/DocumentMeta/DocumentMeta"

function NotFound() {

   return (
      <>
         <DocumentMeta
            title="Not Found"
            description="Not Found"
         />
         <div className="main-view">
            <h1>Not Found</h1>
            The requested resource cannot be found
         </div>
      </>
   )
}

export default NotFound