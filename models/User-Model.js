const db = require("../database/dbConfig");

module.exports = {
  find,
  getBy,
  getById,
  add
};

function find() {
  return db("users");
}

function getBy(filter) {
  return db('users').where(filter);
}
function getById(id) {
  return db('users').where({ id }).first();
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return getById(id);
}