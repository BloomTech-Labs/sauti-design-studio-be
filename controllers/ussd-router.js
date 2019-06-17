const router = require('express').Router();
const UssdMenu = require('ussd-menu-builder');
const UssdModel = require('../models/ussd-model');

// Function to create a new menu. Recommended to create a new menu for each request
const createMenu = () => {
  const menu = new UssdMenu();
  return menu;
};

const screen = {
  questionText: 'Welcome! What would you like to look up?',
  options: [
    { number: 1, text: 'Show Balance' },
    { number: 2, text: 'Buy Airtime' }
  ],
};

// Constructor for questions and options
class BuildScreen {
  constructor(args) {
    (this.question = args.questionText), (this.options = args.options);
  }

  screenDetails() {
    console.log(this.question, this.options);
  }
}
// const args = {
//   sessionId: req.body.sessionId,
// };

function getSessionInfo(body) {
  const session = {
    sessionId: body.sessionId,
    phoneNumber: body.phoneNumber,
    serviceCode: body.serviceCode,
    text: body.text,
  };
  return session;
}
// DYNAMIC ROUTE HANDLER
router.post('/', (req, res) => {
  // create a new menu for each request
  const menu = createMenu();
  const session = getSessionInfo(req.body);
  const ussdSess = UssdModel.addSession(session.sessionId)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      res.status(500).json(e);
    });
  // construct questions and options object for a given flow
  const newScreen = new BuildScreen(screen);

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
  const currentOption = Object.keys(screenOpts)
    .map((obj, i) => `${screenOpts[obj].number}. ${screenOpts[obj].text}`)
    .toString()
    .split(',')
    .join('\n');

  //   Format questions to be sent to be displayed to clients
  const currentQuestion = `${newScreen.question} \n${currentOption}`;

  // The first menu shown to clients
  menu.startState({
    run: () => {
      menu.con(currentQuestion);
    },
    next: nextState,
  });
  menu.state('Home', {
    run: () => {
      menu.con(currentQuestion);
    },
    next: nextState,
  });
  menu.state('Show Balance', {
    run: () => {
      const balance = '234,434,344';
      menu.end(`Your balance is USD${balance}`);
    },
  });

  menu.state('Buy Airtime', {
    run: () => {
      menu.con('Enter amount: \n1. Go Back');
    },
    next: {
      '*\\d+': 'buyAirtime.amount',
      '1': 'Home'
    },
  });
  menu.state('buyAirtime.amount', {
    run: () => {
      menu.end('Airtime bought successfully!');
    },
  });

  menu.run(req.body, msg => {
    res.send(msg);
  });
});

router.get('/', (req, res) => {
  res.send('Welcome to the Sauti Ussd Portal');
});
module.exports = router;
