const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
};

function find() {
  return db('clients');
}

function getBy(filter) {
  return db('clients').where(filter);
}

function getById(id) {
  return db('clients')
    .where({ id })
    .first();
}

function add(client) {
  return db('clients')
    .insert(client, 'id')
    .then(id => find(id[0]));
}
