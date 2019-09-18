//DEFUNCT Comment: This was built by the labs13 group. CRUD capabilities for profiles
const router = require('express').Router();
const ProfileModel = require('../models/profile-model');

router.get('/', async (req, res) => {
  try {
    // console.log("req",req);
    const { id } = req.user;
    const info = await ProfileModel.getById(id);
    res.status(200).json(info);
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

router.delete('/:id', async (req, res) => {
  // DELETE USER PROFILE
  try {
    const deleteUserProfile = await ProfileModel.deleteUser(req.params.id);
    if (deleteUserProfile)
      res
        .status(200)
        .json({ message: 'You have successfully deleted the user-profile' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this user-profile.' });
  }
});
module.exports = router;
