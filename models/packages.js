const { db } = require("../db/conntection");

async function getAll() {
  const response = await db.any("SELECT * FROM PACKAGES");
  return response;
}

async function getById(id) {
  const response = await db.any("SELECT * FROM PACKAGES WHERE name = $(id)", {
    id,
  });
  return response;
}

async function deleteAll() {
  await db.any("DELETE FROM PACKAGES");
}

async function createOne(values) {
  await db.any(
    `INSERT INTO PACKAGES(
    name,
    version,
    r_version_needed, 
    dependencies, 
    suggests, 
    date, 
    title, 
    description,
    authors,  
    maintainer, 
    license
  )
  VALUES(
    $(name),
    $(version),
    $(r_version_needed), 
    $(dependencies), 
    $(suggests), 
    $(date), 
    $(title), 
    $(description),
    $(authors),  
    $(maintainer), 
    $(license)
  )
  `,
    values
  );
}

module.exports = {
  createOne,
  getAll,
  getById,
  deleteAll,
};
