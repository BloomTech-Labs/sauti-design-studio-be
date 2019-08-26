 const nodesTable = require('../models/nodes-models');
 
 async function parseGraph(data) {
   const {graph_json} = data

    let nodes = graph_json.layers[1].models;
    let links = graph_json.layers[0].models;

    console.log(graph_json);
    //console.log(nodes, links);

    console.log('node length ', nodes.length);

     for (i in nodes) {
    
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
        console.log(options)

        for (k=1; k<options.length; k++) {
            //
            // console.log(options[k].label);
            newPage.options.push(options[k].label)
        }

        for (j in links){
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