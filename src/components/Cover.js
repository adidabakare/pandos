import React, { useState, useContext, useEffect } from "react";
import { ColorExtractor } from "react-color-extractor";
import Layout from "./Layout";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";

import AlbumCover1 from "../assets/img/nft7.jpeg";
import AlbumCover2 from "../assets/img/bee.webp";
import AlbumCover3 from "../assets/img/cover3.jpeg";
import AlbumCover4 from "../assets/img/bee.webp";
import Blacko from "../assets/img/n3.jpeg";
import { AuthContext } from "../utils/AuthProvider";
import { useParams, Link, useHistory } from "react-router-dom";

const Cover = () => {
  const [colors, setcolors] = useState([]);
  const [color, setcolor] = useState("");
  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);
  const [album, setalbum] = useState([]);
  const [music, setmusic] = useState([]);
  const [musicready, setmusicready] = useState(false);
  const [mId, setmid] = useState(0);

  let { id } = useParams();

  const getColors = (colors) => {
    setcolors(colors);
  };

  // console.log(mId);
  async function getAlbum() {
    const album = await signer?.getAlbums();
    const filt = album.filter(
      (items) => items?.albumId?.toString() == id && items.title !== ""
    );
    const music = await signer?.getArt(filt[0]?.albumId?.toString());
    // console.log(music);
    const musicfilter = music.filter((items) => items?.title !== "");
    setmusic(musicfilter);
    setalbum(filt[0]);
  }

  // console.log(album);

  // console.log(album?.albumId?.toString());

  window.addEventListener("storage", () => {
    const data = window.localStorage.getItem("musicOpenId");
    setmid(data);
  });

  useEffect(() => {
    getAlbum();
  }, [signer]);
  return (
    <>
      <Layout>
        <div
          style={{
            backgroundImage: `linear-gradient(${colors[0]}, ${colors[1]})`,
            // backgroundColor: colors[0],
          }}
          className={`w-full rounded-lg  mt-10`}
        >
          <div className="flex flex-col p-5  items-start md:flex-row md:items-end md:p-10 md:space-x-6">
            <ColorExtractor getColors={getColors}>
              <img
                src={album?.cover}
                className="object-cover shadow-xl rounded-lg h-64 w-64 "
              />
            </ColorExtractor>

            <div>
              <p className="text-lg font-Montserrat">PLAYLIST</p>
              <p className="text-6xl font-extrabold font-Montserrat">
                {album?.name}
              </p>
              <p className="font-Montserrat text-lg">
                {music[0]?.artist?.name}
              </p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-b-xl flex my-2 flex-col mt-4 relative w-full p-6  bg-opacity-40 ring-opacity-20 backdrop-blur-lg ">
            <div>
              <div
                onClick={() => {
                  localStorage.setItem("musicurl", JSON.stringify(music));
                  localStorage.setItem("isOpen", true);
                  localStorage.setItem(
                    "musicOpenId",
                    music[0]?.hash?.toString()
                  );
                  window.dispatchEvent(new Event("storage"));
                }}
                className="bg-green-500 flex flex-row items-center justify-center rounded-full w-14 h-14"
              >
                {mId == music[0]?.hash.toString() ? (
                  <ion-icon name="pause" class="text-3xl"></ion-icon>
                ) : (
                  <ion-icon name="play" class="text-3xl"></ion-icon>
                )}
              </div>

              <div>
                <div className="mt-4 font-Montserrat">
                  <h2
                    id="rex"
                    className="heading my-7 text-2xl font-Montserrat"
                  >
                    Here are some from the album
                  </h2>
                  {music?.map((music_, index) => (
                    <div
                      onClick={() => {
                        localStorage.setItem("musicurl", JSON.stringify(music));
                        localStorage.setItem("isOpen", true);
                        localStorage.setItem(
                          "musicOpenId",
                          music_?.hash?.toString()
                        );
                        window.dispatchEvent(new Event("storage"));
                      }}
                      className="flex items-start transform   transition-transform duration-300"
                    >
                      <div className="flex items-start mb-7  w-full pr-8 truncate overflow-hidden">
                        <div className="sm:w-12 sm:h-12 overflow-hidden rounded-full">
                          <img
                            src={music_?.cover}
                            className="object-cover shadow-xl rounded-full h-14 w-14 "
                          />
                        </div>
                        <div className="ml-4 truncate">
                          <h4 className="font-Montserrat pb-0 mb-0 text-lg text-gray-100 hover:text-white truncate">
                            {music_?.title}
                          </h4>
                          <h3 className="font-Montserrat text-sm text-gray-200 truncate">
                            {music_?.artist?.name}
                          </h3>
                        </div>
                      </div>
                      <div>
                        {mId == music_?.hash.toString() ? (
                          <iframe
                            src="https://embed.lottiefiles.com/animation/99300"
                            width={20}
                            height={20}
                          ></iframe>
                        ) : (
                          <a target="blank">
                            <ion-icon
                              name="play-circle-outline"
                              class="text-2xl text-white transform hover:scale-150 transition-transform duration-300"
                            ></ion-icon>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {colors.map((color) => (
          <div
            className={`w-16 h-16 `}
            style={{ backgroundColor: color }}
          ></div>
        ))} */}
      </Layout>
    </>
  );
};

export default Cover;
