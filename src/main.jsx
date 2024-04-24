import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <BrowserRouter>
       <Navbar />
        <App />
       </BrowserRouter>
   
 
  </React.StrictMode>,
)
