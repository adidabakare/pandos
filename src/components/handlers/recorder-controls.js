export async function startRecording(setRecorderState) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export function pauseRecording(recorder, setRecorderState) {
  if (recorder.state !== "inactive") {
    setRecorderState((prevState) => {
      return {
        ...prevState,
        isPause: true,
      };
    });
    recorder.pause();
  }
}

export function resumeRecording(recorder, setRecorderState) {
  if (recorder.state !== "inactive") {
    setRecorderState((prevState) => {
      return {
        ...prevState,
        isPause: false,
      };
    });
    recorder.resume();
  }
}
export function saveRecording(recorder) {
  if (recorder.state !== "inactive") recorder.stop();
}
