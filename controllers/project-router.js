const router = require('express').Router();
const Projects = require('../models/project-models');

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.getById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: 'Project with specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: `The reason you're getting an error: ${error}` });
  }
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.getByUserId(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: 'Project with specified user Id does not exist.' });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: `The reason you're getting an error: ${error}` });
  }
});

router.post('/', async (req, res) => {
    console.log("req.body", req.body);
    const { project_title, graph_json, user_id, initial_node_id } = req.body;
    const obj = {
      project_title,
      graph_json,
      user_id,
      initial_node_id
    };
    try {
      res
        .status(201)
        .json(await Projects.add(obj));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// UPDATES THE RESPONSE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { project_title, graph_json, user_id, initial_node_id } = req.body;
    const obj = {
      id,
      project_title,
      graph_json,
      user_id,
      initial_node_id
    };
  try {
    res.status(200).json(await Projects.update(obj));
  } catch (error) {
    res.status(500).json({
      message: `Unable to update the question ${id}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    const deleteRes = await Projects.remove(id);
    console.log(deleteRes);
    if (deleteRes)
      res.status(200).json({
        message: 'You have successfully deleted the Project',
        current: deleteRes,
      });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete this Project.' });
  }
});

router.delete('/user/:id', async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    const deleteRes = await Projects.removeAll(id);
    console.log(deleteRes);
    if (deleteRes)
      res.status(200).json({
        message: 'You have successfully deleted the Projects',
        current: deleteRes,
      });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete these Projects.' });
  }
});

module.exports = router;