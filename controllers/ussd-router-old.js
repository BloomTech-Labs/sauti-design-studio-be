/* eslint-disable no-useless-concat */
const UssdMenu = require('ussd-menu-builder');
const UssdModel = require('../models/ussd-model');
const router = require('express').Router();
const Promise = require('bluebird');
// Function to create a new menu. Recommended to create a new menu for each request
const createMenu = () => {
  const menu = new UssdMenu();
  return menu;
};

// Constructor for questions and options
class BuildScreen {
  constructor(screens) {
    this.question = screens.questionText;
    this.options = screens.options;
    this.next = [''];
  }
}

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
    const menu = createMenu();
    const session = getSessionInfo(req.body);
    const service_code = await UssdModel.addSession(session);
    const questions = await UssdModel.getScreenQuestions(service_code, 1);

    // construct questions and options object for a given flow
    const newScreen = new BuildScreen(await UssdModel.makeNewScreen(1));
    console.log('TCL: newScreen', newScreen);

    // format options to be sent to AfricasTalking API
    const nextState = newScreen.options.reduce(
      (obj, item) => ({
        ...obj,
        ...{ [item.number]: item.text },
      }),
      {}
    );

    // Format options to be displayed to clients
    const screenOpts = newScreen.options;
    console.log('TCL: screenOpts', screenOpts);

    const currentOption = Object.keys(newScreen.options)
      .map(
        (obj, i) => `${screenOpts[obj].order}. ${screenOpts[obj].question_text}`
      )
      .toString()
      .replace(/\n/g, '')
      .trim()
      .split(',');
    // .join("' \n'")
    // .slice('\n', '');

    // Format questions to be sent to be displayed to clients

    const currentQuestion = `${newScreen.question} \n${currentOption}`;

    console.log('TCL: currentQuestion', currentQuestion);
    menu.startState({
      run: () => {
        // use menu.con() to send response without terminating session
        menu.con(
          'Welcome. Choose option:' + '\n1. Show Balance' + '\n2. Buy Airtime'
        );
      },
      // next object links to next state based on user input
      next: {
        1: 'showBalance',
        2: 'Top Tier',
      },
    });
    // menu.state(currentQuestion);
    menu.state(currentQuestion, {
      run: () => {
        // fetch balance
        menu.end(`Your balance is KES 1`);
      },
    });
    menu.state('showBalance', {
      run: () => {
        // fetch balance
        menu.end(`Your balance is KES 1`);
      },
    });

    console.log('TCL: menu.state', menu.states);

    menu.state('buyAirtime', {
      run: () => {
        menu.con('Enter amount:');
      },
      next: {
        // using regex to match user input to next state
        '*\\d+': 'buyAirtime.amount',
      },
    });
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
