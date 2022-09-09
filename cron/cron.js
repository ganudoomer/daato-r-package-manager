require("dotenv").config();
var debianControl = require("debian-control");
const { unzipGzFile, unzipTarGzFile } = require("../utlis/decompress");
const {
  createTempFolder,
  readFileToString,
  deleteTempFolder,
} = require("../utlis/fileSystem");
const { downloadFile } = require("../utlis/fetch");
const { validator } = require("../validators");
const { deleteAll, createOne } = require("../models/packages");

const basePath = "./temp/";

module.exports.default = cron;
async function cron() {
  console.log("RUNNING CRON JOB");
  await deleteAll();
  // CREATE A TEMP FOLDER
  await createTempFolder();
  const packagesFileName = "PACKAGES.gz";

  // DOWNLOAD PACKAGES FILE
  await downloadFile(
    "https://cran.r-project.org/src/contrib/" + packagesFileName,
    packagesFileName
  );

  // UNZIP IT
  await unzipGzFile(packagesFileName, "unzipped");

  // READ FILE
  const packagesRawString = await readFileToString(
    "./" + basePath + "unzipped"
  );

  // PROCESS TO JSON LIST
  let packagesList = processRawString(packagesRawString);

  // GET THE FIRST 10
  packagesList = packagesList.splice(0, 10);

  // GET THE EACH PACKAGE'S DESCRIPTION
  await Promise.all(
    packagesList.map(async (it) => {
      const fileName = `${it.Package}_${it.Version}.tar.gz`;
      await downloadFile(
        `http://cran.r-project.org/src/contrib/${fileName}`,
        fileName
      );
      await unzipTarGzFile(fileName);
      const file = await readFileToString(
        `./${basePath}/${it.Package}/DESCRIPTION`
      );
      const package = debianControl.parse(file.toString());
      const validated = validator(package);

      // INSERT INTO DB
      await createOne(validated).catch((err) => {
        console.log(validated);
      });
    })
  );
  deleteTempFolder();
}

function processRawString(packagesRawString) {
  const packagesRawArray = packagesRawString.split("\n\n");

  const packagesArray = packagesRawArray.map((package) => {
    const files = debianControl.parse(package);
    return files;
  });
  return packagesArray;
}
