// Dependencies
const router = require('express').Router();

// Models
const Questions = require('../models/question-models');

// Middleware

const restricted = require('../controllers/authCheck');

// GETS ALL THE USER WORKFLOWS
router.get('/', restricted, async(req,res) => {
    try {
        const questions = await Questions.find(req.params.id)
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the user questions"})
    }
})

// GET SPECEFIC ID OF USER WORKFLOWS

router.get('/:id', async (req, res) => {
  const questions = await Questions.getById(req.params.id);
  try {
    if (questions) {
      res.status(200).json(questions);
    } else {
      res
        .status(404)
        .json({ message: 'Question with that ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: ' Error retrieving that question' });
  }
});

// POST - CREATES NEW
router.post('/', async(req, res) => {
    const {
        options,
        question_text,
        option_number
    } = req.body
    if (!options|| !question_text|| !option_number) {
        res
            .status(400)
            .json({ message: "Please provide missing information" });
    }
    try {
        const answerPosts = await Questions.add(req.body);
        res
            .json(answerPosts);
    } catch (err) {
        res
            .status(500)
            .json({ err: "The question could not be added at this time." });
    }
});


// UPDATES THE Questions
router.put("/:id", async (req,res) => {

    try {
        const updateQuestions = await Questions.updateQuestion(req.params.id,req.body);
            if(updateQuestions)
                res.status(200).json({ message: `Client: ${updateQuestions}`, updateQuestionInfo:req.body})
    } catch (error) {
        res.status(500).json({ message: "Unable to update the question at this time.. please try again later"})
    }
    })
    // DELETE QUestions
    router.delete("/:id", async(req,res) => {
        try {
            const deleteQuestion = await Questions.removeQuestion(req.params.id)
                if(deleteQuestion)
                    res.status(200).json({ message: "You have successfully deleted the Question"})
        } 
        
        catch (error) {
            res.status(500).json({ message: "Unable to delete this Answer."})
        }
    })




module.exports = router;
