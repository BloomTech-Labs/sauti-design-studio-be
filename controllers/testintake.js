// Dependencies
const router = require('express').Router();

// Models
// const Users = require('../models/user-models');
// const Workflows = require('../models/workflow-models');

// Middleware



// Get Workflow JSON into DB

router.get('/', async (req,res) => {
    res.send('Primary JSON intake server is running')
});


router.post('/', async (req, res) => {
    res.send('Hey, you tried to send something')
});






module.exports = router;