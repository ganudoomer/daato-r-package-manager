const { createFile } = require("../utlis/fileSystem");
const axios = require("axios");
let basePath = "./temp/";

async function downloadFile(url, fileName) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/gzip",
    },
  });
  await createFile(basePath + fileName, response.data, {
    encoding: "binary",
  });
}

module.exports = {
  downloadFile,
};
