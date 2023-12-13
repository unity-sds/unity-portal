import { Link } from "react-router-dom";
import ChevronLeft from "@nasa-jpl/stellar/icons/chevron_left.svg";

type BackLinkProps = {
   label:string;
   path:string;
};

export const BackLink = (props:BackLinkProps) => {

   const {label, path} = props;

   return(
      <>
         <Link to={path}><img src={ChevronLeft} alt={label} style={{ height: '12px', width: '12px' }}/>{label}</Link>
      </>
   )
}