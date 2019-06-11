// Dependencies
const router = require('express').Router();

// Models
const Clients = require('../models/client-models');

// Middleware
const restricted = require('../controllers/authCheck')


// GETS ALL THE CLIENTS
router.get('/', restricted, async(req,res) => {
    try {
        const clients = await Clients.find(req.params.id)
        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({error: "Could not retrieve the clients"})
    }
})

// GET SPECEFIC ID OF USER WORKFLOWS

router.get('/:id', async (req, res) => {
  const clients = await Clients.getById(req.params.id);
  try {
    if (clients) {
      res.status(200).json(clients);
    } else {
      res
        .status(404)
        .json({ message: 'error getting client with that ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: ' Error retrieving that Client' });
  }
});

// POST - CREATES NEW
router.post('/', async(req, res) => {
    const {
        phone_num,
        isActive,
        workflow_id
    } = req.body
    if (!phone_num || !isActive || !workflow_id) {
        res
            .status(400)
            .json({ message: "Please provide missing information" });
    }
    try {
        const clientPosts = await Clients.add(req.body);
        res
            .json(clientPosts);
    } catch (err) {
        res
            .status(500)
            .json({ err: "The post could not be added at this time." });
    }
});


// UPDATES THE WORKFLOW 
router.put("/:id", async (req,res) => {

    try {
        const updateClient = await Clients.updateClient(req.params.id,req.body);
            if(updateClient)
                res.status(200).json({ message: `Client: ${updateClient}`, updateClientInfo:req.body})
    } catch (error) {
        res.status(500).json({ message: "Unable to update the client at this time.. please try again later"})
    }
    })
    
    // DELETE WORKFLOW - WORKS
    router.delete("/:id", async(req,res) => {
        try {
            const deleteClient = await Clients.removeClient(req.params.id)
                if(deleteClient)
                    res.status(200).json({ message: "You have successfully deleted the Client"})
        } 
        
        catch (error) {
            res.status(500).json({ message: "Unable to delete this Client."})
        }
    })


module.exports = router;
