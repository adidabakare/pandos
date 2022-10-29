import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import Layout from "./Layout";
import FileViewer from "react-file-viewer";
import { Progress } from "@nextui-org/react";
import { AuthContext } from "../utils/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const [bio, setbio] = useState("");
  const [name, setname] = useState("");
  const {
    address,
    signer,
    contract,
    provider,
    chainId,
    web3Provider,
    connect,
    disconnect,
  } = useContext(AuthContext);
  console.log("address", address);
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

  const [file, setFile] = useState("");
  const [filetype, setfiletype] = useState("");
  const [filesize, setfilesize] = useState("");
  const [isfileuploading, setisfileuploading] = useState(false);

  const onError = (err) => {
    console.log("Error:", err); // Write your own logic
  };

  async function onChange(e) {
    setisloading(true);
    const file = e.target.files[0];
    console.log(file);
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

  function getExtension() {
    return filetype.split(".").pop();
  }

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  const onUploadFile = async () => {
    if (file == "" || name == "" || bio == "") {
      alert("all fields required");
      return;
    }
    setisfileuploading(true);
    let transaction = await signer.createProfile(file, bio, name);
    let txReceipt = await transaction.wait();
    const [transferEvent] = txReceipt.events;
    console.log(transferEvent);
    setbio("");
    setname("");
    setisfileuploading(false);
    setFile("");
    notify("User Profile added Successfully");
  };

  return (
    <Layout>
      <Toaster />

      <div className="flex flex-row justify-between my-9 items-center">
        <div className="  hidden lg:flex lex-row font-Montserrat items-center space-x-5 text-2xl">
          <p className="text-lg font-Montserrat">Create Profile</p>
        </div>
      </div>

      <div class="flex items-center justify-center w-full">
        <div class=" w-full">
          <div class="mb-5">
            <label for="text" className="pb-5">
              Name
            </label>
            <input
              type="text"
              name="text"
              id="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="name"
              className="w-full rounded-md border  bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label for="email" className="pb-5">
              Bio
            </label>

            <textarea
              type="text"
              name=""
              value={bio}
              onChange={(e) => {
                setbio(e.target.value);
              }}
              id=""
              placeholder="bio"
              className="w-full rounded-md border  bg-[#16181c] py-3 px-6 text-base font-medium text-white outline-none focus:shadow-md"
            ></textarea>
          </div>

          <div class="max-w-full mb-6">
            <label for="email" className="pb-5 mb-2">
              Profile Image
            </label>

            <label class="flex justify-center w-full h-32 px-4 transition bg-white dark:bg-[#16181c] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
