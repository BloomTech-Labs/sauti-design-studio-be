const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  getByUserId,
  update,
  remove,
};

function find() {
  return db('projects');
}

function getBy(filter) {
  return db('projects').where(filter);
}

function getByUserId(id) {
  return db('projects')
    .where('user_id', '=', id);
}
function getById(id) {
  return db('projects')
    .where({ id })
    .first();
}
function add(user) {
  return db('projects').insert(user);
}

function update(values) {
  return db('projects')
    .where({ id: values.id })
    .update(values)
    .returning('id')
    .then(([id]) => getById(id));
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}