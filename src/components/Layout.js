import React, { useState, useContext, useEffect } from "react";

import Player from "./Player";
import { Modal, Input, Badge, Button, Text, User } from "@nextui-org/react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";

const Layout = (props) => {
  const search = useLocation().pathname;
  console.log(search.split("/")[1]); //12345
  const [visible, setVisible] = React.useState(false);
  const [spacename, setspacename] = useState("");
  const [errormessage, seterrormessage] = useState(false);
  const [isregistered, setisregistered] = useState("");
  const history = useHistory();
  const init = localStorage.getItem("isOpen");
  const closeHandler = () => {
    setVisible(false);
  };
  window.addEventListener("storage", () => {
    const data = window.localStorage.getItem("isOpen");
    setisOpen(data);
  });

  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);

  const [isOpen, setisOpen] = useState(false);

  async function isRegistered() {
    const res = await signer?.isRegisteredFunc();
    if (res === false) {
      window.location.href = "/space-dashboard-profile-edit";
    }
  }
  useEffect(() => {
    isRegistered();
  }, []);

  return (
    <>
      <Modal
        closeButton
        preventClose
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text b id="modal-title" size={20}>
            Create or Join Space{" "}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="space name"
            value={spacename}
            onChange={(e) => {
              setspacename(e.target.value);
            }}
          />
        </Modal.Body>
        {/* <Modal.Footer> */}
        <div className="mx-6 mb-6">
          <div class="inline-flex w-full rounded-xl shadow-sm" role="group">
            <button
              onClick={() => {
                if (spacename === "") {
                  seterrormessage(true);
                  return;
                }
                history.push(`/space-dashboard-space/${spacename}/${true}`);
              }}
              type="button"
              class="w-full py-3 px-4 text-sm font-medium  text-gray-900 bg-[#17C964] rounded-l-xl border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Create Space
            </button>

            <button
              onClick={() => {
                if (spacename === "") {
                  seterrormessage(true);
                  return;
                }
                history.push(`/space-dashboard-space/${spacename}/${false}`);
              }}
              type="button"
              class=" w-full py-3 px-4 text-sm font-medium text-gray-900 bg-[#0072F5] rounded-r-xl border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Join Space
            </button>
          </div>
        </div>
        {/* </Modal.Footer> */}
      </Modal>
      <div className="relative font-Montserrat bg-ocean ">
        {/* <div className="grid grid-cols-12   w-full  rounded-2xl  bg-black  bg-opacity-5 backdrop-blur-2xl "> */}
        <div className="grid grid-cols-12 w-full  bg-[#16181c] ">
          <div className="hidden lg:block lg:col-span-1 h-max lg:h-auto bg-[#1a1c21] pt-3 rounded-tl-2xl rounded-bl-2xl ">
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
          </div>

          <div className="col-span-12 lg:col-span-11  mx-6 lg:mx-10 ">
            {props.children}
          </div>
        </div>
        <div className="fixed z-50 bottom-0 w-full">
          {isOpen == "true" ? <Player /> : ""}
        </div>
      </div>
    </>
  );
};

export default Layout;
