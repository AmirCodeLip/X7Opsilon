const ContractLogic = artifacts.require("ContractLogic");
async function doDeploy(deployer, network) {
    await deployer.deploy(ContractLogic);
    ///<---- End ContractLogic ---->
}

module.exports = (deployer, network) => {
    deployer.then(async () => {
        await doDeploy(deployer, network);
    });
};