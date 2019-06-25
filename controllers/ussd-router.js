/* eslint-disable no-useless-concat */
/* eslint-disable prefer-const */
const UssdMenu = require('ussd-menu-builder');
const UssdModel = require('../models/ussd-model');
const router = require('express').Router();
const _ = require('lodash');
const db = require('../database/dbConfig');
// Function to create a new menu. Recommended to create a new menu for each request
// Constructor for questions and options

// Format options to be displayed to clients
const makeCurrentOption = screen =>
  Object.keys(screen.options)
    .map((obj, i) => `${screen[obj].order}. ${screen[obj].question_text}`)
    .toString()
    .join("' \n'")
    .slice('\n', '');

// DYNAMIC ROUTE HANDLER
router.post('/', async (req, res) => {
  try {
    // create a new menu for each request
    const menu = new UssdMenu();
    // const session = getSessionInfo(req.body);
    // await UssdModel.addSession(session);
    // console.log('TCL: session', session);

    // sessions.session_id = req.body.sessionId;
    // sessions.phone_num = req.body.phoneNumber;
    // sessions.service_code = req.body.serviceCode;
    // sessions.text = req.body.text;
    // Filter returns workflow id EX: 1

    menu.sessionConfig({
      start: async sessionId => {
        await UssdModel.startSession({
          session_id: sessionId,
          phone_num: req.body.phoneNumber,
          service_code: req.body.serviceCode,
          text: req.body.text,
        }).catch(err => new Error(err));
      },
      end: async sessionId =>
        UssdModel.endSession(sessionId).catch(err => new Error(err)),
      set: async (sessionId, key, value) =>
        UssdModel.updateSession(sessionId, key, value).catch(
          err => new Error(err)
        ),
      get: (sessionId, key) =>
        UssdModel.getSession(sessionId, key).catch(err => new Error(err)),
    });

    menu.startState({
      next: {
        '': 'selectWorkflow',
        [`*[0-9]+`]: 'activeWorkflow',
      },
    });

    menu.state('selectWorkflow', {
      run() {
        menu.session.get('workflow');
        menu.con('Enter workflow ID:');
      },
      next: {
        [`*[0-9]+`]: 'activeWorkflow',

        [`*[a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    menu.state('invalidCharacter', {
      run() {
        menu.con('Numbers only:');
      },
      next: {
        [`*[0-9]+`]: 'activeWorkflow',
        [`*[a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    menu.state('activeWorkflow', {
      run: () => {
        menu.session.set('workflow', menu.val);
        menu.session
          .get('workflow')
          .then(({ workflow }) => UssdModel.getWorkflowInfo(workflow))
          .then(data => menu.con(`Workflow: ${data.name}`));
      },
      next: {
        [`*[0-9]+`]: 'selectWorkflow',
        [`*[a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    // menu.session.set('workflow', 1);
    // const workflow = await UssdModel.getUserWorkflow(filter);

    // menu.state(workflow.startScreen.menu, {
    //   run() {
    //     menu.con(workflow.startScreen.question);
    //   },
    //   next: workflow.startScreen.next,
    // });

    // for (const screen of workflow.screens) {
    //   menu.state(screen.menu, {
    //     run: async () => {
    //       menu.con(await UssdModel.getScreenData(screen.id));
    //     },
    //     next: {
    //       '': 'melee',
    //     },
    //   });
    // }

    // menu.startState({
    //   run: () => {
    //     // use menu.con() to send response without terminating session
    //     menu.con(
    //       'Welcome. Choose option:' + '\n1. Show Balance' + '\n2. Buy Airtime'
    //     );
    //   },
    //   // next object links to next state based on user input
    //   next: {
    //     '1': 'showBalance',
    //     '2': 'buyAirtime',
    //   },
    // });

    // menu.state('showBalance', {
    //   run: () => {
    //     // fetch balance
    //     menu.end(`Your balance is KES '`);
    //   },
    // });

    // menu.state('buyAirtime', {
    //   run: () => {
    //     menu.con('Enter amount:');
    //   },
    //   next: {
    //     // using regex to match user input to next state
    //     '*\\d+': 'buyAirtime.amount',
    //   },
    // });

    // console.log('TCL: menu', menu);
    // console.log(menu.states);

    menu.run(req.body, msg => {
      res.send(msg);
    });
  } catch (error) {
    console.log('TCL: error', error);

    res.status(500).json(error);
  }
});

router.get('/', (req, res) => {
  res.send('Welcome to the Sauti Ussd Portal');
});

module.exports = router;
