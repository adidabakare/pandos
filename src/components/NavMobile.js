import React, { useState } from "react";

// import icons
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link, useHistory, useLocation } from "react-router-dom";

// import navigation data
import { navigation } from "../data";

// import components
import Socials from "./Socials";

// import framer
import { motion } from "framer-motion";

// import Link
// import { Link } from "react-scroll";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const search = useLocation().pathname;
  const [visible, setVisible] = React.useState(false);

  const circleVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 180,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 60,
      },
    },
  };

  const ulVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
      },
    },
  };

  return (
    <nav className="relative z-50">
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer text-white z-50"
      >
        <Bars3Icon className="w-8 h-8" />
      </div>

      {/* circle */}
      <motion.div
        variants={circleVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="w-4 h-4 rounded-full bg-gray-900 fixed top-0 right-0"
      ></motion.div>

      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate={isOpen ? "visible" : ""}
        className={`${
          isOpen ? "right-0" : "-right-full"
        } fixed top-0 bottom-0 w-full flex flex-col justify-center items-center transition-all duration-300 overflow-hidden`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-8 right-8"
        >
          <XMarkIcon className="w-8 h-8" />
        </div>
        <div className="bg-transparent lg:bg-[#272d38] pl-1 space-y-7 py-6 cursor-pointer flex flex-col m-5 text-center items-center justify-center rounded-2xl">
          <Link to="/space-dashboard-music">
            <span
              className={`${
                search === "/space-dashboard-music"
                  ? "bg-[#06bc60] p-2 rounded-2xl"
                  : ""
              } `}
            >
              <ion-icon
                class="text-white text-3xl "
                name="musical-notes-outline"
              ></ion-icon>
            </span>
          </Link>
          <Link to="/space-dashboard-podcast">
            <span
              className={`${
                search === "/space-dashboard-podcast"
                  ? "bg-[#06bc60] p-2 rounded-2xl"
                  : ""
              } `}
            >
              <ion-icon
                class="text-white text-4xl "
                name="mic-circle-outline"
              ></ion-icon>
            </span>
          </Link>

          {/* <Link to="/create-space"> */}
          <span
            onClick={() => {
              setVisible(true);
            }}
            className={`${
              search.split("/")[1] == "space-dashboard-space"
                ? "bg-[#06bc60] p-2 rounded-2xl"
                : ""
            } `}
          >
            <ion-icon
              class="text-white text-3xl "
              name="radio-outline"
            ></ion-icon>
          </span>
          {/* </Link> */}
          <Link to="/space-dashboard-nft">
            <span
              className={`${
                search == "/space-dashboard-nft"
                  ? "bg-[#06bc60] p-2 rounded-2xl"
                  : ""
              } `}
            >
              <ion-icon
                class="text-white text-3xl "
                name="color-palette-outline"
              ></ion-icon>
            </span>
          </Link>
          <Link to="/space-dashboard-categories">
            <span
              className={`${
                search === "/space-dashboard-categories"
                  ? "bg-[#06bc60] p-2 rounded-2xl"
                  : ""
              } `}
            >
              <ion-icon
                class="text-white text-3xl "
                name="albums-outline"
              ></ion-icon>
            </span>
          </Link>
          <Link to="/space-dashboard-upload">
            <span
              className={`${
                search === "/space-dashboard-upload"
                  ? "bg-[#06bc60] p-2 rounded-2xl"
                  : ""
              } `}
            >
              <ion-icon
                class="text-white text-3xl "
                name="share-outline"
              ></ion-icon>{" "}
            </span>
          </Link>
          <Link to="/space-dashboard-profile">
            <span
              className={`${
                search === "/space-dashboard-profile"
                  ? "bg-[#06bc60] p-2 rounded-2xl"
                  : ""
              } `}
            >
              <ion-icon
                class="text-white text-3xl "
                name="person-outline"
              ></ion-icon>{" "}
            </span>
          </Link>
        </div>
        {/* {navigation.map((item, idx) => {
          return (
            <li key={idx} className="mb-8">
              <Link
                to={item.href}
                smooth={true}
                duration={500}
                offset={-70}
                className="text-xl cursor-pointer capitalize"
              >
                {item.name}
              </Link>
            </li>
          );
        })} */}
        {/* <Socials /> */}
      </motion.ul>
    </nav>
  );
};

export default NavMobile;
