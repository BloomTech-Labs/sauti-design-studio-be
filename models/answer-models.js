const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
};

function find() {
  return db('answers');
}

function getBy(filter) {
  return db('answers').where(filter);
}

function getById(id) {
  return db('answers')
    .where({ id })
    .first();
}

function add(answer) {
  return db('answers')
    .insert(answer, 'id')
    .then(id => find(id[0]));
}
