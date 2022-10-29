/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer");
const fs = require("fs");
const privateKey = fs.readFileSync("secret.txt").toString();

const projectId = "xxx";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      allowUnlimitedContractSize: true,
      accounts: [privateKey],
    },
    testnet: {
      url: "https://eth.bd.evmos.dev:8545",
      accounts: [privateKey],
    },
    matic: {
      url: "https://boldest-soft-liquid.matic-testnet.discover.quiknode.pro/d62ffe0ea3882f65089fb15568ed7d69f2ac248",
      accounts: [privateKey],
    },
    mainet: {
      url: `https://palm-mainnet.infura.io/v3/${projectId}`,
    },
    kovan: {
      url: "https://kovan.infura.io/v3/745fcbe1f649402c9063fa946fdbb84c",
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
      // network_id: 42,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
};
