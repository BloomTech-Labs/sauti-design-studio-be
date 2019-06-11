// Dependencies
const router = require('express').Router();

// Models
const Answers = require('../models/answer-models');

// Middleware

const restricted = require('../controllers/authCheck');

// GETS ALL THE ANSWERS
router.get('/', restricted, async(req,res) => {
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
// POST - CREATES NEW
router.post('/', async(req, res) => {
    const {
        answer_text,
        answer_number,
    
    } = req.body
    if (!answer_text || !answer_number) {
        res
            .status(400)
            .json({ message: "Please provide missing information" });
    }
    try {
        const answerPosts = await Answers.add(req.body);
        res
            .json(answerPosts);
    } catch (err) {
        res
            .status(500)
            .json({ err: "The answer could not be added at this time." });
    }
});


// UPDATES THE ANSWERS
router.put("/:id", async (req,res) => {

    try {
        const updateAnswers = await Clients.updateAnswers(req.params.id,req.body);
            if(updateAnswer)
                res.status(200).json({ message: `Client: ${updateClient}`, updateClientInfo:req.body})
    } catch (error) {
        res.status(500).json({ message: "Unable to update the client at this time.. please try again later"})
    }
    })
    // DELETE ANSWERS - WORKS
    router.delete("/:id", async(req,res) => {
        try {
            const deleteAnswer = await Answers.removeAnswer(req.params.id)
                if(deleteAnswer)
                    res.status(200).json({ message: "You have successfully deleted the Answer"})
        } 
        
        catch (error) {
            res.status(500).json({ message: "Unable to delete this Answer."})
        }
    })

module.exports = router;
