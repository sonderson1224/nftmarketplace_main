const hre = require("hardhat");
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nFTMarketplace = await NFTMarketplace.deploy();

  await nFTMarketplace.deployed();

  const data = {
    address: nFTMarketplace.address,
    abi: JSON.parse(nFTMarketplace.interface.format("json")),
  };

  fs.writeFileSync("./Context/NFTMarketplace.json", JSON.stringify(data));

  //   console.log(
  //     `deployed contract Address ${nFTMarketplace.address}`
  //   );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
