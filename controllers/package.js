const package = require("../models/packages");

async function getAll(req, res) {
  const response = await package.getAll();
  res.json(response);
}

async function getById(req, res) {
  const response = await package.getById(req.params.id);
  res.json(response);
}

module.exports = {
  getAll,
  getById,
};
