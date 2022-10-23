// import { formatMinutes, formatSeconds } from "../../utils/format-time";
import {
  MicrophoneIcon,
  PauseCircleIcon,
  PauseIcon,
  PlayCircleIcon,
  ServerIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatMinutes, formatSeconds } from "../../lib/utilities";
import { resumeRecording } from "../handlers/recorder-controls";
export default function RecorderControls({ recorderState, handlers }) {
  const { recordingMinutes, recordingSeconds, initRecording, isPause } =
    recorderState;
  const {
    startRecording,
    saveRecording,
    cancelRecording,
    pauseRecording,
    resumeRecording,
  } = handlers;
  return (
    <div className="bg-gray-900 flex my-2 flex-col items-center justify-center mt-4 relative rounded-2xl w-full p-6  bg-opacity-10 ring-1 ring-white ring-opacity-20 backdrop-blur-lg ">
      {initRecording && (
        <>
          {isPause == true ? (
            <div className="w-28 cursor-pointer h-28 mt-4 ring-2 ring-red-500 flex flex-row items-center justify-center  rounded-full">
              <div className="w-24 h-24 bg-red-500 text-center flex flex-row items-center justify-center rounded-full">
                {" "}
                <p className="text-2xl font-Montserrat font-bold">
                  <PauseIcon className="h-9 " />
                </p>
              </div>
            </div>
          ) : (
            <iframe src="https://embed.lottiefiles.com/animation/78913"></iframe>
          )}
        </>
      )}
      {!initRecording && (
        <div
          onClick={startRecording}
          className="w-24 cursor-pointer h-24 mt-4 ring-2 ring-red-500 flex flex-row items-center justify-center  rounded-full"
        >
          <div className="w-20 h-20 bg-red-500 text-center flex flex-row items-center justify-center rounded-full">
            {" "}
            <p className="text-2xl font-Montserrat font-bold">REC</p>
          </div>
        </div>
      )}

      <div className="py-3">
        <span className="font-Montserrat text-3xl">
          {formatMinutes(recordingMinutes)}
        </span>
        <span className="font-Montserrat text-3xl">:</span>
        <span className="font-Montserrat text-3xl">
          {formatSeconds(recordingSeconds)}
        </span>
      </div>
      {initRecording && (
        <div className="flex flex-row items-center pb-4 space-x-3">
          {isPause === false ? (
            <div
              className="bg-blue-600 rounded-full flex items-center space-x-4 cursor-pointer flex-row px-2 py-1"
              title="Save recording"
              onClick={pauseRecording}
            >
              <PauseCircleIcon className="h-7 pr-1" />
              Pause
            </div>
          ) : (
            <div
              className="bg-blue-600 rounded-full flex items-center space-x-4 cursor-pointer flex-row px-2 py-1"
              title="Save recording"
              onClick={resumeRecording}
            >
              <PlayCircleIcon className="h-6 pr-1" />
              Resume
            </div>
          )}
          {initRecording && (
            <div
              className="bg-green-600 rounded-full flex items-center space-x-4 cursor-pointer flex-row px-2 py-1"
              title="Save recording"
              disabled={recordingSeconds === 0}
              onClick={saveRecording}
            >
              <ion-icon name="save-outline" class="text-xl pr-2"></ion-icon>
              Save
            </div>
          )}
        </div>
      )}
      {initRecording && (
        <div
          className="bg-red-500 rounded-full flex items-center space-x-4 cursor-pointer flex-row px-2 py-1"
          title="Cancel recording"
          onClick={cancelRecording}
        >
          <XCircleIcon className="h-5" />
          Cancel
        </div>
      )}
    </div>
  );
}
