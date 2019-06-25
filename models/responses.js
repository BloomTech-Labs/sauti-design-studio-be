const db = require('../database/dbConfig');

/*
Example of object

{ id: 1, text: 'example', owner: null, workflow: 1, index: 1 }
*/

const find = filter => db('responses').where(filter);

const getById = id =>
  db('responses')
    .where({ id })
    .first();

const getBase = filter => db('responses').where({ owner: null, ...filter });

const getChild = owner => db('responses').where({ owner });

const add = values =>
  db('responses')
    .insert(values)
    .returning('id')
    .then(([id]) => getById(id));

const update = values =>
  db('responses')
    .where({ id: values.id })
    .update(values)
    .returning('id')
    .then(([id]) => getById(id));

// async function add(workflow_id, question_text, order) {
//   await db('questions')
//     .insert({ workflow_id, question_text, order })
//     .returning('id');

//   return find(workflow_id);
// }

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
  getById,
  getBase,
  getChild,
  add,
  update,
  updateQuestion,
  removeQuestion,
};
