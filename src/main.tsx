import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AuthenticationWrapper from './AuthenticationWrapper'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="*" Component={AuthenticationWrapper}/>
        </Routes>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
