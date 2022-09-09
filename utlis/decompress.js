const gunzip = require("gunzip-file");
var targz = require("targz");
let basePath = "./temp/";

function unzipGzFile(fileName, destination) {
  return new Promise((resolve, _) => {
    gunzip(basePath + fileName, basePath + destination, () => {
      resolve();
    });
  });
}

function unzipTarGzFile(fileName) {
  return new Promise((resolve, reject) => {
    targz.decompress(
      {
        src: "./" + basePath + fileName,
        dest: "./" + basePath,
      },
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

module.exports = {
  unzipGzFile,
  unzipTarGzFile,
};
