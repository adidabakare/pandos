import useRecordingsList from "../../hooks/use-recordings-list";
export default function RecordingsList({ audio }) {
  const { recordings, deleteAudio } = useRecordingsList(audio);

  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <h1 className="text-2xl font-Montserrat">Your recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div
                className="flex flex-row items-center my-4 "
                key={record.key}
              >
                <audio controls src={record.audio} />
                <div className="delete-button-container">
                  <button
                    className="ml-4"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    <ion-icon
                      name="trash-outline"
                      class="text-white text-2xl"
                    ></ion-icon>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-records">
          <span>:(</span>
          <span> You don't have records</span>
        </div>
      )}
    </div>
  );
}
