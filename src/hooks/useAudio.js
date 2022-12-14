import { useState, useEffect } from "react";
import { convertSecondsToHHMMSS } from "../lib/utilities";
const useAudio = (url, vol) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [duration, setDuration] = useState("");

  const toggle = () => setPlaying(!playing);
  const muteToggle = () => setMuted(!muted);
  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);
  useEffect(() => {
    const favicon = document.querySelector("#favicon");
    const logo = document.querySelector("#logo");
    if (playing) {
      audio.play();
      // favicon.setAttribute("href", "./play.png");
      // logo.classList.add("animate-ping");
    } else {
      audio.pause();
      // favicon.setAttribute("href", "./pause.png");
      // logo.classList.remove("animate-ping");
    }
    muted && vol > 0 ? (audio.muted = true) : (audio.muted = false);
    audio.volume = vol / 100;
  }, [audio, playing, muted, vol]);

  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setDuration(convertSecondsToHHMMSS(audio.duration));
      setPlaying(false);
    });
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(convertSecondsToHHMMSS(audio.currentTime))
    );

    return () => {
      audio.removeEventListener("loadedmetadata", () => setDuration(""));
      audio.removeEventListener("timeupdate", () => setCurrentTime(""));
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio, currentTime, duration]);

  return [
    audio,
    playing,
    muted,
    toggle,
    muteToggle,
    currentTime,
    duration,
    play,
    pause,
  ];
};

export default useAudio;
