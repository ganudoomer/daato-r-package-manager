const express = require("express");

const packageRouter = express.Router();
const packageController = require("../controllers/package");

packageRouter.get("/", packageController.getAll);
packageRouter.get("/:id", packageController.getById);

module.exports = {
  packageRouter,
};
