// this module use for read and write from json
import { readFile, writeFile } from 'fs';
function currentDir(path: string) {
    return __dirname + "/" + path;
}

async function writeJson(path: string, jsonData: object) {
    let txt = JSON.stringify(jsonData);
    return new Promise((resolve, reject) => {
        writeFile(path, txt, function (err: any) {
            if (err) {
                throw err;
            }
            console.log("The file was saved!");
        });
    });
}

function read(path: string) {
    return new Promise((resolve, reject) => {
        readFile(path, function (err, data) {
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

export async function readJson(path: string) {
    let data = (await read(path)) as any;
    if (data === null)
        return null;
    return JSON.parse(data);
}

async function loadObject(path: string, objectData: object) {
    let data = await readJson(path);
    if (data === null)
        return {};
    let newData: any = {};
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

