/* eslint-disable no-unused-vars */


import { useAuthState } from "react-firebase-hooks/auth";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { RxPerson } from "react-icons/rx";

import { useEffect } from "react";
import { auth } from "../utils/firebase";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


const AuthLanding = () => {
 
  const [user, loading] = useAuthState(auth);
const navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
     await signInWithPopup(auth, googleProvider);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const guestSignIn = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <main className="bg-black">
      {!user && (
        <div className="h-screen flex justify-center items-center">
          <div className="md:w-[500px] flex flex-col items-center w-3/4 py-6 rounded-lg shadow-custom">
            <h3 className="text-sm font-medium my-6 text-white">
              cyber bubble
            </h3>
            <div className="sm:text-sm w-3/4 text-xs">
              <button
                onClick={GoogleLogin}
                className="text-white bg-transparent border-[2px] border-grey py-2 px-4 w-full font-medium rounded-lg flex items-center gap-3 mb-8"
              >
                <FcGoogle className=" text-xl" /> Sign in with Google
              </button>
              <button
                onClick={guestSignIn}
                className="text-white bg-transparent border-[2px] border-greyBlue py-2 px-4 w-full font-medium rounded-lg flex items-center gap-3 mb-8"
              >
                <RxPerson className="text-xl" /> Sign in Anonymously
              </button>
            </div>
          </div>
        </div>
      )}


    </main>
  );
};

export default AuthLanding;
