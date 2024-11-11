import Config from "../../Config";
import { Card } from "../../components/Card";

import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useAppSelector } from "../../state/hooks";
import { formatRoute } from "../../utils/strings";

function Home() {

  const project = Config['general']['project'];
  const venue = Config['general']['venue'];

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  let appCards = healthState.items.map( (item) => {
    return (
      <Card
        description={"Vivamus consequat, tellus vel faucibus dictum, ante nisi."}
        route={"/applications/" + formatRoute(item.componentName)}
        title={item.componentName}
        type={"web"}
        url={item.landingPageUrl}
      />
    )
  })

  appCards.push(
    <Card
      description="Check the health status of Unity Services."
      route={"/health-dashboard"}
      title="Health Dashboard"
      type={"web"}
      url={"/health-dashboard"}
    />,
    <Card
      description="Documentation to help become familiar with the Unity platform."
      route={"https://unity-sds.gitbook.io/docs"}
      title="Documentation (Gitbook)"
      type={"web"}
      url={"https://unity-sds.gitbook.io/docs"}
    />
  );

  appCards = appCards.sort( (a, b) => {
    if( a.props.title < b.props.title ) {
      return -1;
    }
    if( a.props.title > b.props.title ) {
      return 1;
    }
    return 0;
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
          {appCards}
        </div>
      </div>
    </>
  )
}

export default Home;
