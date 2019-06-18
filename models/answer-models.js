const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  updateAnswer,
  removeAnswer
};

/*
SELECT
	answer_text,
	answer_text
FROM
	answers a
  JOIN questions_answers qa ON a.id = qa.answer_id
*/

async function find(question_id) {
  const answers = await db('answers')
    // .select('answer_text', 'question_id')
    .where({ question_id });
  const questions = await db('questions').where({ question_id });

  return [...answers, ...questions];
}

function getBy(filter) {
  return db('answers').where(filter);
}

function getById(id) {
  return db('answers')
    .where({ id })
    .first();
}

async function add(answer_text, answer_number, question_id) {
  const [id] = await db('answers')
    .insert({
      answer_text,
      answer_number,
      question_id
    })
    .returning('id');

  return await find(question_id);
}

function updateAnswer(id, changes) {
  return db('answers')
    .where({ id })
    .update(changes);
}

async function removeAnswer(id) {
  const [question_id] = await db('answers')
    .where('id', id)
    .del()
    .returning('question_id');

  return await find(question_id);
}
