// Dependencies
const router = require('express').Router();

// Models
const Answers = require('../models/answer-models');

// Middleware

const restricted = require('../controllers/authCheck');

// GETS ALL THE ANSWERS
router.get('/:question_id', async (req, res) => {
  try {
    const answers = await Answers.find(req.params.question_id);
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the answers' });
  }
});

// POST - CREATES NEW
router.post('/:question_id', async (req, res) => {
  const { question_id } = req.params;
  const { answer_text, answer_number, next } = req.body;

  try {
    res
      .status(200)
      .json(await Answers.add(answer_text, answer_number, next, question_id));
  } catch (e) {
    res.status(500).json(e);
  }
});

// UPDATES THE ANSWERS
router.put('/:id', async (req, res) => {
  try {
    const updateAnswers = await Clients.updateAnswers(req.params.id, req.body);
    if (updateAnswer)
      res.status(200).json({
        message: `Client: ${updateClient}`,
        updateClientInfo: req.body,
      });
  } catch (error) {
    res.status(500).json({
      message:
        'Unable to update the client at this time.. please try again later',
    });
  }
});

// DELETE ANSWERS - WORKS
router.delete('/:id', async (req, res) => {
  try {
    res.status(200).json(await Answers.removeAnswer(req.params.id));
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this Answer.' });
  }
});

module.exports = router;
