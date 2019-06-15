const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  assign,
  updateQuestion,
  removeQuestion,
  getId,
};

/*
SELECT question_text, option_number
FROM workflow_questions wq
INNER JOIN questions q
ON wq.question_id = q.id
INNER JOIN workflows w ON wq.workflow_id = w.id
WHERE wq.user_id=1 AND wq.workflow_id=1
*/

function find(userId, wfId) {
  return db('workflow_questions')
    .select('question_text', 'option_number')
    .join('questions', { 'workflow_questions.question_id': 'questions.id' })
    .join('workflows', { 'workflow_questions.workflow_id': 'workflows.id' })
    .where({
      'workflow_questions.user_id': userId,
      'workflow_questions.workflow_id': wfId,
    });
}

function add(user_id, workflow_id, question_text, option_number) {
  db('questions')
    .insert({ question_text, option_number })
    .then(() => {
      const question_id = db('questions')
        .where({ question_text, option_number })
        .first();
      db('workflow_questions').insert({ user_id, workflow_id, question_id });
    });

  return db('workflow_questions')
    .select('question_text', 'option_number')
    .join('questions', { 'workflow_questions.question_id': 'questions.id' })
    .join('workflows', { 'workflow_questions.workflow_id': 'workflows.id' })
    .where({
      'workflow_questions.user_id': user_id,
      'workflow_questions.workflow_id': workflow_id,
    });
}

function assign(user_id, workflow_id, question_id) {
  return db('workflow_questions').insert({ user_id, workflow_id, question_id });
}

function getId(question_text, option_number) {
  return db('questions')
    .select('id')
    .where({ question_text, option_number })
    .first();
}

function getBy(filter) {
  return db('questions').where(filter);
}

function getById(id) {
  return db('questions')
    .where({ id })
    .first();
}

function updateQuestion(id, changes) {
  return db('questions')
    .where({ id })
    .update(changes);
}

function removeQuestion(id) {
  return db('questions')
    .where('id', id)
    .del();
}
