const db = require('../database/dbConfig');

module.exports = {
<<<<<<< HEAD
 find,
 getBy,
 getById,
 add,
 updateQuestion,
 removeQuestion

}
=======
  find,
  getBy,
  getById,
  add,
};
>>>>>>> master

function find() {
  return db('questions');
}

function getBy(filter) {
  return db('questions').where(filter);
}

function getById(id) {
  return db('questions')
    .where({ id })
    .first();
}

function add(client) {
  return db('questions')
    .insert(client, 'id')
    .then(id => find(id[0]));
}

function updateQuestion(id, changes) {
    return db('questions').where({ id }).update(changes)

}

function removeQuestion(id) {
    return db('questions').where('id',id).del();
}