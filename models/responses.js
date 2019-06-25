const db = require('../database/dbConfig');

const find = filter => db('responses').where(filter);

// async function add(workflow_id, question_text, order) {
//   await db('questions')
//     .insert({ workflow_id, question_text, order })
//     .returning('id');

//   return find(workflow_id);
// }

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

module.exports = {
  find,
  getBy,
  updateQuestion,
  removeQuestion,
};
