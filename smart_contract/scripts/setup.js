const { ethers, upgrades } = require("hardhat");

async function singleDeploy(deployData) {
    let config = deployData?.config ?? {};
    let parameters = deployData?.parameters ?? [];
    console.log("\t-----------------------------------------------------------------")
    if (config.address && config.address.length !== 0) {
        console.log("\t" + config.contractName + " is exist with address:", config.address);
        return {
            address: config.address
        }
    }
    else {
        const factory = await ethers.getContractFactory(config.contractName);
        const prosses = await upgrades.deployProxy(factory, parameters, { initializer: 'setup' });
        await prosses.waitForDeployment();
        address = await prosses.getAddress()
        console.log("\t" + config.contractName + " is deployed to:", address);
        return {
            contract: prosses,
            address: address
        };
    }
}

exports["deploy"] = async function deploy(deployConfig = null) {
    if (deployConfig == null) {
        deployConfig = {};
        ["BaseWorks", "IDT2", "UniqueIdGenerator", "DirectoryRepository", "FileRepository", "ContractLogic"].forEach(x => {
            deployConfig[x] = { contractName: x }
        });
    }
    [owner] = await ethers.getSigners();
    const baseWorks = await singleDeploy({
        config: deployConfig?.BaseWorks
    });
    const idt2 = await singleDeploy({
        config: deployConfig?.IDT2
    });
    const uniqueIdGenerator = await singleDeploy({
        config: deployConfig?.UniqueIdGenerator,
        parameters: [idt2.address]
    });
    const directoryRepository = await singleDeploy({
        config: deployConfig?.DirectoryRepository,
        parameters: [uniqueIdGenerator.address, baseWorks.address]
    });
    const fileRepository = await singleDeploy({
        config: deployConfig?.FileRepository,
        parameters: [uniqueIdGenerator.address, baseWorks.address]
    });
    const contractLogic = await singleDeploy({
        config: deployConfig?.ContractLogic,
        parameters: [directoryRepository.address, fileRepository.address]
    });
    return {
        owner: owner,
        contractLogic: contractLogic,
        uniqueIdGenerator: uniqueIdGenerator,
        directoryRepository: directoryRepository,
    }
}

