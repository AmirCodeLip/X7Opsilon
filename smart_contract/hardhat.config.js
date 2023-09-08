require("@nomicfoundation/hardhat-toolbox");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const INFURA_API_KEY = "http://95.216.141.40:10002/";
const privateKey = "f28e873541b1c742e8b54f7da936ff993a1cc234efa7cfc11216f578c474397f";
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
