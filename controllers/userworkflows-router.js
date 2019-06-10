//Dependencies
const router = require('express').Router();

//Models
const Users = require('../models/user-models')
const Workflows = require('../models/workflow-models')

const UserWorkflows = require('../models/user-workflow-models')
// Middleware

const restricted = require('../controllers/authCheck')


// GETS ALL THE USER WORKFLOWS
router.get('/', restricted,async(req,res) => {
    try {
        const userworkflows = await UserWorkflows.find(req.params.id)
        res.status(200).json(userworkflows)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the user workflows"})
    }
})

// GET SPECEFIC ID OF USER WORKFLOWS

router.get('/:id', async (req,res) => {
    const userworkflows = await UserWorkflows.getById(req.params.id);
    try {
            if (userworkflows) {
                res.status(200).json(userworkflows)
            } else {
                res.status(404).json({message : "workflow with taht ID does not exist."})
            }
    } catch (error) {
        res.status(500).json({ error: " Error retrieving that workflow"})    }
})

// POSTS THE USERWORKFLOWS.. -- BUG?
router.post("/", async (req,res) => {
    const {
        user_id,name,area_code,category,client_id,question_id
    } = req.body

    if (!user_id || !name || !area_code || !category || !client_id || !question_id)
        res.status(400).json({message: "Please provide the missing information"})
    try {
        const workflows = await Workflows.add(req.body)
            res.status(workflows);
    } catch (error) {
        res.status(500).json({message: "unable to post workflow", error})
    }
})

// UPDATES THE USER WORKFLOWS -- BUG?
router.put("/:id", async (req,res) => {
try {
    const updateWorkflow = await Workflows.update(req.params.id,req.body);
        if(updateWorkflow)
            res.status(200).json({ message: `workflow: ${updateWorkflow}`, updateWorkflowInfo:req.body})
} catch (error) {
    res.status(500).json({ message: "Unable to update this workflow at this time.. please try again later"})
}
})

// DELETE USER WORKFLOWS -- BUG?
router.delete("/:id", async(req,res) => {
    try {
        const deleteUsersWorkflow = await Workflows.removeUsersworkflow(req.params.id)
            if(deleteUsersWorkflow)
                res.status(200).json({ message: "You have successfully deleted the user-workflow"})
    } 
    
    catch (error) {
        res.status(500).json({ message: "Unable to delete this user-workflow."})
    }
})


module.exports = router;