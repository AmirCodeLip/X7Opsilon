const Math = artifacts.require("Math");
const IDT = artifacts.require("IDT");
const SignedMath = artifacts.require("SignedMath");
const Strings = artifacts.require("Strings");
const GRandom = artifacts.require("GRandom");
const Infrastructure = artifacts.require("Infrastructure");
const X7Opsilon = artifacts.require("X7Opsilon");
// const X7Opsilon = artifacts.require("X7Opsilon");

async function doDeploy(deployer, network) {
    await deployer.deploy(IDT);
    await deployer.link(IDT, GRandom);
    await deployer.deploy(GRandom);
    await deployer.link(IDT, Infrastructure);
    await deployer.deploy(Infrastructure);
    await deployer.deploy(Math);
    await deployer.deploy(SignedMath);
    await deployer.deploy(Strings);
    await deployer.link(IDT, X7Opsilon);
    await deployer.link(GRandom, X7Opsilon);
    await deployer.link(Infrastructure, X7Opsilon);
    await deployer.deploy(X7Opsilon);
    // await deployer.deploy(X7Opsilon);
}

module.exports = (deployer, network) => {
    deployer.then(async () => {
        await doDeploy(deployer, network);
    });
};