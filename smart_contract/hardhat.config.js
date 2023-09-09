require("@nomicfoundation/hardhat-toolbox");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const INFURA_API_KEY = "http://95.216.141.40:10002/";
const privateKey = "828df0a64db3064c0bd3da8f840235740ef81aee5ef8fe36b0efe9ff1a927875";
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
