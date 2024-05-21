// require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
const INFURA_API_KEY = "http://168.119.58.0:8545";
const privateKey = "828df0a64db3064c0bd3da8f840235740ef81aee5ef8fe36b0efe9ff1a927875";
// const privateKey = "290a344f409c5cb60667c2e06ac122de5dbf10771063f70535e204e0d4c7e48f";

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
    deploy_local: {
      gasPrice: 5242880,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      },
      url: "http://127.0.0.1:8545",
      accounts: [
        privateKey,
      ],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 900
      }
    }
  },
};