/* eslint-disable no-unused-vars */


import { useEffect, useRef, useState } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { atcList } from "../data/atc";


function Airplane() {
  const [toggle, setToggle] = useState(false);
  const [city, setCity] = useState("");
  // const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pathname, setPathname] = useState();

  let sound = useRef();

  let cities = [
    "Los Angeles",
    "New York",
    "Tokyo",
    "Toronto",
    "Taipei",
    "Hong Kong",
    "Singapore",
    "Melbourne",
    "Zurich",
  ];
  let sortedCities = cities.sort();

  useEffect(() => {
    togglePlayPause();
    if (!sound.current) {
     sound.current = new Audio("https://s1-fmt2.liveatc.net/kjfk9_s");
      setPathname(window.location.pathname);
    }

    return () => (sound.current ? sound.current.pause() : "");
  }, [city, toggle, pathname]);

//on/off
  const toggleBtn = () => {
    setToggle(!toggle);
  };

  const handleChange = (value) => {
    setCity(value);
    let soundUrl = atcList.find((item) => item.city === value).url;
    sound.current.src = soundUrl;
  };
  const togglePlayPause = () => {
    if (city.length === 0) return;

    if (city.length !== 0 && toggle) {
      sound.current.play();
      setIsPlaying(true);
    } else if (city.length !== 0 && !toggle) {
      sound.current.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (e) => {
    return (sound.current.volume = e.target.value / 100);
  };

 


  return (
    <div className="w-4/5 mx-auto">
      <div className=" my-4 flex items-center">
        <MdOutlineTipsAndUpdates className="tips text-white/10 hover:text-white hover:cursor-pointer text-[22px]" />
        <p className="tipstext ml-2 text-sm opacity-0 text-white/50">
          Turn on -&gt; choose an airport -&gt; wait a moment, there may be a
          time delay.
        </p>
      </div>

      <div className="flex flex-col items-center text-white p-8 relative">
        <div className="mx-auto flex items-center mt-4 mb-10">
          <div className="relative block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white  appearance-none cursor-pointer"
              onClick={() => toggleBtn()}
              aria-label="Toggle on/off button"
              title="Toggle atc on/off"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-5 rounded-full bg-darkgrey cursor-pointer"
            ></label>
          </div>
          <p className={`text-sm ${toggle ? "text-white" : "text-lightgrey"}`}>
            {toggle ? "on" : "off"}
          </p>
        </div>
        <label htmlFor="airport-select" className="text-sm text-center">
          Live ATC <br></br>
          choose an airport
        </label>

        <select
          onChange={(e) => handleChange(e.target.value)}
          className={`form-select md:w-1/5 w-1/2 focus:ring-0 focus:border-darkgrey focus:within:hidden ${
            !toggle ? "cursor-not-allowed" : ""
          } relative text-sm border-2 border-darkgrey py-2 px-4 bg-black mt-4 mb-4 outline-none`}
          disabled={toggle ? "" : "disabled"}
        >
          <option>-</option>
          {sortedCities.map((item, index) => (
            <option key={index} value={item} disabled={toggle ? false : true}>
              {item}
            </option>
          ))}
        </select>

        <div
          className="text-center w-full absolute bottom-0 flex justify-center"
          aria-label="Music sound wave animation"
          title="Sound wave"
        >
          <div className="relative left-[-11px]">
            {
              Array.from({length: 6}, (_, index) => (
                <div
                key={index}
                id={`bar-${index + 1}`}
                className={`sbar ${!isPlaying ? "noanim" : ""}`}
              ></div>
              ))
            }
         
          </div>
        </div>
      </div>
      <div className="w-full mt-10 text-center">
        <input
          className="md:w-1/5 w-1/2 appearance-none h-0.5 outline-none opacity-70 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-lg [&::-webkit-slider-thumb]:cursor-pointer"
          type="range"
          min="1"
          max="100"
          step="1"
          defaultValue={50}
          onChange={changeVolume}
        />
      </div>
    </div>
  );
}

export default Airplane;
