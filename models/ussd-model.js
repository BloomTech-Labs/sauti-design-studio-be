/* eslint-disable no-shadow */
const db = require('../database/dbConfig');
const _ = require('lodash');
const Promise = require('bluebird');

const addSession = async session => {
  const [text] = await db('sessions')
    .insert({ ...session })
    .returning('text');
  const obj = text.split('*');
  return { user_id: Number(obj[0]), id: Number(obj[1]) };
};

const makeStartQuestion = (text, options) =>
  `${text}: ${Object.keys(options)
    .map(obj => `\n${options[obj].id}. ${options[obj].name}`)
    .toString()
    .split(`,`)}`;

const makeCurrentQuestion = (text, options) =>
  `${text}: ${Object.keys(options)
    .map(obj => `\n${options[obj].order}. ${options[obj].question_text}`)
    .toString()
    .split(`,`)}`;

const makeScreens = (name, questions) =>
  questions.map(obj => ({
    menu: `${_.camelCase(name)}.${_.camelCase(obj.question_text)}`,
    id: obj.id,
  }));

const makeNextObj = (name, array) =>
  array.map(obj => ({
    menu: _.camelCase(obj.question_text),
    id: obj.order,
  }));

const makeStartScreenNext = workflows =>
  workflows.map(workflow => ({
    menu: _.camelCase(workflow.name),
  }));

class Workflows {
  constructor(workflows) {
    this.menu = 'wf';
    this.question = makeStartQuestion('Workflows:', workflows);
    this.next = makeStartScreenNext(workflows);
  }
}

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
const getAllUserWorkflows = async filter => {
  const workflows = await db('workflows').where({ user_id: filter.user_id });
  return new Workflows(workflows);
};

const getUserWorkflow = async filter => {
  const [workflow] = await db('workflows').where(filter);

  const questions = await db('questions').where({ workflow_id: workflow.id });

  const questionsAndAnswers = await Promise.all(
    questions.map(async question => {
      const obj = {
        ...question,
        answers: await db('answers').where({ question: question.id }),
      };
      console.log('TCL: obj', obj);

      return obj;
    })
  );
  console.log('TCL: questionsAndAnswers', questionsAndAnswers);

  const screen = new Workflow(workflow, await questionsAndAnswers);

  return screen;
};

const makeResponseBreaks = arr => arr.map(item => `\n${item.answer_text} `);

// Format options to be displayed to clients

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
    // screens: makeOtherScreens(title, questions),
  };
  return obj;
};

const getScreenData = async id => {
  const answers = await db('answers').where({ question: id });

  return makeResponseBreaks(answers);
};

module.exports = {
  getAllUserWorkflows,
  getUserWorkflow,
  getScreenData,
  getAllScreens,
  addSession,
};
