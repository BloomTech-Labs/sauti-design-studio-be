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
    const workflow = await UssdModel.getUserWorkflow(filter);

    menu.startState({
      run: () => {
        // use menu.con() to send response without terminating session
        menu.con(workflow.startScreen.question);
      },
      // next object links to next state based on user input
      next: workflow.startScreen.next,
    });

    for (const screen of workflow.screens) {
      menu.state(screen.menu, {
        run: async () => {
          menu.con(await UssdModel.getScreenData(screen.id));
        },
      });
    }

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
