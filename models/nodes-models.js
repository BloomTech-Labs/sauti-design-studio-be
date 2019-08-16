const db = require('../database/dbConfig');

module.exports = {
	find,
	insert
};

function find(filter) {
	return db('nodes').where(filter);
}

function getNode(node_id){
    return db('nodes').where(node_id);
}

async function insert(rowData) {
	const { node_id } = rowData;
    const [alreadyNode] = await db('nodes').where({ node_id });
    
	if (alreadyNode) {
		updatedNode = await db('nodes')
			.where({ node_id })
            .update(rowData);
		return updatedNode;
	}

	console.log('TCL: add -> graphTable Data Row ', rowData);
	return db('nodes')
		.insert(rowData)
		.then(id => {
			console.log('node_id:', rowData.node_id);
			db('nodes').where({ node_id: rowData.node_id });
		})
		.catch(err => console.error(err));
}