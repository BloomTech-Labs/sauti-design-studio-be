const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  updateClient,
  removeClient,
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

function updateClient(id, changes) {
  return db('clients')
    .where({ id })
    .update(changes);
}

function removeClient(id) {
  return db('clients')
    .where('id', id)
    .del();
}
