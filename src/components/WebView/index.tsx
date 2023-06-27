import "./index.css"

export default function WebView(props) {

   const url = props.url;

   return (
      <>
         <iframe src={url} className='unity-webview' />
      </>
   )
}