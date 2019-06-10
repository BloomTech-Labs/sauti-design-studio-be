const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
};

function find() {
  return db('users_workflows');
}

function getBy(filter) {
  return db('users_workflows').where(filter);
}

function getById(id) {
  return db('users_workflows')
    .where({ id })
    .first();
}

function add(usersworkflow) {
  return db('users_workflows')
    .insert(usersworkflow, 'id')
    .then(id => find(id[0]));
}
