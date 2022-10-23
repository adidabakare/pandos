import React, { useState, useEffect } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import Audio from "../assets/audio/audio.mp3";
import AlbumCover2 from "../assets/img/albumC.jpeg";

import {
  Bookmark,
  Forward,
  Mute,
  Pause,
  Pin,
  Play,
  Rewind,
  Upload,
  Volume,
} from "../Icons";

import useAudio from "../hooks/useAudio";
import { convertSecondsToHHMMSS } from "../lib/utilities";
import {
  HeartIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
const SliderWithTooltip = createSliderWithTooltip(Slider);

export default function Player() {
  const [index, setindex] = useState(0);
  const url_ = localStorage.getItem("musicurl");
  const audios = JSON.parse(localStorage.getItem("musicurl"));
  const artistName = localStorage.getItem("artistName");
  const musicCover = localStorage.getItem("musicCover");
  const musicTitle = localStorage.getItem("musicTitle");
  const [vol, setVol] = useState(50);
  console.log("index before url", index);
  console.log("index before url --==--", audios[index][1]);
  console.log("index length url --==--", audios.length);
  const [url, setUrl] = useState(audios[index][1]);
  const [
    audio,
    playing,
    muted,
    toggle,
    muteToggle,
    currentTime,
    duration,
    play,
    pause,
  ] = useAudio(Audio, vol);
  const [marks, setMarks] = useState({});
  const [step, setStep] = useState(10);
  const handleRate = (e) => (audio.playbackRate = parseFloat(e.target.value));
  const handleStep = (e) => setStep(parseInt(e.target.value));
  const handleBookmark = () => {
    setMarks({
      ...marks,
      [audio.currentTime]: {
        label: <Pin />,
      },
    });
  };
  const handleUpload = async (e) => {
    let file = e.target.files[0];

    /** Method 1: Through Base64 */
    // const fileBase64 = await convertFileToBase64(file);
    // setUrl(fileBase64);

    /** Method 2: Through Blob */
    const fileURL = URL.createObjectURL(file);
    setUrl(fileURL);
  };

  // console.log(audios[index][0]?.type?.toString());
  // console.log(audios);
  const next = () => {
    console.log(audios[index][1]);
    localStorage.setItem("isOpen", true);
    localStorage.setItem("musicOpenId", audios[index][1]);
    localStorage.setItem("artistName", audios[index][3][1]);
    localStorage.setItem("musicCover", audios[index][3][4]);
    localStorage.setItem("musicTitle", audios[index][5]);
    window.dispatchEvent(new Event("storage"));
    setindex((prev) => prev + 1);
    setUrl(audios[index][1]);

    if (index >= audios.length - 1) {
      setindex(0);
      return;
    }
    play();
  };

  const prev = () => {
    localStorage.setItem("isOpen", true);
    localStorage.setItem("musicOpenId", audios[index][1]);
    localStorage.setItem("artistName", audios[index][3][1]);
    localStorage.setItem("musicCover", audios[index][3][4]);
    localStorage.setItem("musicTitle", audios[index][5]);
    window.dispatchEvent(new Event("storage"));
    setUrl(audios[index][1]);

    if (index <= 0) {
      setindex(audios.length - 1);
      return;
    }
    setindex((prev) => prev - 1);
    play();
  };
  useEffect(() => {
    audio.src = url;
    return () => (audio.src = "");
  }, [audio, url, index]);

  return (
    <div className="flex relative flex-col mx-auto w-full shadow hover:shadow-xl transition duration-300 lg:rounded-b-xl">
      <div className="flex flex-row py-4 px-2 w-full ring-2 ring-white ring-opacity-20   bg-black   bg-opacity-5 backdrop-blur-xl ">
        <div className="w-full flex flex-col mx-auto md:flex-row">
          <div className="image hidden md:flex ml-16 col-span-4 w-2/12  flex-row space-x-3">
            <img
              src={musicCover}
              className="object-cover rounded-2xl h-16 w-16"
            />{" "}
            <div>
              <p className="text-lg font-Montserrat">{artistName}</p>
              <p className="text-lg font-Montserrat">{musicTitle}</p>
            </div>
          </div>
          <div className="controls w-full md:flex md:w-11/12 flex-col col-span-11">
            <div className="top-control items-center flex flex-row justify-evenly">
              <div className="top-control-2 flex items-center flex-row space-x-16">
                <span>
                  <ion-icon name="repeat-outline" class="text-2xl"></ion-icon>
                </span>
                <span
                  onClick={() => {
                    prev();
                  }}
                >
                  <ion-icon
                    name="play-back-outline"
                    class="text-2xl"
                  ></ion-icon>
                </span>
                <span
                  onClick={toggle}
                  // className=" bg-[#06bc60] p-2 rounded-full"
                >
                  {playing ? (
                    <PauseCircleIcon className="h-16" />
                  ) : (
                    <PlayCircleIcon className="h-16" />
                  )}
                </span>
                <span
                  onClick={() => {
                    next();
                  }}
                >
                  <ion-icon
                    name="play-forward-outline"
                    class="text-2xl"
                  ></ion-icon>
                </span>
                <span>
                  <ion-icon name="shuffle-outline" class="text-2xl"></ion-icon>
                </span>
              </div>
              <div className="hidden md:block top-control-3">
                <div className="flex flex-row items-center space-x-2">
                  <button
                    id="vol_btn"
                    type="button"
                    className="ml-auto mr-1"
                    onClick={muteToggle}
                  >
                    {muted ? (
                      <span title="Unmute">
                        <SpeakerXMarkIcon className="h-8" />
                      </span>
                    ) : (
                      <span title="Mute">
                        <SpeakerWaveIcon className="h-8" />
                      </span>
                    )}
                  </button>
                  <div
                    className="inline-block relative w-16 mx-auto"
                    title="Play Rate"
                  >
                    <select
                      defaultValue="1.0"
                      onChange={handleRate}
                      className="block cursor-pointer appearance-none w-full text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-gray-100 hover:border-blue-400 focus:border-blue-400 pl-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1.0">1.0x</option>
                      <option value="1.5">1.5x</option>
                      <option value="1.75">1.75x</option>
                      <option value="2.0">2.0x</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-3 w-3 text-gray-900 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <div id="volume-slider" className="w-36">
                    {!muted ? (
                      <SliderWithTooltip
                        value={vol || 50}
                        tipFormatter={(val) => `${val}%`}
                        min={0}
                        max={100}
                        onChange={(val) => setVol(val)}
                      />
                    ) : (
                      <Slider value={vol} min={0} max={100} disabled />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block bottom-control mt-2">
              <div className="space-y-2 w-10/12 flex flex-row">
                <SliderWithTooltip
                  value={audio.currentTime}
                  marks={marks}
                  tipFormatter={(val) => `${convertSecondsToHHMMSS(val)}`}
                  min={0}
                  max={audio.duration}
                  onChange={(val) => (audio.currentTime = val)}
                />
              </div>
              <div className="text-gray-900 w-10/12 dark:text-gray-300 flex justify-between text-sm font-medium tabular-nums">
                {currentTime ? <div>{currentTime}</div> : <div>00:00</div>}
                {duration ? <div>{duration}</div> : <div>00:00</div>}
              </div>
            </div>
          </div>
        </div>
        <span>
          <XMarkIcon
            className="h-7 m-3"
            onClick={() => {
              localStorage.setItem("isOpen", false);
              localStorage.setItem("musicOpenId", "");
              localStorage.setItem("musicurl", "");

              window.dispatchEvent(new Event("storage"));
            }}
          />
        </span>
      </div>
    </div>
  );
}
