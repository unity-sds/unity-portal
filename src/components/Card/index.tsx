import { IconExternalLink } from "@nasa-jpl/react-stellar";
import { Pill } from "../../components/Pill";

export type CardProps = {
  description:string;
  route:string;
  title:string;
  type:string;
  url?:string;
}

export const Card = ({
  description,
  route,
  title,
  type,
  url
}:CardProps) => {
  return (
    <a href={route}>
      <span className="unity-card">
        <span className="header">
          <span className="title">{title}</span>
          { url && <span className="icons">
            <a href={url} target={"_blank"}><IconExternalLink /></a>
          </span>
          }
        </span>
        <div className="description">{description}</div>
        <div className="footer">
          <Pill label={type}/>
        </div>
      </span>
    </a>
  )
}