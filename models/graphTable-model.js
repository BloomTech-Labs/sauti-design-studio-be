const db = require('../database/dbConfig');

module.exports = {
  find,
  insert,
};

function find(filter) {
  return db('graphTable').where(filter);
}

function insert(rowData) {
    console.log('holder func for insertion')
}