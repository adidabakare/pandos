const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;

  const Metaspace = await hre.ethers.getContractFactory("Metaspace");
  const metaspace = await Metaspace.deploy();

  // console.log('company address', companyaddress.address);
  await metaspace.deployed();

  txHash = metaspace.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let metaspaceAddress = txReceipt.contractAddress;

  console.log("Metaspace contract address", metaspaceAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
