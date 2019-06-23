/* eslint-disable no-shadow */
const db = require('../database/dbConfig');
const _ = require('lodash');
const Promise = require('bluebird');

class BuildScreen {
  constructor(screens) {
    this.question = screens.questionText;
    this.options = screens.options;
  }
}

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

  return id;
}

const makeResponseBreaks = arr => arr.map(item => `\n${item.answer_text}`);

const getScreenQuestions = async (workflow_id, order) => {
  const question = await db('questions')
    .where({ workflow_id, order })
    .first();
  // console.log('TCL: getScreenQuestions -> question', question);

  const answers = await db('answers')
    .select('answer_text', 'next')
    .where({ question_id: question.id })
    .orderBy('answer_number');
  // console.log('TCL: getScreenQuestions -> answers', answers);

  return {
    questionText: question.question_text,
    options: answers,
    next: 'exampleName',
  };
};

// Format options to be displayed to clients
const makeCurrentOption = options =>
  Object.keys(options)
    .map((obj, i) => `\n${options[obj].order}. ${options[obj].question_text}`)
    .toString()
    .split(',');

const makeCurrentQuestion = (title, options) =>
  `${title}${makeCurrentOption(options)}`;

const getAllScreens = async workflow_id => {
  const questions = await db('questions')
    .where({ workflow_id })
    .orderBy('order');
  const { name } = await db('workflows')
    .where({ id: workflow_id })
    .first();

  const getAnswer = async question_id =>
    db('answers').where({ question: question_id });

  const makeNext = async questions => {
    const results = await questions.map(async question =>
      db('answers').where({ question: question.id })
    );
    return results;
  };

  // const obj = {
  //   menu: _.camelCase(name),
  //   question: makeCurrentQuestion(name, questions),
  //   questions,
  //   next: {
  //     1: 'showBalance',
  //     2: 'showBalance',
  //   },
  // };

  const makeOtherScreens = (name, array) =>
    array.map(obj => ({
      menu: _.camelCase(obj.question_text),
      id: obj.id,
    }));

  const title = _.camelCase(name);

  const obj = {
    startScreen: {
      menu: title,
      question: makeCurrentQuestion(name, questions),
      questions,
      next: {
        1: 'topTier',
        2: 'characterList',
      },
    },
    screens: makeOtherScreens(title, questions),
  };
  return obj;
};

const makeNewScreen = async workflow_id => {
  const { name } = await db('workflows')
    .select('name')
    .where({ id: workflow_id })
    .first();

  const options = await db('questions')
    .select('question_text')
    .where({ workflow_id });

  const obj = new BuildScreen({
    questionText: name,
    options,
    title: await makeCurrentOption(options),
  });

  // console.log('TCL: obj', obj.options);

  // console.log('Make New current option', makeCurrentOption(obj.options));

  return obj;
};
const getScreenData = async id => {
  const answers = await db('answers').where({ question: id });

  return makeResponseBreaks(answers);
};

module.exports = {
  getScreenData,
  getAllScreens,
  makeNewScreen,
  addSession,
  getScreenQuestions,
};
