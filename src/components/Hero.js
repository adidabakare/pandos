import { MicrophoneIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Modal, Input, Row, Collapse, Button, Text } from "@nextui-org/react";
import { Link, useHistory } from "react-router-dom";
const Hero = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const [spacename, setspacename] = useState("");
  const history = useHistory();

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <>
      <section
        id="home"
        className="  relative h-screen flex items-center  bg-music-bg bg-primary lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden"
      >
        <div className="container mx-auto h-full">
          <div className="flex items-center h-full pt-8">
            <div className="flex-1 flex flex-col items-center lg:items-start">
              <h1 className="text-4xl leading-[44px] md:text-5xl md:leading-tight font-Wavetosh lg:text-7xl lg:leading-[1.2] font-bold md:tracking-[-2px]">
                MetaSpace
              </h1>
              <p className="pt-4 pb-8 md:pt-6 md:pb-12 max-w-[480px] text-lg text-center lg:text-left">
                MetaSpace is a space where people can come together and have
                conversations, request/provide services, share ideas, ask
                questions and earn rewards
              </p>
              <button
                onClick={() => {
                  history.push("/create-space");
                }}
                className=" rounded-full btn btn-md bg-orange-500 hover:bg-orange-400 md:btn-lg transition-all"
              >
                <MicrophoneIcon className="h-6" />
                Start a space{" "}
              </button>
            </div>

            <div className="hidden lg:flex flex-1  justify-end items-end ">
              {/* <img src={World3} alt="" width={400} height={400} /> */}
              {/* <iframe src="https://embed.lottiefiles.com/animation/4876"></iframe> */}
              <iframe
                src="https://embed.lottiefiles.com/animation/4876"
                width={600}
                height={600}
              ></iframe>
              {/* <iframe
                src="https://embed.lottiefiles.com/animation/68792"
                width={500}
                height={500}
              ></iframe> */}
            </div>
          </div>
        </div>
        {/* <div class="h-20 w-full absolute bottom-0  bg-gradient-to-t from-gray-900 to-transparent"></div> */}
      </section>

      {/* <div className="w-full h-60 bg-gradient-to-r from-red-500 to-transparent "></div> */}
    </>
  );
};

export default Hero;
