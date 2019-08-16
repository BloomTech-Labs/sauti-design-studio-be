 const nodesTable = require('../models/nodes-models');
 
 async function parseGraph(data) {
   const {graph_json} = data
    let nodes = graph_json.nodes;
    let links = graph_json.links;

    console.log(graph_json);

    console.log('node length ', nodes.length);

     for (i=0; i<nodes.length; i++) {
    
        let newPage = {
            node_id: '',
            text: '',
            options: [],
            connections: [],
            user_id: data.user_id,
            project_id: data.id
        }

        // need to add PORT label data to intake data to be displayed
    
        console.log('working with node: ', nodes[i].id );

        newPage.node_id = nodes[i].id;
        newPage.text = nodes[i].description;

        let options = nodes[i].ports;

        for (k=1; k<options.length; k++) {
            //
            // console.log(options[k].label);
            newPage.options.push(options[k].label)
        }

        for (j=0; j<links.length; j++){
            // console.log('working with link: ',links[i].id, 'which starts at ', links[i].source);

            let ins = 1;

            if (nodes[i].id == links[j].source) {
                newPage.connections.push(links[j].target);
            }
        }

        console.log('newPage obj: ', newPage);

        await nodesTable.insert(newPage);
    }

}

module.exports = parseGraph;