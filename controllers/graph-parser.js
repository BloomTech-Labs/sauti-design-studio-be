 const graphTable = require('../models/graphTable-model');
 
 async function parseGraph(info) {

    let nodes = info.nodes;
    let links = info.links;

    console.log(info);

    console.log('node length ', nodes.length);

     for (i=0; i<nodes.length; i++) {
    
        let newPage = {
            name: '',
            text: '',
            Options: [],
            Cons: [],
        }

        // need to add PORT label data to intake data to be displayed
    
        console.log('working with node: ', nodes[i].id );

        newPage.name = nodes[i].id;
        newPage.text = nodes[i].description;

        let options = nodes[i].ports;

        for (k=1; k<options.length; k++) {
            //
            // console.log(options[k].label);
            newPage.Options.push(options[k].label)
        }

        for (j=0; j<links.length; j++){
            // console.log('working with link: ',links[i].id, 'which starts at ', links[i].source);

            let ins = 1;

            if (nodes[i].id == links[j].source) {
                newPage.Cons.push(links[j].target);
            }
        }

        console.log('newPage obj: ', newPage);

        await graphTable.insert(newPage);
    }

}

module.exports = parseGraph;