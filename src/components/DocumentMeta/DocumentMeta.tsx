import { Helmet } from 'react-helmet-async';
import Config from '../../Config';

export type DocumentMetaProps = {
  title: string;
  description: string;
}

export const DocumentMeta = (props:DocumentMetaProps) => {

  const {title, description} = props;
  const appTitle = Config["general"]["appTitle"];

  return (
    <Helmet>
      <title>{appTitle} | {title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );

};