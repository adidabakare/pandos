import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import AlbumCover1 from "../assets/img/nft7.jpeg";
import afro from "../assets/genres/afro.jpeg";
import disco from "../assets/genres/disco.jpeg";
import electro from "../assets/genres/electro.jpeg";
import funk from "../assets/genres/funk.jpeg";
import raggae from "../assets/genres/reggae.jpeg";
import rock from "../assets/genres/rock.jpeg";
import pop from "../assets/genres/pop.png";
import hiphop from "../assets/genres/hiphop.jpeg";
import music from "../assets/img/music.jpg";
import podcast from "../assets/img/podcast.jpg";
import { Input, Spacer } from "@nextui-org/react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import NavMobile from "./NavMobile";
const Categories = () => {
  return (
    <Layout>
      <div className="flex flex-row justify-between my-8 items-center">
        <div className="  hidden lg:flex lex-row font-Montserrat items-center space-x-5 text-2xl">
          <p className="text-xl font-Montserrat">Genres</p>
        </div>
        <div>
          <Input clearable bordered placeholder="search" />
        </div>
        <div className="lg:hidden">
          <NavMobile />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-5">
        <div className="my-3 relative">
          <Link to="/space-dashboard-music">
            <img src={music} className="object-cover rounded-2xl h-64 w-full" />
            <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
              <div>
                <h3 class="text-3xl text-white font-Montserrat">Music</h3>
                <p class="text-xl text-gray-300 font-Montserrat">
                  Listen to good music
                </p>
              </div>
            </div>
          </Link>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <Link to="/space-dashboard-podcast">
            <img
              src={podcast}
              className="object-cover rounded-2xl h-64 w-full"
            />
            <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
              <div>
                <h3 class="text-3xl text-white font-Montserrat">Podcast</h3>
                <p class="text-xl text-gray-300 font-Montserrat">
                  Listen to good podcast
                </p>
              </div>
            </div>
          </Link>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-5">
        <div className="my-3 relative">
          <img src={hiphop} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#HipHop</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={afro} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#AfroMusic</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={rock} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#Rock</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={raggae} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#Reggae</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={funk} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#Funk</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={disco} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#Disco</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={pop} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#K-Pop</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
        <div className="my-3 relative">
          <img src={electro} className="object-cover rounded-2xl h-40" />
          <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
            <div>
              <h3 class="text-3xl font-Montserrat">#Electro</h3>
            </div>
          </div>
          <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
