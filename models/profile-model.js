const db = require("../database/dbConfig");

module.exports = {
  getById,
  updateUser
};

function getById(id) {
  return db("users").where({ id });
}

function updateUser(id, info) {
  return db("users")
    .where({ id })
    .update(info);
}
