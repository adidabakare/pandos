import React, { useMemo, useState, useEffect, useRef } from "react";
import { Grid, Input, Loading } from "@nextui-org/react";
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { useMoralis, useMoralisQuery } from "react-moralis";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const messageEl = useRef(null);
  const [isopen, setisopen] = useState(false);

  const MINS_DURATION = 90;

  const generateMessage = () => {
    const words = [
      "The sky",
      "above",
      "the port",
      "was",
      "the color of television",
      "tuned",
      "to",
      "a dead channel",
      ".",
      "All",
      "this happened",
      "more or less",
      ".",
      "I",
      "had",
      "the story",
      "bit by bit",
      "from various people",
      "and",
      "as generally",
      "happens",
      "in such cases",
      "each time",
      "it",
      "was",
      "a different story",
      ".",
      "It",
      "was",
      "a pleasure",
      "to",
      "burn",
    ];
    const text = [];
    let x = 7;
    while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
    return text.join(" ");
  };

  const { isAuthenticated, logout, authenticate, user, Moralis, setUserData } =
    useMoralis();
  const endOfMessagesRef = useRef(null);
  const [message, setMessage] = useState("");
  const [userprofile, setuserprofile] = useState("");
  const [username, setusername] = useState("");

  // useEffect(() => {
  // if (messageEl) {
  //   messageEl.current.addEventListener("DOMNodeInserted", (event) => {
  //     const { currentTarget: target } = event;
  //     target.scroll({ top: target.scrollHeight, behavior: "smooth" });
  //   });
  // }
  // }, []);

  const { data } = useMoralisQuery(
    "Messages",
    (query) =>
      query
        .ascending("createdAt")
        .greaterThan(
          "createdAt",
          new Date(Date.now() - 1000 * 60 * MINS_DURATION)
        ),
    [],
    {
      live: true,
    }
  );

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();
    messages
      .save({
        message: message,
        username: props.name,
        ethAddress: user.get("ethAddress"),
        avatar: props.avatar,
      })
      .then(
        (message) => {},
        (error) => {
          console.log(error.message);
        }
      );
    // endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    // messageEl.current.addEventListener("DOMNodeInserted", (event) => {
    //   const { currentTarget: target } = event;
    //   target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    // });
    setMessage("");
  };

  const onChangeUserName = () => {
    if (username === "") {
      return;
    }
    setUserData({
      username: username,
    }).then((res) => {
      setusername("");
    });
  };

  useEffect(() => {
    if (messageEl) {
      messageEl?.current?.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  if (!isAuthenticated) {
    // alert("not authenticated");
    return (
      <button
        onClick={authenticate}
        className="bg-blue-600 items-center space-x-4 flex rounded-full px-8 py-2 text-white item-center m-auto mt-6 "
      >
        LOGIN TO CHAT
      </button>
    );
  }
  // useEffect(() => {
  //   const generateDummyMessage = () => {
  //     setInterval(() => {
  //       setMessages((prevMsg) => [...prevMsg, generateMessage()]);
  //     }, 2000);
  //   };
  //   generateDummyMessage();
  // }, []);
  return (
    <div
      class={`opacity-0 ${
        props.isopen ? "transition opacity-100" : "opacity-0"
      }`}
    >
      <div class="fixed bottom-0 right-0 max-w-[340px] mx-auto bg-[#182030]  shadow-2xl rounded-lg">
        <header class="pt-6 pb-2 px-5 border-b border-gray-900">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <div class="pr-1">
                <a
                  class="inline-flex text-gray-800 hover:text-gray-900"
                  href="#0"
                >
                  <div class="text-[18px] text-white font-bold">
                    {props.spacename}
                  </div>
                </a>

                <div className="mt-2">
                  <Input
                    style={{ width: "13rem" }}
                    clearable
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    // placeholder={`Enter a Message ${user.getUsername()}`}
                    contentRightStyling={false}
                    placeholder="Type your message..."
                    contentRight={
                      <SendButton onClick={sendMessage}>
                        <SendIcon />
                      </SendButton>
                    }
                  />
                </div>
              </div>
            </div>
            {/* <div class="relative inline-flex flex-shrink-0"></div> */}
          </div>
          <div class="flex flex-wrap justify-center sm:justify-start space-x-4"></div>
        </header>
        <div class="py-3 px-5">
          <div class="text-[16px] font-bold">Chats</div>
          <div
            ref={messageEl}
            class="divide-y divide-gray-900 h-72 overflow-y-scroll "
          >
            {data.map((message) => (
              <button class="w-full text-left py-2 overflow-y-scroll focus:outline-none focus-visible:bg-indigo-50">
                <div class="flex items-center">
                  <img
                    class="rounded-full items-start flex-shrink-0 mr-3"
                    src={message.get("avatar")}
                    width="32"
                    height="32"
                  />
                  <div>
                    <div class="text-[15px] font-bold">
                      {message.get("username")}
                    </div>
                    <div class="text-[13px]">{message.get("message")}</div>
                    {/* <div ref={endOfMessagesRef}></div> */}
                    {/* <div ref={messageEl}></div> */}
                  </div>
                  {/* <div ref={endOfMessagesRef}><div /> */}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
