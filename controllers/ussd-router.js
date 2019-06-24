/* eslint-disable no-useless-concat */
const UssdMenu = require('ussd-menu-builder');
const UssdModel = require('../models/ussd-model');
const router = require('express').Router();
const _ = require('lodash');
// Function to create a new menu. Recommended to create a new menu for each request
const createMenu = () => new UssdMenu();
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
    const menu = createMenu();
    const session = getSessionInfo(req.body);
    // Filter returns workflow id EX: 1
    const filter = await UssdModel.addSession(session);
    // const workflows = await UssdModel.getAllUserWorkflows(filter);
    // console.log('TCL: workflows', workflows);
    const workflow = await UssdModel.getUserWorkflow(filter);
    console.log('TCL: userWorkflow', workflow.startScreen.question);

    // const currentOption = makeCurrentOption(newScreen);
    // console.log('TCL: currentOption', currentOption);

    menu.startState({
      run: () => {
        // use menu.con() to send response without terminating session
        menu.con(workflow.startScreen.question);
      },
      // next object links to next state based on user input
      next: workflow.startScreen.next,
    });

    console.log(
      'TCL: userWorkflow.startScreen.next',
      workflow.startScreen.next
    );
    // menu.state(userWorkflow.title, {
    //   run: () => {
    //     menu.con('Enter amount:');
    //   },
    //   next: {
    //     // using regex to match user input to next state
    //     '*\\d+': 'buyAirtime.amount',
    //   },
    // });
    menu.state(workflow.startScreen.menu, {
      run: async () => {
        menu.end(workflow.startScreen.question);
        // menu.end(screen.id);
        // menu.end({
        //   id: screen.id,
        //   menu: screen.menu,
        // });
      },
      // next: menu.startScreen.next,
    });

    for (const screen of workflow.screens) {
      menu.state(screen.menu, {
        run: async () => {
          menu.con(await UssdModel.getScreenData(screen.id));
          // menu.end(screen.id);
          // menu.end({
          //   id: screen.id,
          //   menu: screen.menu,
          // });
          console.log('TCL: screen', screen);
        },
      });
    }

    console.log('TCL: menu.state', menu.states);

    menu.state('buyAirtime', {
      run: () => {
        menu.con('Enter amount:');
      },
      next: {
        // using regex to match user input to next state
        1: 'melee',
      },
    });

    // console.log('TCL: menu', menu);

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
