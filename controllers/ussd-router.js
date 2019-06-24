/* eslint-disable no-useless-concat */
const UssdMenu = require('ussd-menu-builder');
const UssdModel = require('../models/ussd-model');
const router = require('express').Router();
const _ = require('lodash');
const db = require('../database/dbConfig');
// Function to create a new menu. Recommended to create a new menu for each request
// Constructor for questions and options

// format options to be sent to AfricasTalking API
const makeNextState = options =>
  options.reduce(
    (obj, item) => ({
      ...obj,
      ...{ [item.number]: item.text },
    }),
    {}
  );

// Format options to be displayed to clients
const makeCurrentOption = screen =>
  Object.keys(screen.options)
    .map((obj, i) => `${screen[obj].order}. ${screen[obj].question_text}`)
    .toString()
    .join("' \n'")
    .slice('\n', '');

// Format questions to be sent to be displayed to clients
const makeCurrentQuestion = (screen, currentOption) =>
  `${screen.question} \n${currentOption}`;

function getSessionInfo(body) {
  const session = {
    session_id: body.sessionId,
    phone_num: body.phoneNumber,
    service_code: body.serviceCode,
    text: body.text,
  };
  return session;
}

// DYNAMIC ROUTE HANDLER
router.post('/', async (req, res) => {
  try {
    // create a new menu for each request
    const sessions = {};
    const menu = new UssdMenu();
    const session = getSessionInfo(req.body);

    // Filter returns workflow id EX: 1

    menu.sessionConfig({
      start: async sessionId => {
        await UssdModel.addSession(session);
        sessions.session_id = req.body.sessionId;
        sessions.phone_num = req.body.phoneNumber;
        sessions.service_code = req.body.serviceCode;
        sessions.text = req.body.text;
        // initialize current session if it doesn't exist
        // this is called by menu.run()
        if (!(sessionId in sessions)) sessions[sessionId] = {};
      },
      end: async (sessionId, callback) => {
        // clear current session
        // this is called by menu.end()
        delete sessions[sessionId];
        callback();
      },
      set(sessionId, key) {
        return new Promise((resolve, reject) => {
          sessions[sessionId][key] = session;
          resolve(session);
        });
      },
      get: async (sessionId, key) => session[sessionId][key],
      gett(sessionId, key) {
        return new Promise((resolve, reject) => {
          const value = sessions[sessionId][key];
          resolve(value);
        });
      },
    });

    menu.startState({
      next: {
        '': function() {
          if (true) {
            return 'someState';
          }
          return 'otherState';
        },
      },
    });

    menu.state('someState', {
      run: () => {
        const firstName = menu.val;
        menu.session.set('firstName', firstName).then(async () => {
          menu.con('Enter your last name');
          const name = await menu.session.get(req.body.sessionId, 'firstname');
          console.log(name);
        });
      },
    });

    menu.state('otherState', {
      run: () => {
        menu.session.get(session.session_id, 'firstName').then(firstName => {
          // do something with the value
          console.log(firstName);
          menu.con('Next');
        });
      },
    });
    // menu.session.set('workflow', 1);
    // console.log('TCL: menu.session', menu.session);
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
