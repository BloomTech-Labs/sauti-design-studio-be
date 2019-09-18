 const nodesTable = require('../models/nodes-models');

 /*This function is responsible for parsing the JSON graph object that is sent in the request after saving a diagram
    front end */
 
 async function parseGraph(data) {
   const {graph_json} = data

    let nodes = graph_json.layers[1].models;
    let links = graph_json.layers[0].models;

     for (i in nodes) {
    
        let newPage = {
            node_id: '',
            text: '',
            options: [],
            connections: [],
            user_id: data.user_id,
            project_id: data.id
        }

        newPage.node_id = nodes[i].id;
        newPage.text = nodes[i].description;

        let options = nodes[i].ports;
        console.log(options)

        for (k=1; k<options.length; k++) {
            newPage.options.push(options[k].label)
        }

        //This still requires optimization. This runs in O(n^2) due to always searching through the whole links array.
        for (j in links){
            let ins = 1;

            if (nodes[i].id == links[j].source) {
                newPage.connections.push(links[j].target);
            }
        }
       
        await nodesTable.insert(newPage);
    }
}

module.exports = parseGraph;