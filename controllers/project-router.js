const router = require('express').Router();
const Projects = require('../models/project-models');
const nodes = require('../models/nodes-models');
const parseGraph = require('./graph-parser')
const testJSON = require('./testjson2');

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
      console.log(err);
    }
});

// UPDATES THE RESPONSE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { project_title, graph_json, user_id} = req.body;
  
  let {initial_node_id} = req.body
  if(graph_json && !initial_node_id)
     initial_node_id = Object.keys(graph_json.layers[1].models)[0]
     
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
    const deleteNodes = await nodes.deleteAllProjectNodes(id);
    console.log(deleteNodes)
    const deleteRes = await Projects.remove(id);
    console.log(deleteRes);
    if (deleteRes)
      res.status(200).json({
        message: 'You have successfully deleted the Project',
        current: deleteRes,
      });
  } catch (error) {
    console.log(error)
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

router.post('/publish/:id', async (req,res) => {
  const { id } = req.params;
  const { project_title, graph_json, user_id, initial_node_id} = req.body;
    const obj = {
      id,
      project_title,
      graph_json,
      user_id,
      initial_node_id
    };
    
    
  try {
    await Projects.update(obj)
    const successful = await parseGraph(obj);
 // console.log(testJSON);
    return res.status(200).json({message: 'Publishing successful!', successful})
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: `Unable to publish Project #${id}`,
    });
  }

})

router.post('/test', async (req,res) => {
  let graph_json = testJSON
  let id = 12
  let user_id = 1
  const obj = {
    graph_json,
    user_id,
    id
  }
try{
 const successful = await parseGraph(obj);
 // console.log(testJSON);
  return res.status(200).json({message: 'Parsing successful!', successful})
} catch(error) {
  console.log(error);
  res.status(500).json({message: 'Something broke along the way parsing the graph', error})
}})

module.exports = router;