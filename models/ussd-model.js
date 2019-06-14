const db = require('../database/dbConfig');

function addSession(sess) {
  return db('sessions').insert(sess, 'id');
}

module.exports = addSession;
