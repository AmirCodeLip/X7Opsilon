const IDT = artifacts.require("IDT");
const Infrastructure = artifacts.require("Infrastructure");
const ContractLogic = artifacts.require("ContractLogic");
const Strings = artifacts.require("Strings");
const UniqueIdGenerator = artifacts.require("UniqueIdGenerator");

async function doDeploy(deployer, network) {
    ///<---- Strings ---->
    await deployer.deploy(Strings);
    ///<---- IDT ---->
    await deployer.link(Strings, IDT);
    await deployer.deploy(IDT);
    ///<---- UniqueIdGenerator ---->
    await deployer.link(IDT, UniqueIdGenerator);
    await deployer.deploy(UniqueIdGenerator);
    ///<---- Infrastructure ---->
    await deployer.link(IDT, Infrastructure);
    await deployer.deploy(Infrastructure);
    ///<---- ContractLogic ---->
    await deployer.link(IDT, Infrastructure);
    await deployer.deploy(Infrastructure);
    ///<---- ContractLogic ---->
    await deployer.link(IDT, ContractLogic);
    await deployer.link(Strings, ContractLogic);
    await deployer.link(Infrastructure, ContractLogic);
    await deployer.link(UniqueIdGenerator, ContractLogic);
    await deployer.deploy(ContractLogic);
    ///<---- End ContractLogic ---->
}

module.exports = (deployer, network) => {
    deployer.then(async () => {
        await doDeploy(deployer, network);
    });
};