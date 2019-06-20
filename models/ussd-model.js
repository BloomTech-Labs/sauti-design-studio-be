const db = require('../database/dbConfig');

async function addSession(sess) {
  console.log(sess);

  const { id } = await db('workflows')
    .select('id')
    .where({ service_code: sess.service_code })
    .first();
  return db('sessions').insert({ ...sess, workflow_id: id });
}

module.exports = {
  addSession,
};
