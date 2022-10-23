import React, { useMemo, useState, useEffect, useContext } from "react";
import { Easing } from "react-native-web";
import { useJam, use } from "jam-core-react";
import Audience from "./Space/Audience";
import { Modal, Input, Badge, Button, Text } from "@nextui-org/react";
import AudiencePro from "./Space/AudiencePro";
import emojis from "../lib/utilities";
import Fly from "react-flying-objects";
import Chat from "./Chat/Chat";
import Theme from "./Theme/Theme";
import { useParams, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";
import { disconnect } from "process";

const DELAY = 50;
const DURATION = 5000;
const SIZE = 25;

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const Dashboard = () => {
  const {
    address,
    signer,
    contract,
    provider,
    chainId,
    connect,
    disconnect,
    web3Provider,
  } = useContext(AuthContext);
  console.log(address);

  async function isRegistered() {
    const data = await signer?.isRegisteredFunc();
    return data;
    console.log("storage ----------", data);
  }

  useEffect(async () => {
    if (!web3Provider) {
      setvisible2(true);
    } else {
      setvisible2(false);
      let res = await isRegistered();

      setVisible(!res);
    }

    setethaddress(address);
  }, [signer]);

  const registerUser = async () => {
    let transaction = await signer.setRegistered();
  };
  const history = useHistory();
  const [animatedEmoji, setAnimatedEmoji] = useState(); // objectConfig
  const [flyingObjects, setFlyingObjects] = useState([]); // Used to manage all flying currently objects by the Fly component
  const [pos, setpos] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [theme, setTheme] = useState("");
  const [opentheme, setopentheme] = useState("");
  const [audience, setaudience] = useState([]);
  const [space, setspace] = useState("");
  const [ethaddress, setethaddress] = useState("");
  let { spacename, action } = useParams();
  const [visible2, setvisible2] = useState("");
  const objectConfig = useMemo(
    () => ({
      // Config for a single flying object which would fly in a moment
      right: {
        fromValue: pos == "true" ? 0 : 800,
        toValue: 600,
        duration: DURATION,
        delay: DELAY,
      },
      bottom: {
        fromValue: 0,
        toValue: 600,
        duration: DURATION,
        delay: DELAY,
      },
      top: {
        fromValue: random(100, 200),
        toValue: random(100, 200),
        duration: DURATION,
        easing: Easing.elastic(5),
        delay: DELAY,
      },
      width: {
        fromValue: random(SIZE - 20, SIZE + 20),
        toValue: SIZE,
        duration: DURATION,
        easing: Easing.elastic(5),
        delay: DELAY,
      },
      height: {
        fromValue: random(SIZE - 10, SIZE + 10),
        toValue: SIZE,
        duration: DURATION,
        easing: Easing.elastic(5),
        delay: DELAY,
      },
      opacity: {
        fromValue: 1,
        toValue: 0,
        duration: DURATION,
        easing: Easing.exp,
        delay: DELAY,
      },
    }),
    [animatedEmoji]
  );

  useEffect(async () => {
    if (action === "true") {
      // console.log(spacename, action);
      // createRoom(spacename, { name: spacename, stageOnly: true });
      // setProps("roomId", spacename);
      // setProps({
      //   userInteracted: true,
      //   micMuted: true,
      //   roomId: space,
      // });
      // enterRoom(spacename);

      createRoom(spacename, {
        name: "My First space",
        stageOnly: true,
      });

      enterRoom(spacename);
      setProps("roomId", spacename);
      setState("spacename", spacename);
    } else {
      enterRoom(spacename);
      setProps("roomId", spacename);
      setState("spacename", spacename);
    }
  }, []);

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const updateUserData = async () => {
    let infoUpdate = await updateInfo({
      name: username,
      avatar: imageurl,
      id: ethaddress,
    })
      .then((res) => {
        setVisible(false);
        registerUser();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [
    state,
    {
      createRoom,
      setProps,
      enterRoom,
      leaveRoom,
      selectMicrophone,
      setState,
      sendReaction,
      startRecording,
      stopRecording,
      updateInfo,
      updateRoom,
      switchCamera,
    },
  ] = useJam();
  let [
    roomId,
    speaking,
    myId,
    inRoom,
    iAmSpeaker,
    iAmModerator,
    peers,
    peerState,
    availableMicrophones,
    room,
  ] = use(state, [
    "roomId",
    "speaking",
    "myId",
    "inRoom",
    "iAmSpeaker",
    "iAmModerator",
    "peers",
    "peerState",
    "availableMicrophones",
    "room",
  ]);

  console.log("real", state.peerState);
  let roomname = localStorage.getItem("roomname");
  let [potentialRoomId, setPotentialRoomId] = useState(roomname);
  const [username, setusername] = useState("");
  const [imageurl, setimageurl] = useState("");

  const microphoneState = () => {
    if (state.micMuted === true) {
      setProps("micMuted", false);
    } else {
      setProps("micMuted", true);
    }
  };

  useEffect(() => {
    let hashChange = () => {
      let hash = roomname || null;
      if (hash !== state.roomId) {
        setPotentialRoomId(hash);
        setProps("roomId", null);
      }
    };

    window.addEventListener("hashchange", hashChange);
    return () => {
      window.removeEventListener("hashchange", hashChange);
    };
  }, [setProps, state, updateRoom, updateInfo]);

  const onSelect = (emojiData) => {
    console.log(state.reactions);
    // const emoji = <span style={{ fontSize: "5rem" }}>{emojiData}</span>;
    // setAnimatedEmoji(emoji);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let reactions = state.reactions;
      for (const key in reactions) {
        reactions[key].map((emj) => {
          // sendReaction(emj[0]);
          console.log("reactions", emj[0]);
          // alert(emj[0]);
          const emoji = <span style={{ fontSize: "5rem" }}>{emj[0]}</span>;
          setAnimatedEmoji(emoji);
        });
      }
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [state.reactions]);
  console.log("state1", state);

  return (
    <div>
      <div>
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
              Setup your profile
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="User Name "
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              // contentLeft={<Mail fill="currentColor" />}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Avatar Url"
              value={imageurl}
              onChange={(e) => {
                setimageurl(e.target.value);
              }}
              // contentLeft={<Password fill="currentColor" />}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="eth address"
              value={ethaddress}
              onChange={(e) => {
                setethaddress(e.target.value);
              }}
            />
          </Modal.Body>
          {/* <Modal.Footer> */}
          <Button
            auto
            onClick={() => {
              updateUserData();
            }}
            className={"mx-6 mb-8"}
          >
            Save{" "}
          </Button>
          {/* </Modal.Footer> */}
        </Modal>
        <Modal
          preventClose
          className="z-5"
          blur
          aria-labelledby="modal-title"
          open={visible2}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              <Text b size={18}>
                MetaSpace
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text className="text-center" id="modal-title" size={18}>
              Connect your wallet
            </Text>
          </Modal.Body>
          {/* <Modal.Footer> */}
          {/* <Link to={`/space/${spacename}/${action}`}> */}
          {/* <Link to={`/space`}> */}
          {/* <Button */}
          <button
            className="w-full bg-[#06bc60] py-2 rounded-lg text-md text-white"
            onClick={() => {
              connect();
              setvisible2(false);
            }}
          >
            {" "}
            Connect
          </button>
          {/* </Button> */}
          {/* </Link> */}
          {/* </Modal.Footer>  */}
        </Modal>
      </div>
      <div className="z-50 relative">
        <Fly
          objectToFly={animatedEmoji}
          objectConfig={objectConfig}
          flyingObjects={flyingObjects}
          setFlyingObjects={setFlyingObjects}
        />
      </div>
      <div
        className={`bg-${theme || "header-img"}
         md:p-24 p-8 bg-cover -z-40 w-full `}
      >
        <p className="font-Wavetosh text-white text-center pb-4 text-4xl">
          We Outta space
        </p>
        <div className="bg-[#182030] relative   m-auto rounded-3xl md:w-8/12 w-full md:p-6 p-4 flex flex-row justify-center items-center">
          <div className="bg-gray-900  relative rounded-2xl w-full p-6">
            <div className="w-max bg-white bg-opacity-10 ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-2xl px-3 py-1 m-auto">
              {state.spacename}
            </div>
            <div className="flex flex-col">
              <span
                onClick={() => {
                  setVisible(true);
                }}
              >
                <ion-icon
                  class=" cursor-pointer text-3xl text-white bg-gray-700 rounded-xl p-2"
                  name="settings-outline"
                ></ion-icon>
              </span>
              <Badge
                onClick={() => {
                  disconnect();
                }}
                enableShadow
                disableOutline
                color="primary"
              >
                connected
              </Badge>
            </div>
            <p className="text-white text-xl pb-8">Moderator</p>
            <div className="  flex md:flex-row flex-col  md:space-x-4">
              {state.iAmModerator === true ? (
                <AudiencePro
                  image={state.myIdentity.info.avatar}
                  name={state.myIdentity.info.name}
                  handRaised={state.myIdentity.info.handRaised}
                  speaking={state.peerState[myId]?.micMuted}
                />
              ) : (
                Object.keys(state.identities)
                  .filter(
                    (identity) =>
                      identity == state.room.moderators[0] &&
                      typeof state.peerState[identity] !== "undefined"
                  )
                  .map((key, idx) => (
                    <AudiencePro
                      handRaised={false}
                      key={idx}
                      image={state.identities[key].avatar}
                      name={state.identities[key].name}
                      speaking={state.peerState[key]?.micMuted}
                    />
                  ))
              )}
            </div>
            <div className="flex flex-row items-center space-x-3">
              <p className="text-white text-xl pt-2 pb-2">Audience</p>
              <span className="bg-green-400 text-2xl px-2  text-white rounded-xl">
                {state.iAmModerator === true
                  ? Object.keys(state.identities).filter(
                      (identity) =>
                        typeof state.peerState[identity] !== "undefined"
                    ).length - 1
                  : Object.keys(state.identities).filter(
                      (identity) =>
                        typeof state.peerState[identity] !== "undefined"
                    ).length}
              </span>
            </div>
            <div
              className={`grid md:grid-cols-5 grid-cols-2 gap-4 ${
                audience.length > 5 ? "h-72" : "h-40"
              } overflow-scroll`}
            >
              {state.iAmModerator === false ? (
                <Audience
                  image={state.myIdentity.info.avatar}
                  name={state.myIdentity.info.name}
                  handRaised={state.myIdentity.info.handRaised}
                  speaking={state.peerState[myId]?.micMuted}
                />
              ) : (
                ""
              )}

              {Object.keys(state.identities)
                .filter(
                  (identity) =>
                    identity != state.room.moderators[0] &&
                    typeof state.peerState[identity] !== "undefined"
                )
                .map((key, idx) => (
                  <Audience
                    handRaised={false}
                    key={idx}
                    id={state.myId}
                    kkey={key}
                    image={state.identities[key].avatar}
                    name={state.identities[key].name}
                    speaking={state.peerState[key]?.micMuted}
                    inRoom={state.peerState[key]?.inRoom}
                  />
                ))}
            </div>
            {
              <div className="flex flex-col  md:flex-row justify-between mt-4 md:space-x-3">
                <Button
                  onClick={() => {
                    microphoneState();
                  }}
                  auto
                  color="primary"
                  className="w-full"
                  style={{ width: "100%" }}
                  icon={
                    state.micMuted ? (
                      <ion-icon
                        name="mic-off-outline"
                        class="text-white text-xl pt-1"
                      ></ion-icon>
                    ) : (
                      <ion-icon
                        name="mic-outline"
                        class="text-white text-xl pt-1"
                      ></ion-icon>
                    )
                  }
                >
                  {state.micMuted
                    ? `Your microphone is off`
                    : `Your microphone is on`}{" "}
                </Button>
                <Button
                  auto
                  color="error"
                  className="w-full"
                  style={{ width: "100%" }}
                  onClick={async () => {
                    localStorage.setItem("roomname", " ");
                    await leaveRoom();

                    setProps("roomId", null);
                    window.location = "/";
                  }}
                  icon={
                    <ion-icon
                      name="log-out-outline"
                      class="text-white text-xl pt-1"
                    ></ion-icon>
                  }
                >
                  Leave Space
                </Button>
              </div>
            }

            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 m-auto mb-4 flex flex-row justify-center items-center ">
              <div className="relative  w-4/12 md:w-7/12  bg-white bg-opacity-10 ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-2xl px-3 py-3">
                <div class="flex overflow-x-auto items-center space-x-8  ">
                  {emojis.map((emojies, index) => (
                    <div onClick={() => {}}>
                      <section
                        class={`flex-shrink-0 rounded-full cursor-pointer ${
                          index == emojis.length - 1 ? "pr-32" : ""
                        }`}
                        onClick={() => {
                          sendReaction(emojies.code);

                          onSelect(emojies.code);
                        }}
                      >
                        <div className="text-5xl h-10 w-10 ">
                          <img src={emojies.live} className="object-cover " />
                        </div>
                      </section>
                    </div>
                  ))}
                  <div className="absolute right-0 h-full w-32 bg-gradient-to-l rounded-tr-2xl rounded-br-2xl from-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 right-4 z-50 space-x-2 flex flex-row">
        <button
          onClick={() => {
            setisopen(!isopen);
            console.log(isopen);
          }}
          class=" inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2"
        >
          <svg
            class="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2"
            viewBox="0 0 12 12"
          >
            <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
          </svg>
          <span>{isopen ? "Close" : "Open"} Chat</span>
        </button>
        <button
          onClick={() => {
            setopentheme(!opentheme);
          }}
          class=" inline-flex items-center text-sm font-medium text-white bg-green-400 hover:bg-green-500 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2"
        >
          <ion-icon name="color-palette-outline" class="text-2xl"></ion-icon>
        </button>
      </div>

      <Chat isopen={isopen} audience={audience} />
      <Theme
        isthemeopen={opentheme}
        onClick={(theme) => {
          console.log(theme);
          setTheme(theme);
        }}
      />
    </div>
  );
};

export default Dashboard;
