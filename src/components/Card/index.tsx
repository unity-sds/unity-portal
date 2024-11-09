import { IconExternalLink } from "@nasa-jpl/react-stellar";
import { Pill } from "../../components/Pill";
import { formatRoute } from "../../utils/strings";

export type CardProps = {
  description:string;
  title:string;
  type:string;
  url:string;
}

export const Card = ({
  description,
  title,
  type,
  url
}:CardProps) => {
  return (
    <a href={"/applications/" + formatRoute(title)}>
      <span className="unity-card">
        <span className="header">
          <span className="title">{title}</span>
          <span className="icons">
            <a href={url} target={"_blank"}><IconExternalLink /></a>
          </span>
        </span>
        <div className="description">{description}</div>
        <div className="footer">
          <Pill label={type}/>
        </div>
      </span>
    </a>
  )
}