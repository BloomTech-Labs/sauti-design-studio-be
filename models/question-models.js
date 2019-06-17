const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  add,
  updateQuestion,
  removeQuestion,
};

/*
SELECT question_text, option_number
FROM workflow_questions wq
INNER JOIN questions q
ON wq.question_id = q.id
INNER JOIN workflows w ON wq.workflow_id = w.id
WHERE wq.user_id=1 AND wq.workflow_id=1
*/

function find(user_id, workflow_id) {
  return db('workflow_questions')
  .select('question_id','question_text', 'option_number')
  .join('questions', { 'workflow_questions.question_id': 'questions.id' })
    .where({
      'workflow_questions.user_id': user_id,
      'workflow_questions.workflow_id': workflow_id,
    });
}

async function add(user_id, workflow_id, question_text, option_number) {
  const [id] = await db('questions')
    .insert({ question_text, option_number }).returning('id')

  const question_id = id

  await db('workflow_questions')
    .insert({ user_id, workflow_id, question_id })

  return await find(user_id, workflow_id)
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
