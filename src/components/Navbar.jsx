/* eslint-disable no-unused-vars */
import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsAirplane, BsChatSquareDots } from 'react-icons/bs'
import { TbPencilMinus } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Navbar = () => {
  
  const [user, loading] = useAuthState(auth);
  if(!user) {
    return null
  }
  return (
   <>
     
        <div className="md:flex-row md:gap-0 md:justify-between md:px-6 mt-4 flex flex-col gap-4 items-center mx-auto py-6 bg-darkgrey rounded-lg w-10/12">
          <div className="username">
            <h1 className="text-sm font-weight text-white">
              {user.isAnonymous ? "anonymous" : user.displayName}
           
            </h1>
          </div>
          <div className="md:gap-6 navbar flex gap-4 text-white">
            <Link to="/">
              <AiOutlineHome
                className="hover:text-greyBlue"
                aria-label="Home"
                title="Home"
              />
            </Link>
            <Link to="/productive">
              <TbPencilMinus
                className="hover:text-greyBlue"
                aria-label="Productive"
                title="Productive Space"
              />
            </Link>
            <Link to="/log">
              <BsChatSquareDots
                className="hover:text-greyBlue"
                aria-label="Log"
                title="Log"
              />
            </Link>
            <Link to="/airplane">
              <BsAirplane
                className="hover:text-greyBlue"
                aria-label="Live Air Traffic Control"
                title="Live Air Traffic Control"
              />
            </Link>
          </div>
        </div>
  
   </>
  )
}

export default Navbar