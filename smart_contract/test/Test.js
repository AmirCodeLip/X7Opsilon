
const { expect } = require("chai");
const { ethers } = require("hardhat");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

describe("ContractLogic", function () {
    var contractLogic, rootId;

    before(async () => {
        [owner] = await ethers.getSigners();
        const ContractLogic = await ethers.getContractFactory("ContractLogic");
        contractLogic = await ContractLogic.deploy();
    });

    it("must return root folder", async function () {
        await expect(contractLogic.getOrCreateRoot())
            .to.emit(contractLogic, "RootResult")
            .withArgs(x => {
                rootId = x;
                return true;
            }, owner.address);
    });

    it("must create new directory", async function () {
        await expect(contractLogic.createDirectory("test", rootId))
            .to.emit(contractLogic, "DirectoryCreated")
            .withArgs(directoryId => {
                return directoryId.length == 55;
            }, rootId);
    });

    it("must upload new file", async function () {
        let fileId = uuidv4();
        await expect(contractLogic.uploadFile(rootId, fileId, "test.txt", "hash of the file"))
            .to.emit(contractLogic, "FileUploaded")
            .withArgs((fileId, directoryId) => {
                return uuidValidate(fileId);
            }, rootId);
    });

    it("must return all directories and files in root", async function () {
        let directoryData = await contractLogic.getDirectoryData(rootId);
        let directories = directoryData[0];
        let files = directoryData[1];
        let fileName = files[0][1];
        let directoryName = directories[0][2];
        expect(directoryName).to.be.equal("test");
        expect(fileName).to.be.equal("test");
    });
});