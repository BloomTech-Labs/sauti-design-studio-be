const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  updateUserWorkflow,
  removeUsersworkflow,
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
    .then(([id]) => getById(id));
}

function updateUserWorkflow(id, changes) {
  return db('users_workflows')
    .where({ id })
    .update(changes);
}

function removeUsersworkflow(id) {
  return db('users_workflows')
    .where('id', id)
    .del();
}
