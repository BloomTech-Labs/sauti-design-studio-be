const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  add,
  updateQuestion,
  removeQuestion,
};

function find(user_id, workflow_id) {
  return db('questions_answers')
    .join('questions', { 'questions_answers.question_id': 'questions.id' })
    .where({
      'questions_answers.workflow_id': workflow_id,
    });
}

async function add(user_id, workflow_id, question_text) {
  const [id] = await db('questions')
    .insert({ question_text })
    .returning('id');

  const question_id = id;

  await db('questions_answers').insert({ workflow_id, question_id });

  return await find(user_id, workflow_id);
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
