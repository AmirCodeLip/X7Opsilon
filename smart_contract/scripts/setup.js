const { upgrades } = require("hardhat");
var safeFS = require("./safeFS.js");
const { ethers } = require("hardhat");

// check the informations from contract to see if the contract is deployed before or not
// if it is just return contract id
async function singleDeploy(deployData, deployer) {
    let info = deployData?.contractData;
    let setupParameters = deployData.setupParameters ?? [];
    const factory = await ethers.getContractFactory(info.contractName, deployer);
    let newResult = async (address, contract) => {
        info.address = address;
        return {
            contractName: info.contractName,
            address: address,
            contract: contract
        };
    }
    console.log("\t-----------------------------------------------------------------")
    if (info.address && info.address.length !== 0) {
        console.log("\t" + info.contractName + " is exist with address:", info.address);
        return await newResult(info.address, null);
    }
    else {
        // const prosses = await upgrades.deployProxy(factory, setupParameters, { initializer: 'setup' });
        let prosses = await (factory).deploy(...setupParameters);
        // await prosses.waitForDeployment();
        address = await prosses.getAddress();
        console.log("\t" + info.contractName + " is deployed to:", address);
        return await newResult(address, prosses);
    }
}

const contractNames = {
    FileStatementRepository: "FileStatementRepository",
    BaseWorks: "BaseWorks",
    IDT2: "IDT2",
    UniqueIdGenerator: "UniqueIdGenerator",
    DirectoryRepository: "DirectoryRepository",
    ContractLogic: "ContractLogic",
    FileRepository: "FileRepository"
}

async function getContactFileData() {
    let contactInformationsPath = safeFS.currentDir("jsons/contactInformations.json");
    let data = await safeFS.readJson(contactInformationsPath);
    if (data === null) {
        data = {};
        Object.keys(contractNames).forEach(x => {
            data[x] = { contractName: x }
        });
    }
    return {
        data: data,
        save() {
            safeFS.writeJson(contactInformationsPath, data);
        }
    };
}

exports["deploy"] = async function deploy() {
    let contactFileData = await getContactFileData();
    // if (deployConfig == null) {
    //     deployConfig = {};
    //     ["BaseWorks", "IDT2", "UniqueIdGenerator", "DirectoryRepository", "FileRepository", "ContractLogic"].forEach(x => {
    //         deployConfig[x] = { contractName: x }
    //     });
    // }
    [owner] = await ethers.getSigners();
    let baseWorksResult = await singleDeploy({
        contractData: contactFileData.data[contractNames.BaseWorks],
        setupParameters: []
    }, owner);
    const idt2 = await singleDeploy({
        contractData: contactFileData.data[contractNames.IDT2]
    });
    const uniqueIdGenerator = await singleDeploy({
        contractData: contactFileData.data[contractNames.UniqueIdGenerator],
        setupParameters: [idt2.address]
    });
    const directoryRepository = await singleDeploy({
        contractData: contactFileData.data[contractNames.DirectoryRepository],
        setupParameters: [uniqueIdGenerator.address, baseWorksResult.address]
    });
    const fileRepository = await singleDeploy({
        contractData: contactFileData.data[contractNames.FileRepository],
        setupParameters: [uniqueIdGenerator.address, baseWorksResult.address]
    });
    const fileStatementRepository = await singleDeploy({
        contractData: contactFileData.data[contractNames.FileStatementRepository],
        setupParameters: [baseWorksResult.address]
    });
    const contractLogic = await singleDeploy({
        contractData: contactFileData.data[contractNames.ContractLogic],
        setupParameters: [directoryRepository.address, fileRepository.address, fileStatementRepository.address]
    });
    contactFileData.save();
    return {
        owner: owner,
        contractLogic: contractLogic,
        uniqueIdGenerator: uniqueIdGenerator,
        directoryRepository: directoryRepository,
        fileStatementRepository: fileStatementRepository
    }
}