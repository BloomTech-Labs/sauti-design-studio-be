// Dependencies
const router = require('express').Router();

// Models
const Clients = require('../models/client-models');

// Middleware

const restricted = require('../controllers/authCheck');

// GETS ALL THE CLIENTS
router.get('/', restricted, async (req, res) => {
  try {
    const clients = await Clients.find(req.params.id);
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the clients' });
  }
});

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

module.exports = router;
