/* eslint-disable no-unused-vars */


import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css'
import Navbar from './components/Navbar.jsx'

import { auth } from './utils/firebase.js';
import AuthLanding from './components/AuthLanding.jsx';
import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from './route.jsx';

function App() {



  return (
    <div className='bg-black'>


   <BrowserRouter>
       <Navbar />
       <RouterConfig />
       </BrowserRouter>
    </div>
  )
}

export default App
