import { IconExternalLink } from "@nasa-jpl/react-stellar";
import { Pill } from "../../components/Pill";
import { Link } from "react-router-dom";

export type CardProps = {
  description:string;
  route:string;
  title:string;
  type:string;
  url:string;
}

export const Card = ({
  description,
  route,
  title,
  type,
  url
}:CardProps) => {

  const onClickExternalHandler = (event:React.SyntheticEvent) => {
    // Stop Propgation of event to parent card element; otherwise,
    // the user will be navigated to the parent card route
    if(event && event.stopPropagation) event.stopPropagation(); 
  }

  return (
    <Link to={route}>
      <span className="mdps-card">
        <span className="header">
          <span className="title">{title}</span>
          <span className="icons">
            <Link to={url} target={"_blank"} onClick={ (e) => {onClickExternalHandler(e)}}><IconExternalLink /></Link>
          </span>
        </span>
        <div className="description">{description}</div>
        <div className="footer">
          <Pill label={type}/>
        </div>
      </span>
    </Link>
  )
}