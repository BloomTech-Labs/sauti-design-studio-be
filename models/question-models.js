const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  add,
  updateQuestion,
  removeQuestion,
};

function find(workflow_id) {
  return db('questions').where({ workflow_id });
}

async function add(workflow_id, question_text, order) {
  await db('questions')
    .insert({ workflow_id, question_text, order })
    .returning('id');

  return find(workflow_id);
}

function getBy(filter) {
  return db('questions').where(filter);
}

function updateQuestion(id, changes) {
  return db('questions')
    .where({ id })
    .update(changes);
}

async function removeQuestion(id) {
  return db('questions')
    .where('id', id)
    .del();
}
