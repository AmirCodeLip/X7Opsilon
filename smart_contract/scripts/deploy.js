const hardhat = require("hardhat");
async function main() {
  const ContractLogic = await hardhat.ethers.getContractFactory('ContractLogic');
  const cl = await ContractLogic.deploy();
  console.log('Box deployed to:', cl.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
