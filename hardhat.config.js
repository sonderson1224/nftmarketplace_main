require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config({ path: "config.env" });
// import { Network, Alchemy } from "alchemy-sdk";
// require('@nomiclabs/hardhat-waffle');
const fs = require("fs");
const { API_URL, PRIVATE_KEY } = process.env;

// const settings = {
//   apiKey: "Hfef5ywXzB65RxQDpFaYD_BaEIWW7-NC",
//   network: Network.ETH_SEPOLIA,
//   gasPrice: 3000000000,
// };

// const alchemy = new Alchemy(settings)

// Contract address = 0x564DE9c0a08BC5A3569CdAAFC82069Bd044872e0
// console.log("process", process.env)
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: process.env.API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    goerli: {
      url: process.env.GEORLI_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
