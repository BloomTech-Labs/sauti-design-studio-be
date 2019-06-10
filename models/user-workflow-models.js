
const db = require('../database/dbConfig')

module.exports = {
 find,
 getBy,
 getById,
 add,
 removeUsersworkflow

}

function find() {
    return db("users_workflows");
}

function getBy(filter) {
    return db('users_workflows').where(filter);
}

function getById(id) {
    return db('users_workflows').where({ id }).first();
}

function add(usersworkflow) {
    return db('users_workflows').insert(usersworkflow,"id").then(id => {
            return find(id[0]);
        });
}

function removeUsersworkflow(id) {
    return db('users_workflows').where('id',id).del();
}