//Dependencies
const router = require('express').Router();

//Models
const Users = require('../models/user-models')
const Workflows = require('../models/workflow-models')

// Middleware

const restricted = require('../controllers/authCheck')

router.get('/', async(req,res) => {
    try {
        const workflows = await Workflows.getById(req.params.id)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the workflows"})
    }
})

// GET SPECEFIC ID OF WORKFLOW

router.get('/:id', async)