const { deploy } = require("./setup")
const { expect } = require("chai");
// const { ethers } = require("hardhat");
const { v4: uuidv4, validate: uuidValidate } = require('uuid');


describe("ContractLogic", function () {
    var contractLogic, directoryRepository, uniqueIdGenerator, fileStatementRepository, rootId;
    var deployed;
    let fileStatementId = uuidv4();

    before(async () => {
        deployed = await deploy();
        fileStatementRepository = deployed.fileStatementRepository.contract;
        contractLogic = deployed.contractLogic.contract;
        directoryRepository = deployed.directoryRepository.contract;
        uniqueIdGenerator = deployed.uniqueIdGenerator.contract;
        await contractLogic.getOrCreateRoot()
    });
    it("make new directory", async function () {
        await directoryRepository.getOrCreateRoot("0x1E3Aa68c176f9BBd4bA6cd15C84895E2a5008D7b");
    });
    it("check exist root", async function () {

        var result = (await contractLogic.getRoot());
        //check if is null
        expect(result[0]).to.be.equal(false);
        let root = result[1];
        rootId = root[0];
        expect(root[1]).to.be.equal("root");
    })

    it("add file and directory", async function () {
        await contractLogic.createDirectory("test", rootId);
        await contractLogic.addFileStatement(rootId, fileStatementId, "test.txt");
    });
    it("is test", async function () {
        //null statement
        let test = await fileStatementRepository.getById("Test");
        let fileStatement = await fileStatementRepository.getById(fileStatementId);
    })
    it("check directory data", async function () {
        let directoryData = await contractLogic.getDirectoryData(rootId);
        let directoryFrames = directoryData[0];
        let fileOutputs = directoryData[1];
        let directoryInfoFrames = directoryData[2];
        let firstDirectory = directoryData[0][0];
        ///to do file uploading is removed test after fix
        // let firstFile = directoryData[1][0];
        let filesCount = parseInt(directoryInfoFrames[1]);
        let directoriesCount = parseInt(directoryInfoFrames[2]);
        // let fileName = firstFile[1];
        let directoryName = firstDirectory[2];
        // expect(filesCount).to.be.equal(1);
        expect(directoriesCount).to.be.equal(1);
        expect(directoryName).to.be.equal("test");
        // expect(fileName).to.be.equal("test");
    });

});