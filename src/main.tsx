import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AuthorizationWrapper from './AuthorizationWrapper'
import Config from "./Config"

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={`${Config['general']['project']}/${Config['general']['venue']}/ui`}>
        <Routes>
          <Route path="*" Component={AuthorizationWrapper}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
