import React from "react";

const Moderator = (props) => {
  return (
    <div className="rounded-3xl w-36 relative h-36 mb-6 ">
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
            class="text-red-400 m-auto  text-3xl"
          ></ion-icon>
        )}
      </div>
      <img src={props.image} className="object-cover  h-36 w-36 rounded-3xl" />
      <div class="w-full px-4 py-1 rounded-b-3xl absolute bottom-0 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
        <p className="text-white text-center">Mends</p>
        <p className="cursor-pointer bg-[#41e1e9] mb-1 text-center rounded-full text-white ">
          Tip
        </p>
      </div>
    </div>
  );
};

export default Moderator;
