const db = require('../database/dbConfig')

module.exports = {
 find
}

function find() {
    return db('workflows');
}

function getBy(filter) {
    return db('workflows').where(filter);
}

function getById(id) {
    return db('workflows').where({id}).first();
}

function add(workflow) {
    return db('workflows').insert(workflow,"id")
}