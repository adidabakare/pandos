import React from "react";

const Audience = (props) => {
  if (props.inRoom === false) {
    console.log("props", "working");
  }
  return (
    <div className="mt-9 flex flex-row space-x-4">
      <div className="rounded-3xl w-32 relative h-32 mb-8 ">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex flex-row items-center justify-center top-0 border-4 border-[#111827]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute ">
          {!props.speaking ? (
            <iframe
              // onClick={props.microphoneState}
              src="https://embed.lottiefiles.com/animation/21222"
              width={80}
              height={80}
            ></iframe>
          ) : (
            <ion-icon
              // onClick={props.microphoneState}
              name="mic-off"
              class="text-[#f31260] m-auto  text-3xl"
            ></ion-icon>
          )}
        </div>
        <img
          src={props.image}
          className="object-cover  h-32 w-32 rounded-3xl"
        />
        <div class="w-full px-4 py-1 rounded-b-3xl absolute bottom-0 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          <p className="text-white text-center">{props.name}</p>
          <p>
            {typeof props.inRoom == "undefined" && props.id != props.kkey
              ? "left"
              : ""}
          </p>
          {/* <p className="text-white">Mends</p> */}
        </div>
      </div>
    </div>
  );
};

export default Audience;
