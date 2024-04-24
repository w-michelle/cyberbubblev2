


import { useState } from "react";
import { BiLogOut } from "react-icons/bi";


import { auth } from "../utils/firebase.js";
import About from "./About.jsx";
import Credit from "./Credit.jsx";
function Footer() {

  const [toggleCredit, setToggleCredit] = useState(false);
  const [toggleAbout, setToggleAbout] = useState(false);

  return (
    <div className="text-white w-full absolute bottom-0 flex justify-center mb-4">
      <div className="footer gap-4 text-sm py-6 px-4 w-10/12">
        <ul className="flex gap-4">
          <li>
            {toggleAbout ? <About toggle={setToggleAbout} /> : ""}
            <p className="cursor-pointer" onClick={() => setToggleAbout(true)}>
              About
            </p>
          </li>
          <li>
            {toggleCredit ? <Credit toggle={setToggleCredit} /> : ""}

            <p className="cursor-pointer" onClick={() => setToggleCredit(true)}>
              Credits
            </p>
          </li>
          <li className="ml-auto text-2xl">
            <BiLogOut
              className="cursor-pointer relative"
              onClick={() => auth.signOut()}
              aria-label="Log out"
              title="Log out"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
