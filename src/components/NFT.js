import React, { useState, useContext, useEffect } from "react";
import { Input, Spacer, Badge } from "@nextui-org/react";
import Layout from "./Layout";

import { AuthContext } from "../utils/AuthProvider";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ethers } from "ethers";
import { truncateString } from "../lib/utilities";
import NavMobile from "./NavMobile";
const NFT = () => {
  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);
  const [nfts, setnft] = useState([]);
  async function loadNFTS() {
    const nft = await contract?.fetchMarketItems();
    setnft(nft);
  }
  useEffect(() => {
    loadNFTS();
  }, [contract]);

  async function buyNft(nft) {
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    let transaction = await signer.createMarketSale(nft.tokenId, {
      value: nft.price.toString(),
    });
    await transaction.wait();
    alert("NFT purchased");
  }
  return (
    <Layout>
      <div className="flex flex-row justify-between my-8 items-center">
        <div className="  hidden lg:flex lex-row font-Montserrat items-center space-x-5 text-2xl">
          <p className="text-xl font-Montserrat">NFT Marketplace</p>
        </div>
        <div>
          <Input clearable bordered placeholder="search" />
        </div>
        <div className="lg:hidden">
          <NavMobile />
        </div>
      </div>
      <p className="font-Montserrat text-2xl">Recent</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-5">
        {nfts?.map((item, index) => (
          <div className="my-3 relative">
            <img src={item?.image} className="object-cover rounded-2xl h-48" />
            <div class="absolute rounded-b-2xl bottom-0 z-30 flex flex-row justify-between items-center left-0 right-0 px-4 py-2 bg-gradient-to-t w-full from-gray-900">
              <div>
                <h3 class="text-2xl font-Montserrat">{item?.name}</h3>
                <Badge color="error">
                  {ethers.utils.formatEther(item?.price?.toString())}
                  ETH
                </Badge>
                <h3 class="text-lg pb-0 mb-0 font-Montserrat">
                  {truncateString(item?.description, 20)}
                </h3>
                <p
                  onClick={() => buyNft(item)}
                  className="font-Montserrat text-lg cursor-pointer"
                >
                  Place bid
                </p>
                {/* <h3 class="text-2xl font-Montserrat">#HipHop</h3> */}
              </div>
            </div>
            <div className="rounded-b-2xl absolute bottom-0 left-0  bg-gradient-to-t from-gray-900  w-full h-44"></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default NFT;
