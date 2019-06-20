const db = require('../database/dbConfig');

function addSession(sess) {
  console.log(sess);
  const x = { session_id: sess.sessionId };
  return db('sessions').insert(sess, 'id');
}

module.exports = {
  addSession,
};
