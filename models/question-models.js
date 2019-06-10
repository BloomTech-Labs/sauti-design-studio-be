const db = require("../database/dbConfig");

module.exports = {
 find,
 getBy,
 getById,
 add,
 updateQuestion,
 removeQuestion

}

function find() {
    return db("questions");
}

function getBy(filter) {
    return db('questions').where(filter);
}

function getById(id) {
    return db('questions').where({ id }).first();
}

function add(client) {
    return db('questions').insert(client,"id").then(id => {
            return find(id[0]);
        });
}

function updateQuestion(id, changes) {
    return db('questions').where({ id }).update(changes)

}

function removeQuestion(id) {
    return db('questions').where('id',id).del();
}