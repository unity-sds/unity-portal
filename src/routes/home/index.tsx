import Config from "../../Config";
import { Card } from "../../components/Card";


import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useAppSelector } from "../../state/hooks";

function Home() {

  const project = Config['general']['project'];
  const venue = Config['general']['venue'];

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  return (
    <>
      <DocumentMeta
        title="Home"
        description="Home"
      />
      <div className="unity-main-view">
        <h1>Home</h1>
        <div>Project: <strong>{project}</strong></div>
        <div>Venue: <strong>{venue}</strong></div>

          <div className="unity-card-container">

            {
              healthState.items.map((item) => {
                return (
                  <Card
                    description={"Vivamus consequat, tellus vel faucibus dictum, ante nisi."}
                    title={item.componentName}
                    type={"web"}
                    url={item.landingPageUrl}
                  />
                )
              })
            }

          </div>

      </div>
    </>
  )
}

export default Home;
