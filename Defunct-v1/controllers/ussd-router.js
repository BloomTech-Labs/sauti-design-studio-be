/* eslint-disable no-inner-declarations */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-const */
const UssdMenu = require('ussd-menu-builder');
const UssdModel = require('../models/ussd-model');
const router = require('express').Router();

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
        }).catch(err => console.log(err)),

      set: (id, key, value) =>
        UssdModel.updateSession(id, key, value).catch(err =>
          console.error(err.message)
        ),

      get: (id, key) =>
        UssdModel.getSession(id, key).catch(err => console.error(err.message)),

      end: id =>
        UssdModel.endSession(id).catch(err => console.error(err.message)),
    });

    menu.startState({
      next: {
        '': 'selectWorkflow',
        [`*[0-9]+`]: 'nullParent',
      },
    });

    menu.state('selectWorkflow', {
      run() {
        // menu.session.get('workflow');
        menu.con('Enter workflow ID:');
      },
      next: {
        [`*[0-9]+`]: 'nullParent',
        [`*[a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    menu.state('invalidCharacter', {
      run() {
        menu.con('Numbers only:');
      },
      next: {
        [`*[0-9]+`]: 'nullParent',
        [`*[a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    const lineMaker = (word, char = '=') => {
      let line = '';
      for (const chr of word) {
        line = line.concat('=');
      }
      return line;
    };

    const optionify = options =>
      Object.keys(options)
        .map(obj => `${options[obj].id}. ${options[obj].title}`)
        .toString()
        .split(',')
        .join('\n');

    const screenify = (title, subtitle, options) =>
      subtitle
        ? `${title}\n${lineMaker(title, '=')}\n${subtitle}:\n${optionify(
            options
          )}`
        : `${title}\n${lineMaker(title, '=')}\n${optionify(options)}`;

    menu.state('nullParent', {
      run: () => {
        const workflow = Number(menu.val);
        menu.session.set('workflow', workflow);
        UssdModel.getScreenData(workflow)
          .then(([title, subtitle, options]) => {
            menu.con(screenify(title, subtitle, options));
          })
          .catch(err => menu.end(err.message));
      },
      next: {
        [`*[0-9]+`]: 'selectedScreen',
        [`* [a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    menu.state('selectedScreen', {
      run: async () => {
        await menu.session.set('response', Number(menu.val));
        const rawWorkflow = await menu.session.get('workflow');
        console.log(await rawWorkflow);
        const workflow = Number(rawWorkflow.workflow);
        const input = Number(menu.val);

        UssdModel.getScreenData(workflow, input)
          .then(([title, subtitle, options]) => {
            menu.con(screenify(title, subtitle, options));
          })
          .catch(err => menu.end(err.message));
      },
      next: {
        [`* [a-zA-Z]+`]: 'invalidCharacter',
      },
    });

    menu.run(req.body, msg => {
      res.send(msg);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', (req, res) => {
  res.send('Welcome to the Sauti Ussd Portal');
});

module.exports = router;
