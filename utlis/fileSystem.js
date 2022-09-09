const util = require("util");
const fs = require("fs");

async function createTempFolder() {
  let createFile = util.promisify(fs.mkdir);
  await createFile("temp");
}
async function readFileToString(path) {
  let readF = util.promisify(fs.readFile);
  let file = await readF(path);
  return file.toString();
}

async function deleteTempFolder() {
  let rm = util.promisify(fs.rm);
  await rm("temp", { recursive: true });
}

async function createFile(path, data) {
  let writeFile = util.promisify(fs.writeFile);
  await writeFile(path, data, { encoding: "binary" });
}

async function name(params) {}

module.exports = {
  createTempFolder,
  readFileToString,
  deleteTempFolder,
  createFile,
};
