const db = require('../database/dbConfig');

async function addSession(sess) {
  const workflows = await db('workflows').where({
    service_code: sess.service_code,
  });
  // console.log('TCL: addSession -> workflow', workflow);
  // console.log('TCL: addSession -> workflow', workflow.id);

  const workflow_id = workflows[0].id;

  const [id] = await db('sessions')
    .insert({ ...sess, workflow_id })
    .returning('workflow_id');

  console.log('TCL: addSession -> sessionId', id);
  return id;
}

module.exports = {
  addSession,
};
