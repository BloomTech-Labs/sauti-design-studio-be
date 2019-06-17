// Dependencies
const router = require('express').Router();

// Models
const Questions = require('../models/question-models');

// Middleware

const restricted = require('../controllers/authCheck');

// GETS ALL THE USER WORKFLOWS
router.get('/:workflow_id', async (req, res) => {
  const { workflow_id } = req.params;
  const { id:user_id } = req.user;

  try {
    const questions = await Questions.find(101, workflow_id);

    console.log(questions)
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the user questions' });
  }
});

router.post('/:workflow_id', async (req, res) => {
  const { workflow_id } = req.params
  const { question_text, option_number } = req.body
  const { id: user_id } = req.user
  try {
    res.status(200).json(await Questions.add(user_id, workflow_id, question_text, option_number))
  } catch (e) {
    res.status(500).json(e)
  }

});

// UPDATES THE Questions
router.put('/:id', async (req, res) => {
  try {
    const updateQuestions = await Questions.updateQuestion(
      req.params.id,
      req.body
    );
    if (updateQuestions)
      res.status(200).json({
        message: `Client: ${updateQuestions}`,
        updateQuestionInfo: req.body,
      });
  } catch (error) {
    res.status(500).json({
      message:
        'Unable to update the question at this time.. please try again later',
    });
  }
});

// DELETE QUestions
router.delete('/:id', async (req, res) => {
  try {
    const deleteQuestion = await Questions.removeQuestion(req.params.id);
    if (deleteQuestion)
      res
        .status(200)
        .json({ message: 'You have successfully deleted the Question' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this Answer.' });
  }
});

module.exports = router;
