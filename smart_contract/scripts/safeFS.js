// this module use for read and write from json

const fs = require("fs");
function currentDir(path) {
    return __dirname + "/" + path;
}

async function writeJson(path, jsonData) {
    let txt = JSON.stringify(jsonData);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, txt, function (err) {
            if (err) {
                throw err;
            }
            console.log("The file was saved!");
        });
    });
}

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                console.warn("can't read open and read file " + path);
                resolve(null);
            }
            else {
                resolve(data);
            }
        });
    });
}

async function readJson(path) {
    let data = (await read(path));
    if (data === null)
        return null;
    return JSON.parse(data);
}

async function loadObject(path, objectData) {
    let data = await readJson(path);
    if (data === null)
        return {};
    let newData = {};
    let keys = Object.keys(objectData);
    for (let key of keys) {
        let objectValue = data[key];
        if (objectValue === undefined || objectValue === null) {
            if (data[key] === true) {
                throw key + " can't be null";
            }
            objectValue = null;
        }
        newData[key] = objectValue;
    }
    return newData;
}


module.exports["read"] = read;
exports["read"] = read;
exports["currentDir"] = currentDir;
exports["loadObject"] = loadObject;
exports["readJson"] = readJson;
exports["writeJson"] = writeJson;