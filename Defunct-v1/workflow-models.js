const db = require('../database/dbConfig');

module.exports = {
  find,
  userFlows,
  getBy,
  getById,
  add,
  updateWorkflow,
  removeWorkflow,
};

function find(filter) {
  return db('workflows').where(filter);
}

function userFlows(userId) {
  return db('workflows').where({ user_id: userId });
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
  console.log('TCL: add -> workflow', workflow);
  return db('workflows')
    .insert(workflow, 'id')
    .then(() => db('workflows').where({ user_id: workflow.user_id }))
    .catch(err => console.error(err));
}

function updateWorkflow(id, changes) {
  return db('workflows')
    .where({ id })
    .update(changes);
}

function removeWorkflow(id) {
  return db('workflows')
    .where('id', id)
    .del();
}
// // select

// SELECT UsersWorkflows.id
// FROM UsersWorkflows
// INNER JOIN WorkFlow ON  UsersWorkflows.workflow_id = workflow.id
