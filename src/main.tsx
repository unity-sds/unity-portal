import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AuthenticationWrapper from './AuthenticationWrapper'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="*" Component={AuthenticationWrapper}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
