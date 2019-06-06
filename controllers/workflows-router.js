//Dependencies
const router = require('express').Router();

//Models
const Users = require('../models/user-models')
const Workflows = require('../models/workflow-models')

// Middleware

const restricted = require('../controllers/authCheck')

// GETS ALL THE WORKFLOWS
router.get('/', async(req,res) => {
    try {
        const workflows = await Workflows.find(req.params.id)
        res.status(200).json(workflows)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the workflows"})
    }
})

// GET SPECEFIC ID OF WORKFLOW

router.get('/:id', async (req,res) => {
    try {
        const workflows = await Workflows.getById(req.params.id);
            if (workflows) {
                res.status(200).json(workflows)
            } else {
                res.status(404).json({message : "workflow with taht ID does not exist."})
            }
    } catch (error) {
        res.status(500).json({ message: " Error retrieving that workflow"})    }
})

// POSTS THE WORKFLOW..
router.post("/", async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "unable to post workflow"})
    }
})

// UPDATES THE WORKFLOW
router.put("/:id", async (req,res) => {
try {
    
} catch (error) {
    res.status(500).json({ message: "Unable to update this workflow at this time.. please try again later"})
}
})

// DELETE WORKFLOW
router.delete("/:id", async(req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Unable to delete this workflow."})
    }
})

module.exports = router;