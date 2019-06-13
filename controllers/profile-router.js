const router = require('express').Router();
const ProfileModel = require('../models/profile-model');

router.get('/', async (req, res) => {
  try {
    const { id } = req.user;
    res.status(200).json(await ProfileModel.getById(id).first());
  } catch (e) {
    res.status(500).json({ message: 'Could not get user' });
  }
});

router.put('/', async (req, res) => {
  const obj = {};

  if (req.body.company_name !== '') obj.company_name = req.body.company_name;
  if (req.body.country !== '') obj.country = req.body.country;
  if (req.body.phone_num !== '') obj.phone_num = req.body.phone_num;

  try {
    const userInfo = req.body;
    const { id } = req.user;
    const newInfo = await ProfileModel.updateUser(id, userInfo);
    if (newInfo > 0) {
      const updatedInfo = await ProfileModel.getById(id);
      res.status(200).json({ message: 'Success', user: updatedInfo });
    } else {
      res.status(400).json({ message: 'Unable to update your information' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to update your information' });
  }
});

module.exports = router;
