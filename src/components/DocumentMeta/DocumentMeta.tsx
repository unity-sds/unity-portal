import { Helmet } from 'react-helmet-async';

export type DocumentMetaProps = {
  title: string;
  description: string;
}

export const DocumentMeta = (props:DocumentMetaProps) => {

  let {title, description} = props;

  return (
    <Helmet>
      <title>Unity | {title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );

};