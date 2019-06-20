const db = require('../database/dbConfig');

function addSession(sess) {
  console.log(sess);
  return db('sessions').insert(sess, 'id');
}

module.exports = {
  addSession,
};
