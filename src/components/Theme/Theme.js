import React, { useMemo, useState, useEffect, useRef } from "react";
import { Avatar } from "@nextui-org/react";

import afgl5180 from "../../assets/theme/afgl5180.jpeg";
import agCarinae from "../../assets/theme/agCarinae.jpeg";
import dobashi4173 from "../../assets/theme/dobashi4173.jpeg";
import fomalhaut from "../../assets/theme/fomalhaut.jpeg";
import iras from "../../assets/theme/iras.jpeg";
import iras07015 from "../../assets/theme/iras07015.jpeg";
import ldn1551 from "../../assets/theme/ldn1551.jpeg";
import luhman16a from "../../assets/theme/luhman16a.jpeg";
import m104sombrerogalaxy from "../../assets/theme/m104sombrerogalaxy.jpeg";
import micegalaxiesngc4676 from "../../assets/theme/micegalaxiesngc4676.jpeg";
import ngc1275 from "../../assets/theme/ngc1275.jpeg";
import ngc1300 from "../../assets/theme/ngc1300.jpeg";
import ogle2007 from "../../assets/theme/ogle-2007.jpeg";
import sbw2007 from "../../assets/theme/sbw2007.jpeg";
import trappist from "../../assets/theme/trappist.jpeg";

const Chat = (props) => {
  const themes = [
    { src: afgl5180, name: "afgl5180" },
    { src: dobashi4173, name: "dobashi4173" },
    { src: fomalhaut, name: "fomalhaut" },
    { src: iras, name: "iras" },
    { src: iras07015, name: "iras07015" },
    { src: ldn1551, name: "ldn1551" },
    { src: luhman16a, name: "luhman16a" },
    { src: m104sombrerogalaxy, name: "m104sombrerogalaxy" },
    { src: micegalaxiesngc4676, name: "micegalaxiesngc4676" },
    { src: ngc1275, name: "ngc1275" },
    { src: ngc1300, name: "ngc1300" },
    { src: ogle2007, name: "ogle2007" },
    { src: sbw2007, name: "sbw2007" },
    { src: trappist, name: "trappist" },
  ];
  return (
    <div
      class={`opacity-0 ${
        props.isthemeopen ? "transition opacity-100" : "opacity-0"
      }`}
    >
      <div class="fixed bottom-0 right-0 max-w-[430px] mx-auto bg-[#182030]  shadow-2xl rounded-lg">
        <header class="pt-6 pb-2 px-5 border-b border-gray-900">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <div class="pr-1">
                <a
                  class="inline-flex text-gray-800 hover:text-gray-900"
                  href="#0"
                >
                  <div class="text-[18px] text-white font-bold">Set Theme</div>
                </a>

                <div className="mt-2"></div>
              </div>
            </div>
            {/* <div class="relative inline-flex flex-shrink-0"></div> */}
          </div>
          <div class="flex flex-wrap justify-center sm:justify-start space-x-4"></div>
        </header>
        <div class="py-3 px-5">
          <div class="text-[16px] mb-3 font-bold">Themes</div>
          <div class="divide-y divide-gray-900 h-72 overflow-y-scroll ">
            {themes.map((theme, index) => (
              <div
                onClick={() => {
                  props.onClick(theme.name);
                }}
                className={`flex flex-row mb-2 cursor-pointer items-center space-x-4 ${
                  index == themes.length - 1 ? "pb-14" : ""
                }`}
              >
                <Avatar
                  squared
                  src={theme.src}
                  size="lg"
                  style={{ cursor: "pointer" }}
                />
                <p className="text-xl">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
