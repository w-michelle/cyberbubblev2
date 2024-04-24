/* eslint-disable no-unused-vars */


import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css'
import Navbar from './components/Navbar.jsx'
import Playlist from './components/Playlist.jsx'
import { auth } from './utils/firebase.js';
import AuthLanding from './components/AuthLanding.jsx';
import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from './route.jsx';

function App() {

  const [user, loading] = useAuthState(auth);

  if(!user) {
    return (
        <AuthLanding />
    )
  }

  return (
    <div className='bg-black'>

   <RouterConfig />

   <Playlist />
    </div>
  )
}

export default App
