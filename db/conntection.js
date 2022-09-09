const pg = require("pg-promise")();
const db = pg(process.env.DB_URL);

db.connect()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("Failed to connect to database");
  });

module.exports = {
  db,
};
