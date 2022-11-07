import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useContext, useEffect } from "react";
import AlbumCover1 from "../assets/img/nft7.jpeg";
import AlbumCover2 from "../assets/img/albumC.jpeg";
import AlbumCover3 from "../assets/img/cover3.jpeg";
import AlbumCover4 from "../assets/img/bee.webp";
import Blacko from "../assets/img/Black-Sherif-album-cover.png";
import Player from "./Player";
import { Input, Spacer } from "@nextui-org/react";
import Layout from "./Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NavMobile from "./NavMobile";
import { AuthContext } from "../utils/AuthProvider";
import { Link } from "react-router-dom";

const Podcast = () => {
  const [album, setalbum] = useState([]);
  const [music, setmusic] = useState([]);
  const [artist, setartist] = useState([]);
  const [mId, setmid] = useState(0);
  // console.log(mId);
  // const mId = localStorage.getItem("musicOpenId");
  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);

  window.addEventListener("storage", () => {
    const data = window.localStorage.getItem("musicOpenId");
    setmid(data);
  });

  // console.log(mId);
  async function getAlbum() {
    const album = await contract?.getAlbums();
    setalbum(album.filter((items) => items.isPodcast === true));
  }

  // console.log(album?.music?.artist);
  async function getMusics() {
    const music = await contract?.getArt(3);
    setmusic(
      music.filter((items) => items.isPodcast === true && items.title !== "")
    );
  }

  async function getArtist() {
    const artist = await contract?.fetchAllUsers();
    setartist(artist);
    console.log("artist-----", artist);
  }

  useEffect(() => {
    getAlbum();
    getMusics();
    getArtist();
  }, [contract]);
  return (
    <Layout>
      <div className="flex flex-row justify-between my-8 items-center">
        <div className="  hidden lg:flex lex-row font-Montserrat items-center space-x-5 text-2xl">
          <p className="text-xl font-Montserrat">Podcast</p>
        </div>
        <div>
          <Input clearable bordered placeholder="search" />
        </div>
        <div className="lg:hidden">
          <NavMobile />
        </div>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {album
          ?.map((albums, index) => (
            <SwiperSlide>
              {" "}
              <div className="my-3 relative">
                <img
                  src={albums?.cover}
                  className="object-cover rounded-2xl h-64 w-full"
                />
                <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
                  <div>
                    <h3 class="text-3xl font-Montserrat">{albums?.name}</h3>
                    <p class="text-xl text-gray-300 font-Montserrat">
                      {albums?.music?.artist?.name.toString()}
                    </p>
                  </div>
                  <PlayCircleIcon className="h-12" />
                </div>
                <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
              </div>
            </SwiperSlide>
          ))
          .reverse()}
      </Swiper>

      <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-5">
        {album?.map((albums) => (
          <Link to={`/space-dashboard-cover/${albums?.albumId?.toString()}`}>
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

      <div className="flex  flex-col lg:flex-row w-full lg:space-x-10">
        <div className=" w-full lg:w-6/12">
          <h4 className="font-Montserrat py-5 text-2xl">Popular</h4>
          <div className="h-72 space-y-4 overflow-scroll">
            {music?.map((music_, index) => (
              <div
                className={`${
                  mId == music_?.hash.toString()
                    ? "bg-gradient-to-r from-sky-400 to-[#06bc60] rounded-2xl py-2 px-2 "
                    : ""
                }`}
              >
                {/* <p>{String(mId == music_?.hash.toString())}</p> */}
                {/* <p>{music_?.hash.toString()}</p> */}
                <div
                  onClick={() => {
                    localStorage.setItem("musicurl", JSON.stringify(music));
                    localStorage.setItem("isOpen", true);
                    localStorage.setItem(
                      "musicOpenId",
                      music_?.hash?.toString()
                    );
                    localStorage.setItem("artistName", music_?.artist?.name);
                    localStorage.setItem("musicCover", music_?.cover);
                    localStorage.setItem("musicTitle", music_?.title);
                    window.dispatchEvent(new Event("storage"));
                  }}
                  className={`rounded - 2xl flex  flex-row justify-between items-center`}
                >
                  <div className="flex flex-row space-x-4">
                    <img
                      src={music_?.cover}
                      className="object-cover rounded-2xl h-14 w-14"
                    />
                    <div>
                      <p className="font-Montserrat text-xl text-white">
                        {music_?.artist?.name}
                      </p>
                      <p className="font-Montserrat text-md text-white">
                        {music_?.title}
                      </p>
                    </div>
                  </div>
                  {mId == music_?.hash.toString() ? (
                    <iframe
                      src="https://embed.lottiefiles.com/animation/99300"
                      width={20}
                      height={20}
                    ></iframe>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-6/12">
          <h4 className="font-Montserrat py-5 text-2xl">Artist</h4>
          <div className="h-72 overflow-scroll">
            {artist?.map((artist) => (
              <Link
                to={`/space-dashboard-artist/${artist?.artistId?.toString()}`}
              >
                <div className="flex mb-3 flex-row justify-between items-center">
                  <div className="flex flex-row space-x-4 items-center">
                    <img
                      src={artist?.image}
                      className="object-cover rounded-full h-14 w-14"
                    />
                    <div>
                      <p className="font-Montserrat text-lg text-white">
                        {artist?.name}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-6" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Podcast;
