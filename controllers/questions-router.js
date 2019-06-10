//Dependencies
const router = require('express').Router();

//Models
const Questions = require('../models/question-models')

// Middleware

const restricted = require('../controllers/authCheck')


// GETS ALL THE USER WORKFLOWS
router.get('/', restricted,async(req,res) => {
    try {
        const questions = await Questions.find(req.params.id)
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the user questions"})
    }
})

// GET SPECEFIC ID OF USER WORKFLOWS

router.get('/:id', async (req,res) => {
    const questions = await Questions.getById(req.params.id);
    try {
            if (questions) {
                res.status(200).json(questions)
            } else {
                res.status(404).json({message : "Question with that ID does not exist."})
            }
    } catch (error) {
        res.status(500).json({ error: " Error retrieving that question"})    }
})

 // DELETE WORKFLOW - WORKS
 router.delete("/:id", async(req,res) => {
    try {
        const deleteQuestion = await Answers.removeQuestion(req.params.id)
            if(deleteQuestion)
                res.status(200).json({ message: "You have successfully deleted the Question"})
    } 
    
    catch (error) {
        res.status(500).json({ message: "Unable to delete this Question."})
    }
})

module.exports = router;