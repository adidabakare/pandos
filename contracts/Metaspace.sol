// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Metaspace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private albumCount;
    Counters.Counter private musicCount;
    Counters.Counter private userCount;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    AggregatorV3Interface internal eth_usd_price_feed;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string name;
        string description;
        string image;
    }

    struct Album {
        uint256 albumId;
        string name;
        string cover;
        string title;
        string description;
        Music music;
        bool isPodcast;
    }
    struct Music {
        uint256 musicId;
        string hash;
        uint256 albumId;
        Artist artist;
        string cover;
        string title;
        bool isPodcast;
    }

    struct Artist {
        uint256 artistId;
        string name;
        address payable _address;
        uint256 balance;
        string image;
        string profile;
        string coverImage;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address => bool) public isRegistered;

    mapping(uint256 => Album) public album;
    mapping(address => uint256) public UserAlbumCount;
    mapping(address => mapping(uint256 => Album)) UserAlbum;

    // mapping(uint256 => Music) public music;
    mapping(uint256 => mapping(uint256 => Music)) music;
    mapping(address => mapping(uint256 => uint256)) public UserMusicCount;
    mapping(uint256 => mapping(uint256 => Music)) UserMusic;

    mapping(uint256 => Artist) public artist;

    mapping(address => Artist) public artistSingle;

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
        eth_usd_price_feed = AggregatorV3Interface(
            0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676
        );
    }

    //get EthUsd
    function getEthUsd() public view returns (uint256) {
        // (, int256 price, , , ) = eth_usd_price_feed.latestRoundData();
        (, int256 price, , , ) = eth_usd_price_feed.latestRoundData();
        // return price;
    }

    //without validdation
    function createAlbum(
        string memory _albumName,
        string memory _albumCover,
        string memory _title,
        string memory _description,
        bool _isPodcast
    ) public {
        UserAlbumCount[msg.sender] = UserAlbumCount[msg.sender] + 1;
        albumCount.increment();

        Album storage _album = album[albumCount.current()];
        Album storage _userAlbum_ = UserAlbum[msg.sender][
            UserAlbumCount[msg.sender]
        ];
        _album.albumId = albumCount.current();
        _album.name = _albumName;
        _album.cover = _albumCover;
        _album.title = _title;
        _album.description = _description;
        _album.isPodcast = _isPodcast;
        _album.music.artist._address = payable(address(msg.sender));
        _album.music.artist.artistId = userCount.current();
        _userAlbum_.albumId = albumCount.current();
        _userAlbum_.name = _albumName;
        _userAlbum_.cover = _albumCover;
        _userAlbum_.title = _title;
        _userAlbum_.description = _description;

        UserAlbum[msg.sender][UserAlbumCount[msg.sender]] = _userAlbum_;

        album[albumCount.current()] = _album;
    }

    function addArt(
        uint256 _albumId,
        uint256 _artistId,
        string memory _hash,
        string memory _cover,
        bool _isPodcast,
        string memory _title
    ) public {
        musicCount.increment();
        Music storage _music = music[_albumId][musicCount.current()];
        Artist storage _artist = artist[_artistId];
        _music.musicId = musicCount.current();
        _music.artist._address = _artist._address;
        _music.artist.balance = _artist.balance;
        _music.artist.coverImage = _artist.coverImage;
        _music.artist.image = _artist.image;
        _music.artist.profile = _artist.profile;
        _music.artist.name = _artist.name;
        _music.hash = _hash;
        _music.cover = _cover;
        _music.title = _title;
        _music.isPodcast = _isPodcast;

        // _userMusic_.musicId = musicCount.current();
        // _userMusic_.artist._address = _artist._address;
        // _userMusic_.artist.balance = _artist.balance;
        // _userMusic_.artist.coverImage = _artist.coverImage;
        // _userMusic_.artist.image = _artist.image;
        // _userMusic_.artist.profile = _artist.profile;
        // _userMusic_.artist.name = _artist.name;
        // _userMusic_.hash = _hash;
        // _userMusic_.cover = _cover;
        // _userMusic_.isPodcast = _isPodcast;

        music[_albumId][musicCount.current()] = _music;
        // UserMusic[_albumId][UserMusicCount[msg.sender][_albumId]] = _userMusic_;
    }

    function getAlbums() public view returns (Album[] memory) {
        uint256 itemCount = albumCount.current();
        uint256 currentIndex = 0;
        Album[] memory _album = new Album[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            Album storage currentItem = album[currentId];
            _album[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _album;
    }

    //get Art
    function getArt(uint256 _albumId) public view returns (Music[] memory) {
        uint256 itemCount = musicCount.current();
        uint256 currentIndex = 0;
        Music[] memory _music = new Music[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            Music storage currentItem = music[_albumId][currentId];
            _music[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _music;
    }

    //get user albums
    function getUserAlbums() public view returns (Album[] memory) {
        uint256 itemCount = UserAlbum[msg.sender][UserAlbumCount[msg.sender]]
            .albumId;
        uint256 currentIndex = 0;
        Album[] memory _album = new Album[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            Album storage currentItem = album[currentId];
            _album[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _album;
    }

    function createProfile(
        string memory _image,
        string memory _profile,
        string memory _name
    ) public {
        userCount.increment();

        Artist storage _artist = artist[userCount.current()];

        //userProfile
        _artist.artistId = userCount.current();
        _artist.image = _image;
        _artist.name = _name;
        _artist.profile = _profile;

        _artist._address = payable(address(msg.sender));
        isRegistered[msg.sender] = true;
        artistSingle[msg.sender] = _artist;
        artist[userCount.current()] = _artist;
    }

    //get users
    function fetchAllUsers() public view returns (Artist[] memory) {
        uint256 itemCount = userCount.current();
        uint256 currentIndex = 0;
        Artist[] memory _artist = new Artist[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            Artist storage currentItem = artist[currentId];
            _artist[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _artist;
    }

    //tipUser
    function tipUser(uint256 id) public payable {
        Artist storage _artist = artist[id];
        _artist._address.transfer(msg.value);
        _artist.balance = _artist.balance + msg.value;
        artist[id] = _artist;
    }

    //tipUserSpace
    function tipUserSpace(address useraddress_) public payable {
        payable(address(useraddress_)).transfer(msg.value);
    }

    //getsingleuser
    function getSingleUser() public view returns (Artist memory) {
        return artistSingle[msg.sender];
    }

    function setRegistered() public {
        isRegistered[msg.sender] = true;
    }

    function isRegisteredFunc() public view returns (bool) {
        if (isRegistered[msg.sender] == true) {
            return true;
        } else {
            return false;
        }
    }

    //NFT functions

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price,
        string memory _name,
        string memory _description,
        string memory _image
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price, _name, _description, _image);
        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        string memory _name,
        string memory _description,
        string memory _image
    ) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            _name,
            _description,
            _image
        );

        _transfer(msg.sender, address(this), tokenId);
    }

    /* allows someone to resell a token they have purchased */
    // function resellToken(uint256 tokenId, uint256 price) public payable {
    //     require(
    //         idToMarketItem[tokenId].owner == msg.sender,
    //         "Only item owner can perform this operation"
    //     );
    //     require(
    //         msg.value == listingPrice,
    //         "Price must be equal to listing price"
    //     );
    //     idToMarketItem[tokenId].sold = false;
    //     idToMarketItem[tokenId].price = price;
    //     idToMarketItem[tokenId].seller = payable(msg.sender);
    //     idToMarketItem[tokenId].owner = payable(address(this));
    //     _itemsSold.decrement();

    //     _transfer(msg.sender, address(this), tokenId);
    // }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    // function fetchMyNFTs() public view returns (MarketItem[] memory) {
    //     uint256 totalItemCount = _tokenIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == msg.sender) {
    //             itemCount += 1;
    //         }
    //     }

    //     MarketItem[] memory items = new MarketItem[](itemCount);
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == msg.sender) {
    //             uint256 currentId = i + 1;
    //             MarketItem storage currentItem = idToMarketItem[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return items;
    // }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
