const db = require('../database/dbConfig');

module.exports = {
  find,
  getBy,
  getById,
  add,
  getByUserId,
  update,
  remove,
  removeAll,
  getParentNode,
  insert
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
async function getParentNode(id){
  const project = await db('projects')
		.where({ id })
		.select('initial_node_id')
		.first();
  return project.initial_node_id
}

function add(user) {
  return db('projects').insert(user, "id");
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

function removeAll(id) {
  return db('projects')
    .where('user_id', '=', id)
    .del();
}

function insert(user) {
  return db('projects')
    .insert(user, "id")
    .then(ids => {
      return ids;
    });
}