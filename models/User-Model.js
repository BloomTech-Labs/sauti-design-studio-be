const db = require("../database/dbConfig");

module.exports = {
  find,
  getBy,
  getById,
  add
};

function find() {
  return db("Users");
}

function getBy(filter) {
  return db('Users').where(filter);
}
function getById(id) {
  return db('Users').where({ id }).first();
}

async function add(user) {
    const [id] = await db('Users').insert(user);

    return getById(id);
}