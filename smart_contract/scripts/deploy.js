const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers;
  const contractFactory = await ethers.getContractFactory("ContractLogic");
  const contract = contractFactory.attach(
    "0x4ADd1cf81038D78c8b06c93e39B139a326465E48" // The deployed contract address
  );
  // const lock = await ethers.deployContract("ContractLogic");
  const deployed = await contractFactory.deploy();
  await deployed.waitForDeployment();
  console.log(deployed)

  // console.log(lock.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//npx hardhat run scripts/deploy.js --network polygonedge