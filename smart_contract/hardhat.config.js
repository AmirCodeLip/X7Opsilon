require("@nomicfoundation/hardhat-toolbox");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const INFURA_API_KEY = "http://168.119.58.0:8545";
const privateKey = "290a344f409c5cb60667c2e06ac122de5dbf10771063f70535e204e0d4c7e48f";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    polygonedge: {
      gasPrice: 5242880,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      },
      url: INFURA_API_KEY,
      accounts: [
        privateKey,
      ],
    },
  },
  solidity: "0.8.17",
};
