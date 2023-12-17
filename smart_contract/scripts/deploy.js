const { deploy } = require("./setup")

var fs = require('fs');
var deployconfig;
console.clear();

function readJson(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            jsonData = JSON.parse(data);
            resolve(jsonData);
        });
    });
}

readJson('./scripts/deployconfig.json').then(deployconfig => {
    deploy(deployconfig).catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
});

