/* eslint-disable no-shadow */
const db = require('../database/dbConfig');
const _ = require('lodash');
const Promise = require('bluebird');

const startSession = async session => {
  /* Check if there is an active session with that id
  If there is no session create it
  If there is then update it */
  const active = await db('sessions').where({ session_id: session.session_id });
  if (!active || active.length === 0)
    return db('sessions').insert({ ...session });

  return db('sessions')
    .where({ session_id: session.session_id })
    .update({ ...session });
};

const getSession = async (session_id, key) =>
  db('sessions')
    .select(key)
    .where({ session_id })
    .first();

const updateSession = (session_id, key, value) =>
  db('sessions')
    .where({ session_id })
    .update({ [key]: Number(value) });

const endSession = session_id =>
  db('sessions')
    .where({ session_id })
    .delete();

const getWorkflow = id =>
  db('workflows')
    .select('id', 'name')
    .where({ id })
    .first();

const getQuestions = filter => db('questions').where(filter);

const getScreenCount = filter =>
  db('questions')
    .where(filter)
    .orderBy('order')
    .countDistinct();
/* ################################### */

const makeCurrentQuestion = (text, options) =>
  `${text} ${Object.keys(options)
    .map(obj => `\n${options[obj].order}. ${options[obj].question_text}`)
    .toString()
    .split(`,`)}`;

const makeScreens = (name, questions) =>
  questions.map(obj => ({
    menu: _.camelCase(obj.question_text),
    id: obj.id,
  }));

const makeNextObj = (name, questions) => {
  const obj = {};
  questions.map(
    (question, i) => (obj[i + 1] = _.camelCase(question.question_text))
  );
  return obj;
};

class Workflow {
  constructor(workflow, questions) {
    this.startScreen = {
      menu: _.camelCase(workflow.name),
      question: makeCurrentQuestion(workflow.name, questions),
      next: makeNextObj(workflow.name, questions),
    };
    this.screens = makeScreens(workflow.name, questions);
  }
}

const getUserWorkflow = async workflow_id => {
  console.log('TCL: getUserWorkflow - workflow_id', workflow_id);

  const [workflow] = await db('workflows').where({ id: workflow_id });

  const questions = await db('questions').where({ workflow_id: workflow.id });

  const questionsAndAnswers = await Promise.all(
    questions.map(async question => {
      const obj = {
        ...question,
        answers: await db('answers').where({ question: question.id }),
      };
      return obj;
    })
  );

  return new Workflow(workflow, await questionsAndAnswers);
};

const makeResponseBreaks = arr => arr.map(item => `\n${item.answer_text} `);

const getScreenData = async id => {
  const answers = await db('answers').where({ question: id });

  return makeResponseBreaks(answers);
};

module.exports = {
  startSession,
  getSession,
  endSession,
  updateSession,
  getWorkflow,
  getQuestions,
  getScreenCount,
};
