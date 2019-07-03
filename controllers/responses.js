// Dependencies
const router = require('express').Router();

// Models
const Responses = require('../models/responses');

// Middleware
const restricted = require('../controllers/authCheck');

router.get('/:workflow', async (req, res) => {
  const { workflow } = req.params;
  // const { id: user_id } = req.user;

  try {
    res.status(200).json(await Responses.find({ workflow }));
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the user responses' });
  }
});

router.get('/:workflow/:id', async (req, res) => {
  const { workflow, id } = req.params;
  // const { id: user_id } = req.user;
  try {
    res.status(200).json(await Responses.find({ id, workflow }));
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the user responses' });
  }
});

router.post('/:workflow', async (req, res) => {
  const { workflow } = req.params;
  const { title, index, parent } = req.body;
  // const { id: user_id } = req.user;
  try {
    res
      .status(200)
      .json(await Responses.add({ title, parent, workflow, index }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATES THE RESPONSE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, parent, workflow, index } = req.body;
  try {
    const values = { id, title, parent, workflow, index };
    res.status(200).json(await Responses.update(values));
  } catch (error) {
    res.status(500).json({
      message: `Unable to update the question ${id}`,
    });
  }
});

// SAVE NEW RESPONSES
router.put('/:workflow/save', async (req, res) => {
  const { workflow } = req.params;
  const changed = req.body;

  try {
    await changed.map(async value =>
      Responses.save({ ...value, workflow }).catch(err => console.error(err))
    );

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({
      message: `Unable to update the responses.`,
      error: error.message,
    });
  }
});

// DELETE RESPONSE
router.delete('/:id', async (req, res) => {
  try {
    const deleteRes = await Responses.remove(req.params.id);
    if (deleteRes)
      res.status(200).json({
        message: 'You have successfully deleted the Question',
        current: deleteRes,
      });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this Answer.' });
  }
});

router.delete('/:workflow/id', async (req, res) => {
  try {
    const deleteRes = await Responses.remove(req.params.id);
    if (deleteRes)
      res.status(200).json({
        message: 'You have successfully deleted the Question',
        current: deleteRes,
      });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this Answer.' });
  }
});

module.exports = router;
