import React, { useState, useContext, useEffect } from "react";
import Layout from "./Layout";
import AlbumCover1 from "../assets/img/nft7.jpeg";
import AlbumCover2 from "../assets/img/bee.webp";
import Blacko from "../assets/img/Black-Sherif-album-cover.png";
import { Badge } from "@nextui-org/react";
import { AuthContext } from "../utils/AuthProvider";
import { ethers } from "ethers";
import { ellipseAddress } from "../lib/utilities";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import NavMobile from "./NavMobile";
import { Link, useParams } from "react-router-dom";
const Artist = () => {
  const [active, setactive] = useState(1);
  const [album, setAlbums] = useState([]);
  const [myassets, setnfts] = useState([]);
  const [userinfo, setuserinfo] = useState({
    balance: 0,
  });
  const [visible2, setVisible2] = React.useState(false);
  const [amount, setamount] = useState("");
  const [isloading, setisloading] = useState(false);
  const [userid, setuserid] = useState("");
  const { id } = useParams();

  console.log(id);
  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);
  const tabs = [
    { id: 1, name: "Music", icon: "musical-note-outline" },
    { id: 2, name: "Podcast", icon: "mic-outline" },
    { id: 3, name: "NFT", icon: "color-palette-outline" },
    // { id: 4, name: "Assets", icon: "library-outline" },
    // { id: 5, name: "Sell NFT", icon: "wallet-outline" },
    // { id: 6, name: "Dashboard", icon: "apps-outline" },
  ];

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  async function loadAlbums() {
    const userAlbum = await signer?.getAlbums();
    let userAlbum_ = userAlbum.filter(
      (items) => items?.music?.artist?.artistId?.toString() == id
    );

    console.log(
      "filtered album ",
      userAlbum[0]?.music?.artist?.artistId?.toString()
    );

    const filt = userAlbum_?.filter((items) => items.isPodcast === true);
    if (active == 2) {
      setAlbums(filt);
    } else if (active == 1) {
      setAlbums(userAlbum_?.filter((items) => items.isPodcast === false));
    }
  }

  async function loadNFT() {
    const data = await signer?.fetchItemsListed();
    setnfts(data);
  }

  async function getUserInfo() {
    const data = await signer?.getSingleUser();
    setuserinfo(data);
  }

  const onTipUser = async () => {
    const amount_ = ethers.utils.parseUnits(amount, "ether");
    let transaction = await signer.tipUser(userid, {
      value: amount_,
    });
    setisloading(true);
    let txReceipt = await transaction.wait();
    setisloading(false);
    setVisible2(false);

    notify("Transaction Completed Successfully");
  };

  useEffect(() => {
    loadAlbums();
    loadNFT();
    getUserInfo();
  }, [signer, active, isloading]);

  return (
    <div>
      <Layout>
        <Toaster />

        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible2}
          onClose={closeHandler2}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Enter an amount <Text b size={18}></Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              required
              value={amount}
              onChange={(e) => {
                setamount(e.target.value);
              }}
              placeholder="Enter amount(eth)"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler2}>
              Close
            </Button>
            <Button
              auto
              onClick={() => {
                setuserid(userinfo?.artistId?.toString());
                onTipUser();
              }}
            >
              {isloading ? (
                <Loading size="xs" color="white" className="pr-4" />
              ) : (
                ""
              )}
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="relative">
          <div className=" flex flex-col justify-end items-end mt-3 lg:hidden">
            <NavMobile />
          </div>
          <div className=" bg-gray-900 mt-8 relative rounded-2xl w-full  bg-opacity-10 ring-1 ring-white ring-opacity-20 backdrop-blur-lg ">
            <img
              src={AlbumCover1}
              className="object-cover rounded-2xl h-56 w-full"
            />
          </div>

          <img
            src={userinfo?.image}
            className="object-cover absolute -bottom-5 rounded-full h-20 w-20 ring-4 ring-gray-800 left-1/2 -translate-x-1/2  m-auto "
          />
        </div>
        <div className="flex flex-col mt-6 items-center justify-center">
          <Link to="/space-dashboard-profile-edit">
            <Badge color="primary" className="py-2">
              Edit Profile
            </Badge>
          </Link>
          <p className="text-2xl font-bold">{userinfo?.name}</p>
          <div className="flex flex-row space-x-2">
            <div className="w-max my-2 bg-white bg-opacity-10 ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-2xl px-3 py-0.5 m-auto">
              {ellipseAddress(userinfo[2], 4)}{" "}
            </div>
            <div className="w-max my-2 bg-white bg-opacity-10 flex flex-row space-x-2 items-center ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-2xl px-3 py-0.5 m-auto">
              <ion-icon name="wallet-outline" class="text-xl pr-2"></ion-icon>
              {ethers.utils.formatEther(userinfo?.balance?.toString())}
              USD{" "}
            </div>
          </div>
          <Badge
            onClick={() => {
              setVisible2(true);
            }}
            color="secondary"
            className="cursor-pointer py-2"
          >
            Tip User
          </Badge>
        </div>

        <div>
          <div className="flex flex-row items-center justify-center space-x-4 my-4 ">
            {tabs.map((items, index) => (
              <div
                onClick={() => {
                  setactive(items.id);
                }}
                key={index}
                className={`${
                  items.id === active ? "ring-green-400" : " cursor-pointer"
                }  w-max my-2 bg-white bg-opacity-10 flex flex-row space-x-2 items-center ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-xl px-3 py-0.5 cursor-default `}
              >
                <ion-icon name={items.icon} class="text-xl pr-2"></ion-icon>
                {items.name}
              </div>
            ))}
          </div>
        </div>

        {active === 1 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-5">
              {album?.map((albums) => (
                <Link
                  to={`/space-dashboard-cover/${albums?.albumId?.toString()}`}
                >
                  <div className="col-auto">
                    <img
                      src={albums?.cover}
                      className="object-cover rounded-2xl h-40"
                    />
                    <p className="text-white pt-2 font-Montserrat text-xl font-bold">
                      {albums?.name}
                    </p>
                    <p className="font-Montserrat text-white text-md">
                      {albums?.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : active === 2 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-5">
              {album?.map((albums) => (
                <Link
                  to={`/space-dashboard-cover/${albums?.albumId?.toString()}`}
                >
                  <div className="col-auto">
                    <img
                      src={albums?.cover}
                      className="object-cover rounded-2xl h-40"
                    />
                    <p className="text-white pt-2 font-Montserrat text-xl font-bold">
                      {albums?.name}
                    </p>
                    <p className="font-Montserrat text-white text-md">
                      {albums?.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : active === 3 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-5">
              {myassets?.map((item) => (
                <div className="col-auto">
                  <img
                    src={item?.image}
                    className="object-cover rounded-2xl h-40"
                  />
                  <p className="text-white pt-2 font-Montserrat text-xl font-bold">
                    {item?.name}
                  </p>
                  <p className="font-Montserrat text-white text-md">
                    {item?.description}
                  </p>
                  <h5 class="text-md font-bold w-9/12 dark:text-white text-white rounded-full px-1 bg-gray-700 ">
                    {ethers.utils.formatEther(item?.price?.toString())}
                    ETH
                  </h5>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </Layout>
    </div>
  );
};

export default Artist;
