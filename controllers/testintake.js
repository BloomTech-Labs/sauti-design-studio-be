// Dependencies
const router = require('express').Router();

// Models
// const Users = require('../models/user-models');
const Workflows = require('../models/workflow-models');

// Middleware

function getNodes(data) {
    for (i = 0; i > data.length; i++) {
        print(data.nodes.id)
    }
}

// Get Workflow JSON into DB

router.get('/', async (req,res) => {
    res.send('Primary JSON intake server is running')
});


function dataSet(info) {

    let nodes = info.nodes;
    let links = info.links;

    let newPage = {
        name: '',
        text: '',
        Con1: '',
        Con2: '',
        Con3: '',
        Con3: '',
        Con3: '',
        Con4: '',
        Con6: '',
        Con7: '',
        Con8: '',
        Con9: '',
        previous: '',
    }

    console.log('node length ', nodes.length);

    for (i=0; i<nodes.length; i++) {
        console.log('working with node: ', nodes[i].id );

        newPage.name = nodes[i].id;
        newPage.text = nodes[i].description;

        for (j=0; j<links.length; j++){
            console.log('working with link: ',links[i].id, 'which starts at ', links[i].source);
        }
    }
}

router.post('/', async (req, res) => {
    
    let content = req.body;

    let overId = content.id;
    // console.log('Overall ID ', overId);

    let nodes = content.nodes;
    // console.log('Nodes : ', nodes);

    await dataSet(content);

    console.log('node 0 id check : ',nodes[0].id)
    res.send(overId);


    //res.send('Hey, you tried to send something')

});






module.exports = router;