/* eslint-disable no-unused-vars */
import React from 'react'



import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase.js';
import AuthLanding from './AuthLanding.jsx';
import Playlist from './Playlist.jsx'
const Home = () => {
  const [user, loading] = useAuthState(auth);

  if(!user) {
    return (
        <AuthLanding />
    )
  }
  return (
   <div>

   </div>
  )
}

export default Home