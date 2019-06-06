const db = require('../database/dbConfig')

module.exports = {
 find,
 getBy,
 getById,
 add

}

function find() {
    return db('workflows');
}

function getBy(filter) {
    return db('workflows').where(filter);
}

function getById(id) {
    return db('workflows').select('id','user_id','questions');
}

function add(workflow) {
    return db('workflows').insert(workflow,"id")
}

// // select 

// SELECT UsersWorkflows.id
// FROM UsersWorkflows
// INNER JOIN WorkFlow ON  UsersWorkflows.workflow_id = workflow.id