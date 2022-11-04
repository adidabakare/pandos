import React, { useMemo, useState, useEffect, useReducer } from "react";
import { Easing } from "react-native-web";
import { JamProvider, useJam, use } from "jam-core-react";
import Audience from "./Space/Audience";
import { Modal, Input, Row, Collapse, Button, Text } from "@nextui-org/react";
import AudiencePro from "./Space/AudiencePro";
import heart from "../assets/img/emojies/512.gif";
import mind from "../assets/img/emojies/513.gif";
import think from "../assets/img/emojies/514.gif";
import surprice from "../assets/img/emojies/515.gif";
import please from "../assets/img/emojies/517.gif";
import star from "../assets/img/emojies/518.gif";
import thumb from "../assets/img/emojies/519.gif";
import fire from "../assets/img/emojies/520.gif";
import celebrate from "../assets/img/emojies/521.gif";
import laugh from "../assets/img/emojies/522.gif";
import eyelove from "../assets/img/emojies/523.gif";
import onehun from "../assets/img/emojies/524.gif";
import laughcry from "../assets/img/emojies/525.gif";
import Fly from "react-flying-objects";
import Chat from "./Chat/Chat";
import Theme from "./Theme/Theme";
import { useParams, useHistory, Link } from "react-router-dom";
import useForceUpdate from "use-force-update";

const DELAY = 50;
const DURATION = 5000;
const SIZE = 25;

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const Dashboard = () => {
  const [animatedEmoji, setAnimatedEmoji] = useState(); // objectConfig
  const [flyingObjects, setFlyingObjects] = useState([]); // Used to manage all flying currently objects by the Fly component
  const [pos, setpos] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [theme, setTheme] = useState("");
  const [opentheme, setopentheme] = useState("");
  const [audience, setaudience] = useState([]);
  const [updated, setupdated] = useState(false);
  const [visible2, setvisible2] = useState(false);
  const [ethaddress, setethaddress] = useState("");
  const [space, setspace] = useState("");
  let { spacename, action } = useParams();
  const forceUpdate = useForceUpdate();
  const objectConfig = useMemo(
    () => ({
      // Config for a single flying object which ufly in a moment
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
  ); // On animatedEmoji change we calculate new random values for the next flying object

  const history = useHistory();

  const mediaQuery = window.matchMedia("(min-width: 208px)");
  const mQuery = window.matchMedia("(max-width: 308px)");
  // Check if the media query is true
  useEffect(() => {
    if (mediaQuery.matches) {
      setpos(true);
    }
    if (mQuery.matches) {
      setpos(false);
    }
  }, []);

  useEffect(() => {
    // testttt

    let filt = Object.keys(state.identities).filter((identity) => {
      // console.log("testttt", identity);
      // console.log("testttt", identitystate.room.moderators[0]);
      // identity.id != state.room.moderators[0]
    });
    console.log("testttt", filt);
  }, []);

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

  const emojis = [
    { live: heart, code: "❤️" },
    { live: laughcry, code: "😂" },
    { live: onehun, code: "💯" },
    { live: laugh, code: "😅" },
    { live: fire, code: "🔥" },
    { live: please, code: "🙏" },
    { live: thumb, code: "❤️👍" },
    { live: think, code: "🤔" },
    { live: celebrate, code: "🎉" },
    { live: eyelove, code: "😍" },
    { live: surprice, code: "😳" },
    { live: star, code: "💫" },
    { live: mind, code: "🤯" },
  ];

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const closeHandler2 = () => {
    setvisible2(false);
  };

  const updateUserData = async () => {
    let infoUpdate = await updateInfo({
      name: username,
      avatar: imageurl,
      id: "hahasampleidchangelateritbtcaddress",
    })
      .then((res) => {
        setVisible(false);
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log("update info", infoUpdate);
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

  let roomname = localStorage.getItem("roomname");
  console.log(roomname.length);
  let [potentialRoomId, setPotentialRoomId] = useState(roomname);
  const [username, setusername] = useState("");
  const [imageurl, setimageurl] = useState("");

  const onCreateRoom = () => {
    setProps({
      userInteracted: true,
      micMuted: true,
      roomId: space,
    });

    if (state.inRoom) {
      leaveRoom();
      setProps("roomId", null);
    } else {
      createRoom(roomname, { stageOnly: true });
      setProps("roomId", roomname);
      enterRoom(roomname);
      window.location.hash = roomname;
    }
    setvisible2(false);
  };

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

  useEffect(() => {
    let listeners = state.identities;
    console.log("listeners123", listeners);
    for (const key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        if (audience.filter((e) => e.name === listeners[key].name).length > 0) {
          // your code
          return;
        } else {
          setaudience((prevAud) => [
            ...prevAud,
            {
              id: key,
              name: listeners[key].name,
              id_: listeners[key].id,
              avatar: listeners[key].avatar,
              handRaised: listeners[key].handRaised,
            },
          ]);
        }
        setupdated(true);
        console.log(`${key}: ${listeners[key].name}`);
      }
    }
    // forceUpdate();
  }, [state.identities]);

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
        // className={`bg-trappist md:p-16 p-8 bg-cover -z-40 w-full`}
      >
        <p className="font-Wavetosh text-white text-center pb-4 text-4xl">
          We Outta space
        </p>
        <div className="bg-[#182030] relative   m-auto rounded-3xl md:w-8/12 w-full md:p-6 p-4 flex flex-row justify-center items-center">
          {/* <p classN ame="text-gray-200 text-xl mb-10">Moderator</p> */}

          <div className="bg-gray-900  relative rounded-2xl w-full p-6">
            {}
            {/* <Button
              onClick={() => {
                setvisible2(true);
              }}
              auto
              color="gradient"
              rounded
              bordered
              className="m-auto"
            >
              {roomname.length == 0 ? "create space" : "Join space"}
            </Button> */}

            {/* <p className="text-orange-400 text-center  text-2xl pb-8">
              What is Next for NFT?
            </p> */}
            {/* <Button
              onClick={() => {
                createRoom(roomname, { name: roomname, stageOnly: true });
              }}
            >
              Create room
            </Button> */}
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
                  .filter((identity) => identity == state.room.moderators[0])
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
                {audience.length}
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

              {/* {audience
                .filter((audience) => audience.id != state.room.moderators[0])
                .map((audience, index) => (
                  <Audience
                    handRaised={audience.handRaised}
                    key={index}
                    image={audience.avatar}
                    name={audience.name}
                    speaking={state.peerState[audience.id]?.micMuted}
                  />
                ))} */}
              {Object.keys(state.identities)
                .filter((identity) => identity != state.room.moderators[0])
                .map((key, idx) => (
                  <Audience
                    handRaised={false}
                    key={idx}
                    image={state.identities[key].avatar}
                    name={state.identities[key].name}
                    speaking={state.peerState[key]?.micMuted}
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
                  onClick={() => {
                    localStorage.setItem("roomname", " ");
                    leaveRoom();
                    setProps("roomId", null);
                    // history.push("/");
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
              {/* <div className="relative  w-full bg-white bg-opacity-10 ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-2xl px-3 py-3"> */}
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
                        <div className="text-5xl h-12 w-12 ">
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
