const db = require('../database/dbConfig');
const Promise = require('bluebird');
// function getById(id) {
//   return db('users').where({ id });
// }

const getById = async id => {
  try {
    const user = db('users')
      .select(
        'id',
        'display_name',
        'company_name',
        'phone_num',
        'country',
        'pic'
      )
      .where({ id })
      .first();

    const settings = db('settings')
      .where({ user_id: id })
      .first();

    const categories = db('categories')
      .select('id', 'category')
      .where({ user_id: id })
      .first();

    const promises = await Promise.all([user, categories, settings]);

    return {
      ...promises[0],
      categories: promises[1],
      settings: promises[2],
    };
  } catch (error) {
    return error.message;
  }
};

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

module.exports = {
  getById,
  updateUser,
  deleteUser,
};
