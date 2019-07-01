/* eslint-disable no-inner-declarations */
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

// DYNAMIC ROUTE HANDLER
router.post('/', async (req, res) => {
  try {
    // create a new menu for each request
    const menu = new UssdMenu();

    menu.sessionConfig({
      start: sessionId =>
        UssdModel.startSession({
          session_id: sessionId,
          phone_num: req.body.phoneNumber,
          service_code: req.body.serviceCode,
          text: req.body.text,
        }).catch(err => new Error(err)),

      set: async (id, key, value) =>
        UssdModel.updateSession(id, key, value).catch(err => new Error(err)),

      get: (id, key) =>
        UssdModel.getSession(id, key).catch(err => new Error(err)),

      end: id => UssdModel.endSession(id).catch(err => new Error(err)),
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

    class Response {
      constructor(workflow) {
        /* Ex. Workflow._title: Melee
                                ===== */
        this._line = word => {
          let line = '';
          for (const chr of word) {
            line = line.concat('=');
          }
          return line;
        };

        this._title = `${workflow.name}\n${this._line(workflow.name)}\n`;

        this.responses = filter =>
          UssdModel.getResponses({
            workflow: workflow.id,
            ...filter,
          });

        this._options = responses =>
          Object.keys(responses)
            .map(obj => `${responses[obj].index}. ${responses[obj].title}`)
            .toString()
            .split(',')
            .join('\n');

        /* this.home = {
          name: workflow.name,
          _name: _.camelCase(workflow.name),
        }; */
      }
    }

    menu.state('activeWorkflow', {
      run: () => {
        menu.session.set('workflow', menu.val);
        menu.session
          .get('workflow') // Get wf from session
          .then(({ workflow: id }) =>
            UssdModel.getWorkflow(id)
              .then(async data => {
                const screen = new Response(data);

                menu.session.set('parent', null);
                menu.session.get('parent').then(async filter =>
                  menu.con(
                    `${screen._title}
                    ${screen._options(await screen.responses({ ...filter }))}`
                  )
                );
              })
              .catch(err => new Error(err))
          );
      },
      next: {
        [`*[0-9]+`]: 'selectedScreen',
        // [`* [a - zA - Z] + `]: 'invalidCharacter',
      },
    });

    const getIdFromLastInput = () => {};

    menu.state('selectedScreen', {
      run: async () => {
        menu.session.set('response', menu.val);
        await menu.session.get('workflow').then(async ({ workflow: id }) =>
          UssdModel.getWorkflow(id)
            .then(async data => {
              const screen = new Response(data);
              menu.con(
                `${screen._title}
                ${screen._options(await screen.responses({ parent: 1 }))}`
              );
            })
            .catch(err => new Error(err))
        );
      },
      // next: workflow.startScreen.next,
    });

    // menu.session.set('workflow', 1);
    // const workflow = await UssdModel.getUserWorkflow(filter);

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
