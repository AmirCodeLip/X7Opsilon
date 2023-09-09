const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers;
  const lock = await ethers.deployContract("ContractLogic");

  await lock.waitForDeployment();

  console.log(lock.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//npx hardhat run scripts/deploy.js --network polygonedge