const express = require("express");
require("dotenv").config();
const app = express();
const { packageRouter } = require("./router/package");
const { default: cron } = require("./cron/cron.js");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/package", packageRouter);

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3333");
});

cron()
  .then(() => {
    console.log("Finished cron job");
  })
  .catch((err) => {
    console.log("Error running cron" + err);
  });
