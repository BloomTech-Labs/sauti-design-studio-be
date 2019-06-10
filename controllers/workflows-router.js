// Dependencies
const router = require('express').Router();

// Models
const Users = require('../models/user-models');
const Workflows = require('../models/workflow-models');

// Middleware

const restricted = require('../controllers/authCheck');

// GETS ALL THE WORKFLOWS
router.get('/all', restricted, async (req, res) => {
  console.log(req.user)
  try {
    const workflows = await Workflows.find();
    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the workflows' });
  }
});


router.get('/', restricted, async (req, res) => {

  try {
    const workflows = await Workflows.userFlows(req.user.id);
    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the workflows' });
  }
});

// GET SPECEFIC ID OF WORKFLOW
router.get('/:id', async (req, res) => {
  const workflows = await Workflows.getBy({ id: req.params.id, user_id: req.user.id });
  try {
    if (workflows) {
      res.status(200).json(workflows);
    } else {
      res
        .status(404)
        .json({ message: 'workflow with taht ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: ' Error retrieving that workflow' });
  }
});

// POSTS THE WORKFLOW
router.post('/', (req, res) => {
  const { name, area_code, category, client_id, question_id } = req.body;

  if (!req.user)
    res.status(400).json({ message: 'You must be logged in to do that' });

  const user_id = req.user.id

  const workflow = { name, area_code, category, client_id, question_id, user_id }


  if (!name || !area_code || !category || !client_id || !question_id)
    res.status(400).json({ message: 'Please provide the missing information' });

  Workflows.add(workflow)
    .then(workflows => res.status(200).json(workflows))
    .catch(err => res.status(500).json({ message: err }))

})


// UPDATES THE WORKFLOW -- BUG?
router.put('/:id', async (req, res) => {
  try {
    const updateWorkflow = await Workflows.update(req.params.id, req.body);
    if (updateWorkflow)
      res.status(200).json({
        message: `workflow: ${updateWorkflow}`,
        updateWorkflowInfo: req.body,
      });
  } catch (error) {
    res.status(500).json({
      message:
        'Unable to update this workflow at this time.. please try again later',
    });
  }
});

// DELETE WORKFLOW -- BUG?
router.delete('/:id', async (req, res) => {
  try {
    const deleteWorkflow = await Workflows.removeWorkflow(req.params.id);
    if (deleteWorkflow)
      res
        .status(200)
        .json({ message: 'You have successfully deleted the workflow' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this workflow.' });
  }
});

module.exports = router;
