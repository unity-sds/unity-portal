import "./index.css"

type WebViewProps = {
   url:string
}

export default function WebView(props:WebViewProps) {

   const url = props.url;

   return (
      <div className='unity-webview'>
         <iframe title="Dockstore" src={{url}} />
      </div>
   )
}