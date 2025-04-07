import { Card } from "../../components/Card";

import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useAppSelector } from "../../state/hooks";
import { getUiItems } from "../../state/selectors/healthSelectors";
import { Service } from "../../state/slices/healthSlice";
import { formatRoute } from "../../utils/strings";

function Home() {

  const uiItems:Service[] = useAppSelector((state) => { 
    return getUiItems(state.health);
  });

  let appCards = uiItems.map( (item) => {
    return (
      <Card
        description={item.description}
        route={"/applications/" + formatRoute(item.componentName)}
        title={item.componentName}
        type={item.componentType}
        url={item.landingPageUrl}
      />
    )
  })

  appCards.push(
    <Card
      description={`Check the health status of services running in this venue.`}
      route={"/health-dashboard"}
      title="Health Dashboard"
      type={"ui"}
      url={"/health-dashboard"}
    />,
    <Card
      description="Documentation to help become familiar with the Unity platform."
      route={"https://unity-sds.gitbook.io/docs"}
      title="Documentation (Gitbook)"
      type={"ui"}
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
      <div className="mdps-main-view">
        <h1>Home</h1>
        <div className="mdps-card-container">
          {appCards}
        </div>
      </div>
    </>
  )
}

export default Home;
