import { Card } from "../../components/Card";

import { DocumentMeta } from "../../components/DocumentMeta/DocumentMeta";
import { useAppSelector } from "../../state/hooks";
import { getUiItems } from "../../state/selectors/healthSelectors";
import { Service } from "../../state/slices/healthSlice";

function Home() {

  const uiItems:Service[] = useAppSelector((state) => { 
    return getUiItems(state.health);
  });

  const appCards = uiItems.map( (item) => {
    return (
      <Card
        description={item.description}
        route={item.route}
        title={item.componentName}
        type={item.componentType}
        url={item.landingPageUrl}
      />
    )
  })

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
