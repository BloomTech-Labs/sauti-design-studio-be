// Dependencies
const router = require("express").Router();

//Models

const UserWorkflows = require("../models/user-workflow-models");
// Middleware

const restricted = require("../controllers/authCheck");

// GETS ALL THE USER WORKFLOWS
router.get("/",  async (req, res) => {
  try {
    const userworkflows = await UserWorkflows.find(req.params.id);
    res.status(200).json(userworkflows);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the user workflows" });
  }
});

// GET SPECEFIC ID OF USER WORKFLOWS

router.get("/:id", async (req, res) => {
  const userworkflows = await UserWorkflows.getById(req.params.id);
  try {
    if (userworkflows) {
      res.status(200).json(userworkflows);
    } else {
      res
        .status(404)
        .json({ message: "user workflow with that ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: " Error retrieving that workflow" });
  }
});

// POSTS THE USERWORKFLOWS.. -- BUG?
router.post("/", async (req, res) => {
  const { user_id, workflow_id } = req.body;

  if (!user_id || !workflow_id)
    res.status(400).json({ message: "Please provide the missing information" });
  try {
    const userworkflows = await UserWorkflows.add(req.body);
    res.status(userworkflows);
  } catch (error) {
    res.status(500).json({ message: "unable to post user workflow", error });
  }
});

// UPDATES THE USER WORKFLOWS -- BUG?
router.put("/:id", async (req, res) => {
  try {
    const updateUserWorkflow = await UserWorkflows.update(
      req.params.id,
      req.body
    );
    if (updateUserWorkflow)
      res
        .status(200)
        .json({
          message: `workflow: ${updateUserWorkflow}`,
          updateUserWorkflowInfo: req.body
        });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Unable to update this workflow at this time.. please try again later"
      });
  }
});

// DELETE USER WORKFLOWS -- BUG?
router.delete("/:id", async (req, res) => {
  try {
    const deleteUsersWorkflow = await Workflows.removeUsersworkflow(
      req.params.id
    );
    if (deleteUsersWorkflow)
      res
        .status(200)
        .json({ message: "You have successfully deleted the user-workflow" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete this user-workflow." });
  }
});

module.exports = router;
