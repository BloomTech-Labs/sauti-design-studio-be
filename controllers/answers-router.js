//Dependencies
const router = require('express').Router();

//Models
const Answers = require('../models/answer-models')

// Middleware

const restricted = require('../controllers/authCheck')


// GETS ALL THE ANSWERS
router.get('/', restricted,async(req,res) => {
    try {
        const answers = await Answers.find(req.params.id)
        res.status(200).json(answers)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the answers"})
    }
})

// GET SPECEFIC ID OF USER ANSWER

router.get('/:id', async (req,res) => {
    const answers = await Answers.getById(req.params.id);
    try {
            if (answers) {
                res.status(200).json(answers)
            } else {
                res.status(404).json({message : "error getting Answer with that ID does not exist."})
            }
    } catch (error) {
        res.status(500).json({ error: " Error retrieving that Answer"})    }
})



module.exports = router;