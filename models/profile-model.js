const db = require('../database/dbConfig');

module.exports = {
  getById,
  updateUser,
  deleteUser
};

function getById(id) {
  return db('users').where({ id });
}

function updateUser(id, info) {
  return db('users')
    .where({ id })
    .update(info);
}

function deleteUser(id) {
  return db('users')
    .where('id', id)
    .del();
}