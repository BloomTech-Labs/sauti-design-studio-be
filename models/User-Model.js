const db = require("../database/dbConfig");

module.exports = {
  find,
  getBy,
  getById,
  add,
  getByEmail
};

function find() {
  return db("users");
}

function getBy(filter) {
  return db("users").where(filter);
}

function getByEmail(filter) {
  return db("users")
    .where("email", "=", filter)
    .first();
}
function getById(id) {
  return db("users")
    .where({ id })
    .first();
}
function add(user) {
  return db("users").insert(user, "id");
}
