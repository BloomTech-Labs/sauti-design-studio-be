const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  updateWorkflow,
  removeWorkflow,
};

function find() {
  return db('workflows');
}

function getBy(filter) {
  return db('workflows').where(filter);
}

function getById(id) {
  return db('workflows')
    .where({ id })
    .first();
}

function add(workflow) {
  return db('workflows')
    .insert(workflow, 'id')
    .then(id => find(id[0]));
}

function updateWorkflow(id, changes) {
  return db('workflows')
    .where({ id })
    .update(changes);
}

function removeWorkflow(id) {
    return db('workflows').where('id', id).del()
}
// // select

// SELECT UsersWorkflows.id
// FROM UsersWorkflows
// INNER JOIN WorkFlow ON  UsersWorkflows.workflow_id = workflow.id
