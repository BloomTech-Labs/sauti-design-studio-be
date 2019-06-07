const router = require("express").Router();
const ProfileModel = require("../models/profile-model");

router.get("/", (req, res) => {
  const user = {
    id: req.user.id,
    displayName: req.user.display_name,
    email: req.user.email,
    phoneNumber: req.user.phone_num,
    googleId: req.user.google_id,
    facebookId: req.user.facebook_id
  };
  res.status(200).json(user);
});

router.put("/:id", async (req, res) => {
  try {
    const userInfo = req.body;
    const id = req.params.id;
    const newInfo = await ProfileModel.updateUser(id, userInfo);
    if (newInfo > 0) {
      const updatedInfo = await ProfileModel.getById(id);
      res.status(200).json({ message: "Success", user: updatedInfo });
    } else {
      res.status(400).json({ message: "Unable to update your information" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to update your information" });
  }
});

module.exports = router;
