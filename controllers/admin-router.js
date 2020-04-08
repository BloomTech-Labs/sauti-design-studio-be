const router = require('express').Router();
const Users = require('../models/user-models');

//this will be used to allow the admin to Ability to add accounts, view accounts, add users, edit users, view/edit user membership tiers, view next billing date of all user profiles

//view all accounts
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//view specific account
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'User with specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: `The reason you're getting an error: ${error}` });
  }
});

module.exports = router;