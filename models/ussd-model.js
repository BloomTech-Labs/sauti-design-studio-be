const db = require('../database/dbConfig');

async function addSession(sess) {
  console.log(sess);

  const hello = await db('workflows').where({
    service_code: sess.service_code,
  });
  console.log('TCL: addSession -> id', hello);

  const [sessionId] = await db('sessions')
    .insert({ ...sess, workflow_id: id })
    .returning('id');

  return sessionId;
}

module.exports = {
  addSession,
};
