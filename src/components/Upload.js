import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { Badge, Button, Input, Modal, Textarea } from "@nextui-org/react";
import Layout from "./Layout";
import RecorderControls from "./recorder-controls";
import useRecorder from "../hooks/useRecorder";
import RecordingsList from "./recordings-list";
import { Collapse, Grid, Text, Progress } from "@nextui-org/react";
import { AuthContext } from "../utils/AuthProvider";
import FileViewer from "react-file-viewer";
import toast, { Toaster } from "react-hot-toast";
import NavMobile from "./NavMobile";

const Upload = () => {
  const [active, setactive] = useState(1);
  const [podcastaudio, setpodcastaudio] = useState("");
  const tabs = [
    { id: 1, name: "Music", icon: "musical-note-outline" },
    { id: 2, name: "Podcast", icon: "mic-outline" },
    { id: 3, name: "NFT", icon: "color-palette-outline" },
  ];

  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;

  window.addEventListener("podcast", () => {
    const data = window.localStorage.getItem("podcastAudio");
    setpodcastaudio(data);
  });
  console.log(podcastaudio);
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);
  const projectId = "2DB3mQQJtzIC03GYarET8tFZJIm";
  const projectSecret = "0dedd8064ff788414096e72cc7e3f4a1";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfsClient = require("ipfs-http-client");
  console.log(auth);
  const ipfs = ipfsClient.create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });

  const [isloading, setisloading] = useState(false);
  const [isloading2, setisloading2] = useState(false);

  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [filetype, setfiletype] = useState("");
  const [filetype2, setfiletype2] = useState("");
  const [filesize, setfilesize] = useState("");
  const [filesize2, setfilesize2] = useState("");
  const [isfileuploading, setisfileuploading] = useState(false);
  const [isfileuploading2, setisfileuploading2] = useState(false);
  const [fileready, setfileready] = useState(false);
  const [fileready2, setfileready2] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [name, setname] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [albumid, setalbumid] = useState("");
  const [musictitle, setmusictitle] = useState("");
  const [users, setusers] = useState({});
  const [price, setprice] = useState("");

  const onError = (err) => {
    console.log("Error:", err); // Write your own logic
  };

  async function onChange(e) {
    setisloading(true);
    const file = e.target.files[0];

    try {
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      console.log(url);
      setFile(url);
      setisloading(false);
      setfiletype(file.name);
      setfilesize(file.size);
      // setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onChange2(e) {
    setisloading2(true);
    const file = e.target.files[0];

    try {
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      console.log(url);
      setFile2(url);
      setisloading2(false);
      setfiletype2(file.name);
      setfilesize2(file.size);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  function getExtension() {
    return filetype.split(".").pop();
  }

  function getExtension2() {
    return filetype2.split(".").pop();
  }

  const onUploadFile = async () => {
    setisfileuploading(true);
    let transaction = await signer.createAlbum(
      name,
      file,
      title,
      description,
      active == 2 ? true : false
    );
    let txReceipt = await transaction.wait();
    const [transferEvent] = txReceipt.events;
    console.log(transferEvent);
    setisfileuploading(false);
    setFile("");
    setname("");
    settitle("");
    setdescription("");
    setfileready(true);
    setVisible(false);
    notify("Album Created Successfully");
  };

  const onUploadMusic = async () => {
    if (musictitle == "" || albumid == "") {
      notifyerror("All fields are required");
      return;
    }
    setisfileuploading2(true);
    console.log(albumid, users?.artistId?.toString(), musictitle);
    let transaction = await signer.addArt(
      albumid,
      users?.artistId?.toString(),
      active == 2 ? podcastaudio : file2,
      users?.image.toString(),
      active == 2 ? true : false,
      musictitle
    );

    let txReceipt = await transaction.wait();
    const [transferEvent] = txReceipt.events;
    setmusictitle("");
    setalbumid("");
    setisfileuploading2(false);
    setFile2("");
    setfileready2(true);
    setVisible(false);
    notify("Audio added Successfully");
  };

  async function loadAlbums() {
    const userAlbum = await signer?.getUserAlbums();
    const filt = userAlbum.filter((items) => items.isPodcast === true);
    console.log(active == 2);
    if (active == 2) {
      setAlbums(filt);
    } else if (active == 3) {
      setAlbums(userAlbum);
    } else {
      setAlbums(userAlbum.filter((items) => items.isPodcast === false));
    }
    console.log("userAlbum ----------", userAlbum);
  }

  async function getSingleUser() {
    const user_ = await signer?.getSingleUser();
    setusers(user_);
  }

  const filterAlbumId = albums.filter(
    (items) => items?.albumId?.toString() == albumid
  );

  const onAddNFT = async () => {
    if (price == "") {
      notifyerror("Price field cant be empty");
      return;
    }
    const price_ = ethers.utils.parseUnits(price, "ether");

    let listingPrice = await signer.getListingPrice();
    listingPrice = listingPrice.toString();
    let transaction = await signer.createToken(
      filterAlbumId[0]?.cover,
      price_,
      filterAlbumId[0]?.name,
      filterAlbumId[0]?.description,
      filterAlbumId[0]?.cover,

      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    setAlbums(false);
    notify("NFT Created Successfully");
  };

  useEffect(() => {
    connect();
    loadAlbums();
    getSingleUser();
  }, [signer, fileready, fileready2, active]);

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  const notifyerror = (msg) =>
    toast.error(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  return (
    <Layout>
      <Toaster />
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add album <Text b size={18}></Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Album Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <Textarea
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />

          <div class="max-w-full mb-6">
            <label class="flex justify-center w-full h-32 px-4 transition bg-white dark:bg-[#16181a] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="font-medium text-gray-600">
                  Click here to select file
                  {/* <span class="text-blue-600 underline">browse</span> */}
                </span>
              </span>
              <input
                type="file"
                name="file_upload"
                class="hidden"
                onChange={onChange}
              />
            </label>
          </div>

          {file && (
            <FileViewer
              fileType={getExtension()}
              filePath={file}
              // errorComponent={CustomErrorComponent}
              onError={onError}
            />
          )}

          {isloading ? (
            <div className="flex flex-row items-center justify-center">
              <Progress
                indeterminated
                value={50}
                color="secondary"
                status="secondary"
              />
            </div>
          ) : (
            ""
          )}

          {file && (
            <div>
              <button
                onClick={() => {
                  onUploadFile();
                }}
                class="hover:shadow-form w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Save{" "}
              </button>
            </div>
          )}
          {isfileuploading ? (
            <Progress
              indeterminated
              value={50}
              color="primary"
              status="primary"
            />
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          {/* <Button auto onClick={closeHandler}>
            Save{" "}
          </Button> */}
        </Modal.Footer>
      </Modal>
      <div className="flex flex-row justify-between my-8 items-center">
        <div className="  hidden lg:flex lex-row font-Montserrat items-center space-x-5 text-2xl">
          <p className="text-lg font-Montserrat">Upload</p>
        </div>
        <div>
          <Input clearable bordered placeholder="search" />
        </div>
        <div className="lg:hidden">
          <NavMobile />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 gap-5">
        {tabs.map((items, index) => (
          <div className="my-5 relative">
            <div
              onClick={() => {
                setactive(items.id);
              }}
              className={`${
                items.id === active
                  ? "ring-green-200 ring-4 ring-opacity-100"
                  : "ring-opacity-100"
              } bg-[#16181c] cursor-pointer py-3 text-center ring right-1 rounded-xl ring-white `}
            >
              <ion-icon
                name={items.icon}
                class="text-3xl text-white"
              ></ion-icon>
              <h3 class="text-2xl font-Montserrat">{items.name}</h3>
            </div>
          </div>
        ))}
      </div>
      {/* <button
        onClick={() => {
          connect();
        }}
      >
        CONNECT
      </button> */}
      {active === 1 ? (
        <>
          <Collapse
            bordered
            subtitle={
              <Badge onClick={handler} color="primary">
                Add album
              </Badge>
            }
            className="font-Montserrat mb-2"
          >
            <Text>
              <div className="grid grid-cols-4 sm:grid-cols-4  gap-5">
                {albums?.map((album, index) => (
                  <div className="relative" key={index}>
                    <img
                      src={album?.cover}
                      className="object-cover rounded-2xl w-full h-36"
                    />
                    <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
                      <div>
                        <h3 class="text-2xl font-Montserrat">{album.name}</h3>
                      </div>
                    </div>
                    <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
                  </div>
                ))}
              </div>
            </Text>
          </Collapse>
          <div class="flex items-center justify-center w-full mb-6">
            <div class=" w-full">
              <div class="mb-5">
                <label for="email" className="pb-3">
                  Song Title{" "}
                </label>
                <input
                  type="text"
                  name="text"
                  id="email"
                  value={musictitle}
                  onChange={(e) => {
                    setmusictitle(e.target.value);
                  }}
                  placeholder="song title"
                  className="w-full mt-2 rounded-xl border  bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
                />
              </div>

              <p className="text-lg font-Montserrat">Select Album</p>

              <select
                id="albums"
                onChange={(e) => {
                  setalbumid(e.target.value);
                }}
                class="bg-gray-50 mb-3 mt-2  border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-[#16181a] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose an album</option>
                {albums?.map((items, index) => (
                  <option value={items.albumId.toString()}>{items.name}</option>
                ))}
              </select>

              <div class="max-w-full mb-6">
                <p className="text-lg font-Montserrat">Upload song</p>
                <label class="flex justify-center w-full h-32 mt-3 px-4 transition bg-white dark:bg-[#16181a] border-2 border-gray-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span class="font-medium text-gray-600">
                      Click here to select file
                      {/* <span class="text-blue-600 underline">browse</span> */}
                    </span>
                  </span>
                  <input
                    type="file"
                    name="file_upload"
                    class="hidden"
                    onChange={onChange2}
                  />
                </label>
              </div>

              {file2 && (
                <FileViewer
                  fileType={getExtension2()}
                  filePath={file2}
                  // errorComponent={CustomErrorComponent}
                  onError={onError}
                />
              )}

              {isloading2 ? (
                <div className="flex flex-row items-center justify-center">
                  <Progress
                    indeterminated
                    value={50}
                    color="secondary"
                    status="secondary"
                  />
                </div>
              ) : (
                ""
              )}

              {file2 && (
                <div>
                  <button
                    onClick={() => {
                      onUploadMusic();
                    }}
                    class="hover:shadow-form w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Save{" "}
                  </button>
                </div>
              )}
              {isfileuploading2 ? (
                <Progress
                  indeterminated
                  value={50}
                  color="primary"
                  status="primary"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : active === 2 ? (
        <>
          <Collapse
            bordered
            subtitle={
              <Badge onClick={handler} color="primary">
                Add Episode
              </Badge>
            }
            className="font-Montserrat"
          >
            {/* <p>{String(podcastAudio)}</p> */}
            <Text>
              <div className="grid grid-cols-4 sm:grid-cols-4  gap-5">
                {albums?.map((album, index) => (
                  <div className="relative" key={index}>
                    <img
                      src={album?.cover}
                      className="object-cover rounded-2xl h-36"
                    />
                    <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
                      <div>
                        <h3 class="text-2xl font-Montserrat">{album.name}</h3>
                      </div>
                    </div>
                    <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
                  </div>
                ))}
              </div>
            </Text>
          </Collapse>
          <div>
            <RecorderControls
              recorderState={recorderState}
              handlers={handlers}
            />
            <RecordingsList audio={audio} />

            <div class="mb-5">
              <label for="email" className="pb-3">
                Podcast Title{" "}
              </label>
              <input
                type="text"
                name="text"
                id="email"
                value={musictitle}
                onChange={(e) => {
                  setmusictitle(e.target.value);
                }}
                placeholder="podcast title"
                className="w-full rounded-xl border mt-3 bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
              />
            </div>

            <select
              id="albums"
              onChange={(e) => {
                setalbumid(e.target.value);
              }}
              class="bg-gray-50 mt-3 mb-3 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-[#16181a] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose an Episode</option>
              {albums?.map((items, index) => (
                <option value={items.albumId.toString()}>{items.name}</option>
              ))}
            </select>

            <div class="max-w-full mb-6">
              <p className="text-lg font-Montserrat">
                Upload episode if already recorded
              </p>
              <label class="flex justify-center mt-3 w-full h-32 px-4 transition bg-white dark:bg-[#16181a] border-2 border-gray-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span class="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span class="font-medium text-gray-600">
                    Click here to select file
                    {/* <span class="text-blue-600 underline">browse</span> */}
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  class="hidden"
                  onChange={onChange2}
                />
              </label>
            </div>
            <button
              onClick={() => {
                onUploadMusic();
              }}
              class="hover:shadow-form w-full rounded-xl mb-14  bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Upload{" "}
            </button>

            {file2 && (
              <FileViewer
                fileType={getExtension2()}
                filePath={file2}
                onError={onError}
              />
            )}

            {isloading2 ? (
              <div className="flex flex-row items-center justify-center">
                <Progress
                  indeterminated
                  value={50}
                  color="secondary"
                  status="secondary"
                />
              </div>
            ) : (
              ""
            )}

            {file2 && (
              <div>
                <button
                  onClick={() => {
                    onUploadMusic();
                  }}
                  class="hover:shadow-form w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Save{" "}
                </button>
              </div>
            )}
            {isfileuploading2 ? (
              <Progress
                indeterminated
                value={50}
                color="primary"
                status="primary"
              />
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div class="flex items-center justify-center w-full">
          <div class=" w-full">
            <Collapse
              bordered
              // title="Albums"
              subtitle={<Badge color="primary">Albums</Badge>}
              className="font-Montserrat mb-4"
            >
              <Text>
                <div className="grid grid-cols-4 sm:grid-cols-4  gap-5">
                  {albums?.map((album, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={album?.cover}
                        className="object-cover rounded-2xl h-36"
                      />
                      <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
                        <div>
                          <h3 class="text-2xl font-Montserrat">{album.name}</h3>
                        </div>
                      </div>
                      <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
                    </div>
                  ))}
                </div>
              </Text>
            </Collapse>

            <select
              id="albums"
              onChange={(e) => {
                setalbumid(e.target.value);
              }}
              class="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-xl mt-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-[#16181a] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a Cover</option>
              {albums?.map((items, index) => (
                <option value={items.albumId.toString()}>{items.name}</option>
              ))}
            </select>
            <div class="mb-5">
              <label for="email" className="pb-3">
                NFT name{" "}
              </label>
              <input
                type="text"
                name="text"
                id="email"
                disabled
                value={filterAlbumId[0]?.name}
                onChange={(e) => {
                  setmusictitle(e.target.value);
                }}
                placeholder="song title"
                className="w-full mt-3 rounded-xl border  bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
              />
            </div>

            <div class="mb-5">
              <label for="email" className="pb-3">
                NFT Description{" "}
              </label>
              <input
                type="text"
                name="text"
                id="email"
                disabled
                value={filterAlbumId[0]?.description}
                onChange={(e) => {
                  setmusictitle(e.target.value);
                }}
                placeholder="song title"
                className="w-full rounded-xl mt-3 border  bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
              />
            </div>

            <div class="mb-5">
              <label for="email" className="pb-3">
                NFT Price{" "}
              </label>
              <input
                type="text"
                name="number"
                id="email"
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                }}
                placeholder="price"
                className="w-full rounded-xl mt-3 border  bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
              />
            </div>

            <label for="email" className="pb-3">
              NFT Image{" "}
            </label>
            <img className="w-40 my-3" src={filterAlbumId[0]?.cover} />
            <div>
              <button
                onClick={() => {
                  onAddNFT();
                }}
                class="hover:shadow-form w-full rounded-xl mb-14 bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Upload{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </Layout>
  );
};

export default Upload;
