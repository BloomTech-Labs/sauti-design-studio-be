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

const getScreenQuestions = async (workflow_id, order) => {
  const question = await db('questions')
    .where({ workflow_id, order })
    .first();
  // console.log('TCL: getScreenQuestions -> question', question);

  const answers = await db('answers')
    .where({ question_id: question.id })
    .orderBy('answer_number');
  // console.log('TCL: getScreenQuestions -> answers', answers);

  return {
    questionText: question.question_text,
    options: answers,
  };
};
module.exports = {
  addSession,
  getScreenQuestions,
};
