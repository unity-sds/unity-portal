import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta"
import Config from "../../Config";

function Home() {

  const project = Config['general']['project'];
  const venue = Config['general']['venue'];

   return (
      <>
         <DocumentMeta
            title="Home"
            description="Home"
         />
         <div className="main-view">
            <h1>Home</h1>
            <div>Project: <strong>{project}</strong></div>
            <div>Venue: <strong>{venue}</strong></div>
         </div>
      </>
   )
}

export default Home